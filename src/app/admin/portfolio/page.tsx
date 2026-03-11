"use client";

import { useEffect, useState, useCallback, lazy, Suspense } from "react";
import Link from "next/link";

const RichEditor = lazy(() => import("@/components/RichEditor"));

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface PortfolioItem {
  id: string;
  category_id: string;
  client: string;
  title: string;
  description: string;
  detail: string;
  image: string;
  tech_stack: string;
  is_featured: number;
  sort_order: number;
  category_name: string;
  created_at: string;
}

const emptyForm = {
  category_id: "",
  client: "",
  title: "",
  description: "",
  detail: "",
  image: "",
  tech_stack: "",
  is_featured: false,
  sort_order: 0,
};

export default function AdminPortfolio() {
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [techInput, setTechInput] = useState("");
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
    const res = await fetch("/api/portfolio");
    const data = await res.json();
    setItems(data.data || []);
  }, []);

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then((d) => setCategories(d.data || []));
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
      is_featured: form.is_featured ? 1 : 0,
    };

    const url = editingId ? `/api/portfolio/${editingId}` : "/api/portfolio";
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
    setTechInput("");
    loadItems();
  };

  const handleEdit = (item: PortfolioItem) => {
    setEditingId(item.id);
    setForm({
      category_id: item.category_id,
      client: item.client,
      title: item.title,
      description: item.description,
      detail: item.detail || "",
      image: item.image,
      tech_stack: item.tech_stack || "",
      is_featured: item.is_featured === 1,
      sort_order: item.sort_order,
    });
    setTechInput("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    const res = await fetch(`/api/portfolio/${id}`, {
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
    setTechInput("");
    setMsg("");
  };

  const logout = () => {
    setAuthed(false);
    setToken("");
    localStorage.removeItem("admin_token");
  };

  /* ─── Tech Stack helpers ─── */
  const techTags = form.tech_stack ? form.tech_stack.split(",").filter(Boolean) : [];

  const addTechTag = () => {
    const tag = techInput.trim();
    if (!tag || techTags.includes(tag)) return;
    setForm({ ...form, tech_stack: [...techTags, tag].join(",") });
    setTechInput("");
  };

  const removeTechTag = (tag: string) => {
    setForm({ ...form, tech_stack: techTags.filter((t) => t !== tag).join(",") });
  };

  const handleTechKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTechTag();
    }
  };

  /* ─── Filtered items ─── */
  const filteredItems =
    filterCategory === "all"
      ? items
      : items.filter((item) => item.category_id === filterCategory);

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
            <h1 className="text-3xl font-black tracking-tight">Portfolio 관리</h1>
            <p className="text-white/30 text-sm mt-1">프로젝트 등록 및 관리</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/portfolio" className="text-white/30 text-sm hover:text-white transition-colors">
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
          <Link href="/admin/portfolio" className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg text-sm font-bold">
            Portfolio
          </Link>
          <Link
            href="/admin/news"
            className="px-4 py-2 text-white/30 hover:text-white hover:bg-white/5 rounded-lg text-sm font-bold transition-colors"
          >
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
          <h2 className="text-lg font-bold mb-6">{editingId ? "프로젝트 수정" : "새 프로젝트 등록"}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-white/40 text-xs mb-1.5">카테고리 *</label>
              <select
                required
                value={form.category_id}
                onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                className={`${inputClass} ${form.category_id ? "text-white" : "text-white/30"}`}
              >
                <option value="" className="bg-[#1a1a1a] text-white/30">선택하세요</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id} className="bg-[#1a1a1a] text-white">
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-white/40 text-xs mb-1.5">업체명 *</label>
              <input
                required
                placeholder="삼성전자"
                value={form.client}
                onChange={(e) => setForm({ ...form, client: e.target.value })}
                className={inputClass}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-white/40 text-xs mb-1.5">프로젝트 제목 *</label>
            <input
              required
              placeholder="AI 기반 스마트 팩토리 플랫폼"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className={inputClass}
            />
          </div>

          <div className="mb-4">
            <label className="block text-white/40 text-xs mb-1.5">간단 설명 (한줄) *</label>
            <input
              required
              placeholder="제조 공정 자동화를 위한 실시간 AI 모니터링 시스템 구축"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className={inputClass}
            />
          </div>

          <div className="mb-4">
            <label className="block text-white/40 text-xs mb-1.5">상세 설명</label>
            <Suspense fallback={<div className={`${inputClass} min-h-[200px] animate-pulse`} />}>
              <RichEditor
                content={form.detail}
                onChange={(html) => setForm({ ...form, detail: html })}
                token={token}
                placeholder="프로젝트에 대한 상세 설명을 작성하세요. (기술 스택, 성과, 주요 기능 등)"
              />
            </Suspense>
          </div>

          {/* Tech Stack Tags */}
          <div className="mb-4">
            <label className="block text-white/40 text-xs mb-1.5">기술 스택</label>
            {techTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {techTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-500/15 text-purple-300 rounded-full text-xs font-bold border border-purple-500/20"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTechTag(tag)}
                      className="text-purple-400/50 hover:text-red-400 transition-colors"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <input
                placeholder="React, Node.js, Python 등 (Enter로 추가)"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={handleTechKeyDown}
                className={`${inputClass} flex-1`}
              />
              <button
                type="button"
                onClick={addTechTag}
                className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white/40 text-sm hover:bg-white/10 hover:text-white transition-colors whitespace-nowrap"
              >
                추가
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-white/40 text-xs mb-1.5">정렬 순서</label>
              <input
                type="number"
                value={form.sort_order}
                onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })}
                className={inputClass}
              />
            </div>
            <div className="flex items-end pb-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.is_featured}
                  onChange={(e) => setForm({ ...form, is_featured: e.target.checked })}
                  className="w-4 h-4 accent-purple-500"
                />
                <span className="text-white/40 text-sm">홈 노출</span>
              </label>
            </div>
          </div>

          <div className="mb-6">
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
          <h2 className="text-lg font-bold">등록된 프로젝트 ({filteredItems.length})</h2>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white/60 focus:outline-none focus:border-purple-500/50"
          >
            <option value="all" className="bg-[#1a1a1a]">전체 카테고리</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id} className="bg-[#1a1a1a]">
                {c.name}
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
                  <span className="text-[10px] px-2 py-0.5 bg-purple-500/10 text-purple-400 rounded-full font-bold">
                    {item.category_name}
                  </span>
                  {item.is_featured === 1 && (
                    <span className="text-[10px] px-2 py-0.5 bg-cyan-500/10 text-cyan-400 rounded-full font-bold">
                      HOME
                    </span>
                  )}
                </div>
                <p className="text-white font-bold text-sm truncate">
                  {item.client} — {item.title}
                </p>
                <p className="text-white/30 text-xs truncate">{item.description}</p>
                {item.tech_stack && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {item.tech_stack.split(",").filter(Boolean).slice(0, 5).map((t) => (
                      <span key={t} className="text-[10px] px-1.5 py-0.5 bg-blue-500/10 text-blue-400/70 rounded font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
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
            <p className="text-center text-white/20 py-12">등록된 프로젝트가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}
