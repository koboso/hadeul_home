"use client";

import { useEffect, useState, useCallback, lazy, Suspense } from "react";
import Link from "next/link";

const RichEditor = lazy(() => import("@/components/RichEditor"));

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  image: string;
  is_published: number;
  published_at: string;
  created_at: string;
  updated_at: string;
}

const NEWS_CATEGORIES = [
  { value: "Product", label: "Product" },
  { value: "Partnership", label: "Partnership" },
  { value: "Investment", label: "Investment" },
  { value: "Award", label: "Award" },
  { value: "Company", label: "Company" },
  { value: "Notice", label: "Notice" },
];

const emptyForm = {
  title: "",
  summary: "",
  content: "",
  category: "",
  image: "",
  is_published: true,
  published_at: new Date().toISOString().slice(0, 10),
};

export default function AdminNews() {
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [items, setItems] = useState<NewsItem[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

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
    const res = await fetch("/api/news");
    const data = await res.json();
    setItems(data.data || []);
  }, []);

  useEffect(() => {
    if (authed) loadItems();
  }, [authed, loadItems]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/portfolio/upload", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: fd,
    });
    const data = await res.json();
    setUploading(false);
    if (data.url) {
      setForm({ ...form, image: data.url });
      setMsg("이미지 업로드 완료");
    } else {
      setMsg(data.error || "업로드 실패");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMsg("");

    const payload = {
      ...form,
      is_published: form.is_published ? 1 : 0,
    };

    const url = editingId ? `/api/news/${editingId}` : "/api/news";
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

  const handleEdit = (item: NewsItem) => {
    setEditingId(item.id);
    setForm({
      title: item.title,
      summary: item.summary,
      content: item.content || "",
      category: item.category || "",
      image: item.image || "",
      is_published: item.is_published === 1,
      published_at: item.published_at ? item.published_at.slice(0, 10) : new Date().toISOString().slice(0, 10),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    const res = await fetch(`/api/news/${id}`, {
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

  /* Filtered items */
  const filteredItems =
    filterCategory === "all"
      ? items
      : items.filter((item) => item.category === filterCategory);

  /* Login */
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

  /* Admin Panel */
  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50";

  const categoryLabel = (value: string) => {
    const found = NEWS_CATEGORIES.find((c) => c.value === value);
    return found ? found.label : value;
  };

  const categoryColor = (value: string) => {
    switch (value) {
      case "Product": return "bg-blue-500/10 text-blue-400";
      case "Partnership": return "bg-green-500/10 text-green-400";
      case "Investment": return "bg-yellow-500/10 text-yellow-400";
      case "Award": return "bg-pink-500/10 text-pink-400";
      case "Company": return "bg-purple-500/10 text-purple-400";
      case "Notice": return "bg-orange-500/10 text-orange-400";
      default: return "bg-white/10 text-white/40";
    }
  };

  return (
    <div className="min-h-screen bg-[#111] text-white">
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black tracking-tight">News 관리</h1>
            <p className="text-white/30 text-sm mt-1">뉴스 등록 및 관리</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-white/30 text-sm hover:text-white transition-colors">
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
          <Link href="/admin/news" className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg text-sm font-bold">
            News
          </Link>
          <Link
            href="/admin/careers"
            className="px-4 py-2 text-white/30 hover:text-white hover:bg-white/5 rounded-lg text-sm font-bold transition-colors"
          >
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
          <h2 className="text-lg font-bold mb-6">{editingId ? "뉴스 수정" : "새 뉴스 등록"}</h2>

          <div className="mb-4">
            <label className="block text-white/40 text-xs mb-1.5">제목 *</label>
            <input
              required
              placeholder="뉴스 제목을 입력하세요"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className={inputClass}
            />
          </div>

          <div className="mb-4">
            <label className="block text-white/40 text-xs mb-1.5">요약 *</label>
            <input
              required
              placeholder="뉴스 요약을 입력하세요 (리스트에 표시됩니다)"
              value={form.summary}
              onChange={(e) => setForm({ ...form, summary: e.target.value })}
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-white/40 text-xs mb-1.5">카테고리</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className={`${inputClass} ${form.category ? "text-white" : "text-white/30"}`}
              >
                <option value="" className="bg-[#1a1a1a] text-white/30">선택하세요</option>
                {NEWS_CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value} className="bg-[#1a1a1a] text-white">
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-white/40 text-xs mb-1.5">발행일</label>
              <input
                type="date"
                value={form.published_at}
                onChange={(e) => setForm({ ...form, published_at: e.target.value })}
                className={inputClass}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-white/40 text-xs mb-1.5">상세 내용</label>
            <Suspense fallback={<div className={`${inputClass} min-h-[200px] animate-pulse`} />}>
              <RichEditor
                content={form.content}
                onChange={(html) => setForm({ ...form, content: html })}
                token={token}
                placeholder="뉴스 상세 내용을 작성하세요."
              />
            </Suspense>
          </div>

          <div className="mb-4">
            <label className="block text-white/40 text-xs mb-1.5">이미지</label>
            <div className="flex gap-2">
              <input
                placeholder="이미지 URL 또는 업로드"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                className={`${inputClass} flex-1`}
              />
              <label className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white/40 text-sm cursor-pointer hover:bg-white/10 transition-colors whitespace-nowrap">
                {uploading ? "..." : "업로드"}
                <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
              </label>
            </div>
            {form.image && (
              <img src={form.image} alt="preview" className="mt-2 h-20 rounded-lg object-cover" />
            )}
          </div>

          <div className="mb-6 flex items-center">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_published}
                onChange={(e) => setForm({ ...form, is_published: e.target.checked })}
                className="w-4 h-4 accent-purple-500"
              />
              <span className="text-white/40 text-sm">발행 여부</span>
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

        {/* Category Filter for List */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">등록된 뉴스 ({filteredItems.length})</h2>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white/60 focus:outline-none focus:border-purple-500/50"
          >
            <option value="all" className="bg-[#1a1a1a]">전체 카테고리</option>
            {NEWS_CATEGORIES.map((c) => (
              <option key={c.value} value={c.value} className="bg-[#1a1a1a]">
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-3">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 bg-[#1a1a1a] rounded-xl p-4 border border-white/5"
            >
              {item.image ? (
                <img src={item.image} alt="" className="w-16 h-12 rounded-lg object-cover flex-shrink-0" />
              ) : (
                <div className="w-16 h-12 rounded-lg bg-white/5 flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  {item.category && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${categoryColor(item.category)}`}>
                      {categoryLabel(item.category)}
                    </span>
                  )}
                  {item.is_published === 1 ? (
                    <span className="text-[10px] px-2 py-0.5 bg-green-500/10 text-green-400 rounded-full font-bold">
                      발행
                    </span>
                  ) : (
                    <span className="text-[10px] px-2 py-0.5 bg-red-500/10 text-red-400 rounded-full font-bold">
                      비공개
                    </span>
                  )}
                </div>
                <p className="text-white font-bold text-sm truncate">{item.title}</p>
                <p className="text-white/30 text-xs truncate">{item.summary}</p>
                <p className="text-white/20 text-[10px] mt-0.5">{item.published_at?.slice(0, 10)}</p>
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
            <p className="text-center text-white/20 py-12">등록된 뉴스가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}
