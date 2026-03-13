"use client";

import { useEffect, useState, useCallback, lazy, Suspense } from "react";
import AdminLayout from "@/components/AdminLayout";

const RichEditor = lazy(() => import("@/components/RichEditor"));

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  image: string;
  source_url: string;
  source_name: string;
  is_published: number;
  published_at: string;
  created_at: string;
  updated_at: string;
}

const NEWS_CATEGORIES = [
  { value: "보도자료", label: "보도자료" },
  { value: "언론보도", label: "언론보도" },
  { value: "회사소식", label: "회사소식" },
];

const emptyForm = {
  title: "",
  summary: "",
  content: "",
  category: "",
  image: "",
  source_url: "",
  source_name: "",
  is_published: true,
  published_at: new Date().toISOString().slice(0, 10),
};

export default function AdminNews() {
  return (
    <AdminLayout>
      {(auth) => <NewsContent {...auth} />}
    </AdminLayout>
  );
}

function NewsContent({ token, setAuthed, authHeaders }: { token: string; authed: boolean; setAuthed: (v: boolean) => void; authHeaders: () => Record<string, string> }) {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const headers = useCallback(() => authHeaders(), [authHeaders]);

  const loadItems = useCallback(async () => {
    const res = await fetch("/api/news");
    const data = await res.json();
    setItems(data.data || []);
  }, []);

  useEffect(() => { loadItems(); }, [loadItems]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true); setMsg("");
    const urls: string[] = [];
    try {
      for (let i = 0; i < files.length; i++) {
        const fd = new FormData(); fd.append("file", files[i]);
        const res = await fetch("/api/portfolio/upload", { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: fd });
        if (!res.ok) { const err = await res.json().catch(() => ({ error: `HTTP ${res.status}` })); setMsg(`Upload failed: ${err.error || res.statusText}`); break; }
        const data = await res.json();
        if (data.url) urls.push(data.url);
      }
    } catch (err) { setMsg(`Upload error: ${err instanceof Error ? err.message : "Unknown"}`); }
    setUploading(false);
    if (urls.length > 0) {
      const existing = form.image ? form.image.split(",").map((s) => s.trim()).filter(Boolean) : [];
      setForm((prev) => ({ ...prev, image: [...existing, ...urls].join(",") }));
      setMsg(`${urls.length} image(s) uploaded`);
    }
    e.target.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true); setMsg("");
    const payload = { ...form, is_published: form.is_published ? 1 : 0 };
    const url = editingId ? `/api/news/${editingId}` : "/api/news";
    const method = editingId ? "PUT" : "POST";
    const res = await fetch(url, { method, headers: headers(), body: JSON.stringify(payload) });
    const data = await res.json(); setSaving(false);
    if (data.error) { setMsg(data.error); if (res.status === 401) setAuthed(false); return; }
    setMsg(editingId ? "Updated" : "Created");
    setForm(emptyForm); setEditingId(null); loadItems();
  };

  const handleEdit = (item: NewsItem) => {
    setEditingId(item.id);
    setForm({
      title: item.title, summary: item.summary, content: item.content || "", category: item.category || "",
      image: item.image || "", source_url: item.source_url || "", source_name: item.source_name || "",
      is_published: item.is_published === 1,
      published_at: item.published_at ? item.published_at.slice(0, 10) : new Date().toISOString().slice(0, 10),
    });
    document.querySelector("main")?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this news?")) return;
    const res = await fetch(`/api/news/${id}`, { method: "DELETE", headers: headers() });
    const data = await res.json();
    if (data.error) { setMsg(data.error); if (res.status === 401) setAuthed(false); return; }
    setMsg("Deleted"); loadItems();
  };

  const cancelEdit = () => { setEditingId(null); setForm(emptyForm); setMsg(""); };

  const filteredItems = filterCategory === "all" ? items : items.filter((item) => item.category === filterCategory);

  const inputClass = "w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder-white/25 focus:outline-none focus:border-purple-500/50 text-sm";

  return (
    <div className="p-8 max-w-5xl">
      <h1 className="text-2xl font-black tracking-tight mb-1">News</h1>
      <p className="text-white/30 text-sm mb-8">Manage news articles</p>

      {msg && <div className="mb-6 px-4 py-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm">{msg}</div>}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white/[0.02] rounded-2xl p-6 border border-white/[0.06] mb-10">
        <h2 className="text-base font-bold mb-6">{editingId ? "Edit News" : "New Article"}</h2>

        <div className="mb-4">
          <label className="block text-white/40 text-xs mb-1.5">Title *</label>
          <input required placeholder="News title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputClass} />
        </div>

        <div className="mb-4">
          <label className="block text-white/40 text-xs mb-1.5">Summary *</label>
          <input required placeholder="News summary (shown in list)" value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} className={inputClass} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-white/40 text-xs mb-1.5">Category</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={`${inputClass} ${form.category ? "text-white" : "text-white/25"}`}>
              <option value="" className="bg-[#161616] text-white/25">Select</option>
              {NEWS_CATEGORIES.map((c) => <option key={c.value} value={c.value} className="bg-[#161616] text-white">{c.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-white/40 text-xs mb-1.5">Published Date</label>
            <input type="date" value={form.published_at} onChange={(e) => setForm({ ...form, published_at: e.target.value })} className={inputClass} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-white/40 text-xs mb-1.5">Source URL</label>
            <input placeholder="https://www.etnews.com/..." value={form.source_url} onChange={(e) => setForm({ ...form, source_url: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="block text-white/40 text-xs mb-1.5">Source Name</label>
            <input placeholder="Media outlet name" value={form.source_name} onChange={(e) => setForm({ ...form, source_name: e.target.value })} className={inputClass} />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-white/40 text-xs mb-1.5">Content</label>
          <Suspense fallback={<div className={`${inputClass} min-h-[200px] animate-pulse`} />}>
            <RichEditor content={form.content} onChange={(html) => setForm({ ...form, content: html })} token={token} placeholder="Write news content..." />
          </Suspense>
        </div>

        <div className="mb-4">
          <label className="block text-white/40 text-xs mb-1.5">Images (multiple)</label>
          <div className="flex gap-2">
            <input placeholder="Image URLs (comma separated)" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className={`${inputClass} flex-1`} />
            <label className="px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white/40 text-sm cursor-pointer hover:bg-white/[0.08] transition-colors whitespace-nowrap">
              {uploading ? "..." : "Upload"}
              <input type="file" accept="image/*" multiple onChange={handleUpload} className="hidden" />
            </label>
          </div>
          {form.image && (
            <div className="flex flex-wrap gap-2 mt-2">
              {form.image.split(",").map((url) => url.trim()).filter(Boolean).map((url, idx) => (
                <div key={idx} className="relative group">
                  <img src={url} alt={`preview ${idx + 1}`} className="h-20 rounded-lg object-cover" />
                  <button type="button" onClick={() => {
                    const imgs = form.image.split(",").map((s) => s.trim()).filter(Boolean); imgs.splice(idx, 1);
                    setForm({ ...form, image: imgs.join(",") });
                  }} className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">&times;</button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mb-6 flex items-center">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.is_published} onChange={(e) => setForm({ ...form, is_published: e.target.checked })} className="w-4 h-4 accent-purple-500" />
            <span className="text-white/40 text-sm">Published</span>
          </label>
        </div>

        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="px-8 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl text-white font-bold text-sm disabled:opacity-50">
            {saving ? "Saving..." : editingId ? "Update" : "Create"}
          </button>
          {editingId && <button type="button" onClick={cancelEdit} className="px-8 py-3 border border-white/[0.08] rounded-xl text-white/40 hover:text-white transition-colors text-sm">Cancel</button>}
        </div>
      </form>

      {/* List */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold">Articles ({filteredItems.length})</h2>
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}
          className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-1.5 text-xs text-white/60 focus:outline-none focus:border-purple-500/50">
          <option value="all" className="bg-[#161616]">All Categories</option>
          {NEWS_CATEGORIES.map((c) => <option key={c.value} value={c.value} className="bg-[#161616]">{c.label}</option>)}
        </select>
      </div>
      <div className="space-y-2">
        {filteredItems.map((item) => (
          <div key={item.id} className="flex items-center gap-4 bg-white/[0.02] rounded-xl p-4 border border-white/[0.04]">
            <img src={(item.image ? item.image.split(",")[0].trim() : "") || "/images/default-news.svg"} alt="" className="w-16 h-12 rounded-lg object-cover flex-shrink-0"
              onError={(e) => { (e.target as HTMLImageElement).src = "/images/default-news.svg"; }} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                {item.category && <span className="text-[10px] px-2 py-0.5 bg-purple-500/10 text-purple-400 rounded-full font-bold">{item.category}</span>}
                {item.is_published === 1
                  ? <span className="text-[10px] px-2 py-0.5 bg-green-500/10 text-green-400 rounded-full font-bold">Published</span>
                  : <span className="text-[10px] px-2 py-0.5 bg-red-500/10 text-red-400 rounded-full font-bold">Draft</span>
                }
              </div>
              <p className="text-white font-bold text-sm truncate">{item.title}</p>
              <p className="text-white/30 text-xs truncate">{item.summary}</p>
              <p className="text-white/20 text-[10px] mt-0.5">
                {item.published_at?.slice(0, 10)}
                {item.source_name && <span className="ml-2 text-cyan-400/40">{item.source_name}</span>}
              </p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => handleEdit(item)} className="px-3 py-1.5 text-xs border border-white/[0.08] rounded-lg text-white/40 hover:text-white hover:border-white/20 transition-colors">Edit</button>
              <button onClick={() => handleDelete(item.id)} className="px-3 py-1.5 text-xs border border-red-500/20 rounded-lg text-red-400/60 hover:text-red-400 hover:border-red-500/40 transition-colors">Del</button>
            </div>
          </div>
        ))}
        {filteredItems.length === 0 && <p className="text-center text-white/20 py-12">No articles found.</p>}
      </div>
    </div>
  );
}
