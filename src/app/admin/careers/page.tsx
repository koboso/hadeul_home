"use client";

import { useEffect, useState, useCallback, lazy, Suspense } from "react";
import Link from "next/link";

const RichEditor = lazy(() => import("@/components/RichEditor"));

interface JobPosting {
  id: string;
  title: string;
  department: string;
  job_type: string;
  location: string;
  description: string;
  requirements: string;
  is_active: number;
  created_at: string;
  updated_at: string;
}

const emptyForm = {
  title: "",
  department: "",
  job_type: "정규직",
  location: "",
  description: "",
  requirements: "",
  is_active: true,
};

export default function AdminCareers() {
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [items, setItems] = useState<JobPosting[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [filterActive, setFilterActive] = useState("all");

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const d = await res.json();
    if (d.token) {
      setToken(d.token);
      setAuthed(true);
      localStorage.setItem("admin_token", d.token);
    } else {
      setLoginError(d.error || "로그인 실패");
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("admin_token");
    if (saved) {
      setToken(saved);
      setAuthed(true);
    }
  }, []);

  const headers = useCallback(
    () => ({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }),
    [token]
  );

  const loadItems = useCallback(async () => {
    const res = await fetch("/api/careers");
    const data = await res.json();
    setItems(data.data || []);
  }, []);

  useEffect(() => {
    if (authed) loadItems();
  }, [authed, loadItems]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMsg("");

    const payload = {
      ...form,
      is_active: form.is_active ? 1 : 0,
    };

    const url = editingId ? `/api/careers/${editingId}` : "/api/careers";
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: headers(),
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    setSaving(false);

    if (data.error) {
      setMsg(data.error);
      if (res.status === 401) { setAuthed(false); localStorage.removeItem("admin_token"); }
      return;
    }

    setMsg(editingId ? "수정 완료" : "등록 완료");
    setForm(emptyForm);
    setEditingId(null);
    loadItems();
  };

  const handleEdit = (item: JobPosting) => {
    setEditingId(item.id);
    setForm({
      title: item.title,
      department: item.department || "",
      job_type: item.job_type || "정규직",
      location: item.location || "",
      description: item.description || "",
      requirements: item.requirements || "",
      is_active: item.is_active === 1,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    const res = await fetch(`/api/careers/${id}`, {
      method: "DELETE",
      headers: headers(),
    });
    const data = await res.json();
    if (data.error) {
      setMsg(data.error);
      if (res.status === 401) { setAuthed(false); localStorage.removeItem("admin_token"); }
      return;
    }
    setMsg("삭제 완료");
    loadItems();
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
    setMsg("");
  };

  const logout = () => {
    setAuthed(false);
    setToken("");
    localStorage.removeItem("admin_token");
  };

  /* ─── Filtered items ─── */
  const filteredItems =
    filterActive === "all"
      ? items
      : filterActive === "active"
        ? items.filter((item) => item.is_active === 1)
        : items.filter((item) => item.is_active === 0);

  /* ─── Job type label ─── */
  const jobTypeLabel = (type: string) => {
    const map: Record<string, string> = {
      "정규직": "정규직",
      "계약직": "계약직",
      "인턴": "인턴",
      "파트타임": "파트타임",
    };
    return map[type] || type;
  };

  /* ─── Login ─── */
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#111] flex items-center justify-center">
        <form onSubmit={login} className="bg-[#1a1a1a] p-8 rounded-2xl w-full max-w-sm border border-white/10">
          <h1 className="text-white text-2xl font-black mb-6 tracking-tight">Admin Login</h1>
          <input
            type="text"
            placeholder="계정"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 mb-3"
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 mb-4"
          />
          {loginError && <p className="text-red-400 text-sm mb-3">{loginError}</p>}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl text-white font-bold"
          >
            로그인
          </button>
        </form>
      </div>
    );
  }

  /* ─── Admin Panel ─── */
  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50";

  return (
    <div className="min-h-screen bg-[#111] text-white">
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black tracking-tight">Careers 관리</h1>
            <p className="text-white/30 text-sm mt-1">채용 공고 등록 및 관리</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/careers" className="text-white/30 text-sm hover:text-white transition-colors">
              사이트 보기 &rarr;
            </Link>
            <button onClick={logout} className="text-white/30 text-sm hover:text-red-400 transition-colors">
              로그아웃
            </button>
          </div>
        </div>

        {/* Nav */}
        <div className="flex gap-3 mb-8 border-b border-white/5 pb-4">
          <Link
            href="/admin"
            className="px-4 py-2 text-white/30 hover:text-white hover:bg-white/5 rounded-lg text-sm font-bold transition-colors"
          >
            Analytics
          </Link>
          <Link
            href="/admin/portfolio"
            className="px-4 py-2 text-white/30 hover:text-white hover:bg-white/5 rounded-lg text-sm font-bold transition-colors"
          >
            Portfolio
          </Link>
          <Link
            href="/admin/news"
            className="px-4 py-2 text-white/30 hover:text-white hover:bg-white/5 rounded-lg text-sm font-bold transition-colors"
          >
            News
          </Link>
          <Link href="/admin/careers" className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg text-sm font-bold">
            Careers
          </Link>
          <Link
            href="/admin/settings"
            className="px-4 py-2 text-white/30 hover:text-white hover:bg-white/5 rounded-lg text-sm font-bold transition-colors"
          >
            Settings
          </Link>
        </div>

        {msg && (
          <div className="mb-6 px-4 py-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm">
            {msg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-[#1a1a1a] rounded-2xl p-6 border border-white/10 mb-10">
          <h2 className="text-lg font-bold mb-6">{editingId ? "채용 공고 수정" : "새 채용 공고 등록"}</h2>

          <div className="mb-4">
            <label className="block text-white/40 text-xs mb-1.5">직무명 *</label>
            <input
              required
              placeholder="AI 엔지니어"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-white/40 text-xs mb-1.5">부서</label>
              <input
                placeholder="AI Lab, Game Studio, Platform"
                value={form.department}
                onChange={(e) => setForm({ ...form, department: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-white/40 text-xs mb-1.5">근무 형태</label>
              <select
                value={form.job_type}
                onChange={(e) => setForm({ ...form, job_type: e.target.value })}
                className={`${inputClass} ${form.job_type ? "text-white" : "text-white/30"}`}
              >
                <option value="정규직" className="bg-[#1a1a1a] text-white">정규직</option>
                <option value="계약직" className="bg-[#1a1a1a] text-white">계약직</option>
                <option value="인턴" className="bg-[#1a1a1a] text-white">인턴</option>
                <option value="파트타임" className="bg-[#1a1a1a] text-white">파트타임</option>
              </select>
            </div>
            <div>
              <label className="block text-white/40 text-xs mb-1.5">근무지</label>
              <input
                placeholder="대전 본사, 원격 근무"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className={inputClass}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-white/40 text-xs mb-1.5">직무 설명</label>
            <Suspense fallback={<div className={`${inputClass} min-h-[200px] animate-pulse`} />}>
              <RichEditor
                content={form.description}
                onChange={(html) => setForm({ ...form, description: html })}
                token={token}
                placeholder="직무에 대한 상세 설명을 작성하세요."
              />
            </Suspense>
          </div>

          <div className="mb-4">
            <label className="block text-white/40 text-xs mb-1.5">자격 요건</label>
            <Suspense fallback={<div className={`${inputClass} min-h-[200px] animate-pulse`} />}>
              <RichEditor
                content={form.requirements}
                onChange={(html) => setForm({ ...form, requirements: html })}
                token={token}
                placeholder="필수/우대 자격 요건을 작성하세요."
              />
            </Suspense>
          </div>

          <div className="mb-6 flex items-center">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_active}
                onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                className="w-4 h-4 accent-purple-500"
              />
              <span className="text-white/40 text-sm">채용중</span>
            </label>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl text-white font-bold disabled:opacity-50"
            >
              {saving ? "저장 중..." : editingId ? "수정" : "등록"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="px-8 py-3 border border-white/10 rounded-xl text-white/40 hover:text-white transition-colors"
              >
                취소
              </button>
            )}
          </div>
        </form>

        {/* Filter & List */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">등록된 채용 공고 ({filteredItems.length})</h2>
          <select
            value={filterActive}
            onChange={(e) => setFilterActive(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white/60 focus:outline-none focus:border-purple-500/50"
          >
            <option value="all" className="bg-[#1a1a1a]">전체</option>
            <option value="active" className="bg-[#1a1a1a]">채용중</option>
            <option value="inactive" className="bg-[#1a1a1a]">마감</option>
          </select>
        </div>
        <div className="space-y-3">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 bg-[#1a1a1a] rounded-xl p-4 border border-white/5"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  {item.department && (
                    <span className="text-[10px] px-2 py-0.5 bg-purple-500/10 text-purple-400 rounded-full font-bold">
                      {item.department}
                    </span>
                  )}
                  <span className="text-[10px] px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded-full font-bold">
                    {jobTypeLabel(item.job_type)}
                  </span>
                  {item.is_active === 1 ? (
                    <span className="text-[10px] px-2 py-0.5 bg-green-500/10 text-green-400 rounded-full font-bold">
                      채용중
                    </span>
                  ) : (
                    <span className="text-[10px] px-2 py-0.5 bg-red-500/10 text-red-400 rounded-full font-bold">
                      마감
                    </span>
                  )}
                </div>
                <p className="text-white font-bold text-sm truncate">{item.title}</p>
                {item.location && (
                  <p className="text-white/30 text-xs truncate">{item.location}</p>
                )}
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => handleEdit(item)}
                  className="px-3 py-1.5 text-xs border border-white/10 rounded-lg text-white/40 hover:text-white hover:border-white/30 transition-colors"
                >
                  수정
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-3 py-1.5 text-xs border border-red-500/20 rounded-lg text-red-400/60 hover:text-red-400 hover:border-red-500/40 transition-colors"
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
          {filteredItems.length === 0 && (
            <p className="text-center text-white/20 py-12">등록된 채용 공고가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}
