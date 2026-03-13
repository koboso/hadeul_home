"use client";

import { useEffect, useState, useCallback, lazy, Suspense } from "react";
import AdminLayout from "@/components/AdminLayout";

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
  video: string;
  tech_stack: string;
  architecture: string;
  target_device: string;
  frame_enabled: number;
  no_image: number;
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
  video: "",
  tech_stack: "",
  architecture: "",
  target_device: "pc",
  frame_enabled: 1,
  no_image: 0,
};

export default function AdminPortfolio() {
  return (
    <AdminLayout>
      {(auth) => <PortfolioContent {...auth} />}
    </AdminLayout>
  );
}

function PortfolioContent({ token, setAuthed, authHeaders }: { token: string; authed: boolean; setAuthed: (v: boolean) => void; authHeaders: () => Record<string, string> }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [techInput, setTechInput] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkDeleting, setBulkDeleting] = useState(false);

  const headers = useCallback(() => authHeaders(), [authHeaders]);

  const loadItems = useCallback(async () => {
    const res = await fetch("/api/portfolio");
    const data = await res.json();
    setItems(data.data || []);
  }, []);

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then((d) => setCategories(d.data || []));
    loadItems();
  }, [loadItems]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    setMsg("");
    const urls: string[] = [];
    try {
      for (let i = 0; i < files.length; i++) {
        const fd = new FormData();
        fd.append("file", files[i]);
        const res = await fetch("/api/portfolio/upload", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: fd,
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
          setMsg(`Upload failed: ${err.error || res.statusText}`);
          break;
        }
        const data = await res.json();
        if (data.url) urls.push(data.url);
      }
    } catch (err) {
      setMsg(`Upload error: ${err instanceof Error ? err.message : "Unknown"}`);
    }
    setUploading(false);
    if (urls.length > 0) {
      const existing = form.image ? form.image.split(",").map((s) => s.trim()).filter(Boolean) : [];
      setForm((prev) => ({ ...prev, image: [...existing, ...urls].join(",") }));
      setMsg(`${urls.length} image(s) uploaded`);
    }
    e.target.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMsg("");
    const url = editingId ? `/api/portfolio/${editingId}` : "/api/portfolio";
    const method = editingId ? "PUT" : "POST";
    const res = await fetch(url, { method, headers: headers(), body: JSON.stringify({ ...form }) });
    const data = await res.json();
    setSaving(false);
    if (data.error) {
      setMsg(data.error);
      if (res.status === 401) setAuthed(false);
      return;
    }
    setMsg(editingId ? "Updated" : "Created");
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
      video: item.video || "",
      tech_stack: item.tech_stack || "",
      architecture: item.architecture || "",
      target_device: item.target_device || "pc",
      frame_enabled: item.frame_enabled ?? 1,
      no_image: item.no_image ?? 0,
    });
    setTechInput("");
    document.querySelector("main")?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    const res = await fetch(`/api/portfolio/${id}`, { method: "DELETE", headers: headers() });
    const data = await res.json();
    if (data.error) { setMsg(data.error); if (res.status === 401) setAuthed(false); return; }
    setMsg("Deleted");
    loadItems();
  };

  const cancelEdit = () => { setEditingId(null); setForm(emptyForm); setTechInput(""); setMsg(""); };

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return;
    if (!confirm(`Delete ${selectedIds.size} selected projects?`)) return;
    setBulkDeleting(true);
    const res = await fetch("/api/portfolio", { method: "DELETE", headers: headers(), body: JSON.stringify({ ids: Array.from(selectedIds) }) });
    const data = await res.json();
    setBulkDeleting(false);
    if (data.error) { setMsg(data.error); if (res.status === 401) setAuthed(false); return; }
    setMsg(`${data.deleted} deleted`);
    setSelectedIds(new Set());
    loadItems();
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredItems.length) setSelectedIds(new Set());
    else setSelectedIds(new Set(filteredItems.map((i) => i.id)));
  };

  /* Tech Stack helpers */
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
    if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addTechTag(); }
  };

  /* Filtered items */
  const filteredItems = items.filter((item) => {
    if (filterCategory !== "all" && item.category_id !== filterCategory) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return item.title.toLowerCase().includes(q) || item.client.toLowerCase().includes(q) || item.description.toLowerCase().includes(q) || (item.tech_stack && item.tech_stack.toLowerCase().includes(q));
    }
    return true;
  });

  const inputClass = "w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder-white/25 focus:outline-none focus:border-purple-500/50 text-sm";

  return (
    <div className="p-8 max-w-5xl">
      <h1 className="text-2xl font-black tracking-tight mb-1">Portfolio</h1>
      <p className="text-white/30 text-sm mb-8">Manage projects</p>

      {msg && (
        <div className="mb-6 px-4 py-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm">
          {msg}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white/[0.02] rounded-2xl p-6 border border-white/[0.06] mb-10">
        <h2 className="text-base font-bold mb-6">{editingId ? "Edit Project" : "New Project"}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-white/40 text-xs mb-1.5">Category *</label>
            <select required value={form.category_id} onChange={(e) => setForm({ ...form, category_id: e.target.value })}
              className={`${inputClass} ${form.category_id ? "text-white" : "text-white/25"}`}>
              <option value="" className="bg-[#161616] text-white/25">Select</option>
              {categories.map((c) => <option key={c.id} value={c.id} className="bg-[#161616] text-white">{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-white/40 text-xs mb-1.5">Client *</label>
            <input required placeholder="Samsung Electronics" value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} className={inputClass} />
          </div>
        </div>

        {/* Target Device */}
        <div className="mb-4">
          <label className="block text-white/40 text-xs mb-1.5">Target Device</label>
          <div className="flex gap-3">
            {(["pc", "mobile"] as const).map((device) => (
              <button key={device} type="button" onClick={() => setForm({ ...form, target_device: device })}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold border transition-all ${
                  form.target_device === device ? "bg-purple-500/20 border-purple-500/40 text-purple-300" : "bg-white/[0.04] border-white/[0.08] text-white/30 hover:text-white/60"
                }`}>
                {device === "pc" ? "PC" : "Mobile"}
              </button>
            ))}
          </div>
        </div>

        {/* Frame & No Image */}
        <div className="mb-4 flex items-center gap-6">
          <div className="flex items-center gap-3">
            <label className="text-white/40 text-xs">Frame</label>
            <div className="flex gap-2">
              {([1, 0] as const).map((val) => (
                <button key={val} type="button" onClick={() => setForm({ ...form, frame_enabled: val })}
                  className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all ${
                    form.frame_enabled === val
                      ? val === 1 ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300" : "bg-red-500/20 border-red-500/40 text-red-300"
                      : "bg-white/[0.04] border-white/[0.08] text-white/30 hover:text-white/60"
                  }`}>
                  {val === 1 ? "ON" : "OFF"}
                </button>
              ))}
            </div>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.no_image === 1} onChange={(e) => setForm({ ...form, no_image: e.target.checked ? 1 : 0 })}
              className="w-4 h-4 rounded bg-white/5 border-white/20 accent-purple-500" />
            <span className="text-white/40 text-xs">No Image</span>
          </label>
        </div>

        <div className="mb-4">
          <label className="block text-white/40 text-xs mb-1.5">Title *</label>
          <input required placeholder="AI Smart Factory Platform" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputClass} />
        </div>

        <div className="mb-4">
          <label className="block text-white/40 text-xs mb-1.5">Description *</label>
          <input required placeholder="One-line project summary" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={inputClass} />
        </div>

        <div className="mb-4">
          <label className="block text-white/40 text-xs mb-1.5">Detail</label>
          <Suspense fallback={<div className={`${inputClass} min-h-[200px] animate-pulse`} />}>
            <RichEditor content={form.detail} onChange={(html) => setForm({ ...form, detail: html })} token={token} placeholder="Write project details..." />
          </Suspense>
        </div>

        {/* Architecture */}
        <div className="mb-4">
          <label className="block text-white/40 text-xs mb-1.5">Architecture (HTML)</label>
          <textarea placeholder="System architecture HTML" value={form.architecture} onChange={(e) => setForm({ ...form, architecture: e.target.value })}
            className={`${inputClass} min-h-[120px] font-mono text-xs`} rows={5} />
          {form.architecture && (
            <details className="mt-2">
              <summary className="text-white/30 text-xs cursor-pointer hover:text-white/50">Preview</summary>
              <div className="mt-2 p-4 bg-[#0d0d0d] rounded-xl border border-white/[0.04] tiptap" dangerouslySetInnerHTML={{ __html: form.architecture }} />
            </details>
          )}
        </div>

        {/* Tech Stack Tags */}
        <div className="mb-4">
          <label className="block text-white/40 text-xs mb-1.5">Tech Stack</label>
          {techTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {techTags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-500/15 text-purple-300 rounded-full text-xs font-bold border border-purple-500/20">
                  {tag}
                  <button type="button" onClick={() => removeTechTag(tag)} className="text-purple-400/50 hover:text-red-400 transition-colors">&times;</button>
                </span>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <input placeholder="React, Node.js, Python (Enter to add)" value={techInput} onChange={(e) => setTechInput(e.target.value)} onKeyDown={handleTechKeyDown} className={`${inputClass} flex-1`} />
            <button type="button" onClick={addTechTag} className="px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white/40 text-sm hover:bg-white/[0.08] hover:text-white transition-colors whitespace-nowrap">Add</button>
          </div>
        </div>

        <div className="mb-6">
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
                    const imgs = form.image.split(",").map((s) => s.trim()).filter(Boolean);
                    imgs.splice(idx, 1);
                    setForm({ ...form, image: imgs.join(",") });
                  }} className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">&times;</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Video */}
        <div className="mb-6">
          <label className="block text-white/40 text-xs mb-1.5">Video (WebM)</label>
          <div className="flex gap-2">
            <input placeholder="Video URL" value={form.video} onChange={(e) => setForm({ ...form, video: e.target.value })} className={`${inputClass} flex-1`} />
            <label className="px-4 py-3 bg-purple-500/10 border border-purple-500/20 rounded-xl text-purple-400/60 text-sm cursor-pointer hover:bg-purple-500/20 transition-colors whitespace-nowrap">
              {uploading ? "..." : "Upload Video"}
              <input type="file" accept=".webm" onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setUploading(true); setMsg("");
                try {
                  const fd = new FormData(); fd.append("file", file);
                  const res = await fetch("/api/portfolio/upload", { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: fd });
                  if (!res.ok) { const err = await res.json().catch(() => ({ error: `HTTP ${res.status}` })); setMsg(`Video upload failed: ${err.error || res.statusText}`); }
                  else { const data = await res.json(); if (data.url) { setForm((prev) => ({ ...prev, video: data.url })); setMsg("Video uploaded"); } }
                } catch (err) { setMsg(`Video upload error: ${err instanceof Error ? err.message : "Unknown"}`); }
                setUploading(false); e.target.value = "";
              }} className="hidden" />
            </label>
          </div>
          {form.video && (
            <div className="mt-2 relative group inline-block">
              <video src={form.video} className="h-24 rounded-lg" muted loop autoPlay playsInline />
              <button type="button" onClick={() => setForm({ ...form, video: "" })} className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">&times;</button>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="px-8 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl text-white font-bold text-sm disabled:opacity-50">
            {saving ? "Saving..." : editingId ? "Update" : "Create"}
          </button>
          {editingId && (
            <button type="button" onClick={cancelEdit} className="px-8 py-3 border border-white/[0.08] rounded-xl text-white/40 hover:text-white transition-colors text-sm">Cancel</button>
          )}
        </div>
      </form>

      {/* List Header */}
      <div className="flex flex-col gap-3 mb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold">Projects ({filteredItems.length})</h2>
          <div className="flex items-center gap-3">
            {selectedIds.size > 0 && (
              <button onClick={handleBulkDelete} disabled={bulkDeleting}
                className="px-4 py-1.5 text-xs font-bold bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/30 transition-colors disabled:opacity-50">
                {bulkDeleting ? "Deleting..." : `Delete (${selectedIds.size})`}
              </button>
            )}
            <select value={filterCategory} onChange={(e) => { setFilterCategory(e.target.value); setSelectedIds(new Set()); }}
              className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-1.5 text-xs text-white/60 focus:outline-none focus:border-purple-500/50">
              <option value="all" className="bg-[#161616]">All Categories</option>
              {categories.map((c) => <option key={c.id} value={c.id} className="bg-[#161616]">{c.name}</option>)}
            </select>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <input placeholder="Search (title, client, description, tech)" value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setSelectedIds(new Set()); }}
            className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-purple-500/50" />
          {filteredItems.length > 0 && (
            <button onClick={toggleSelectAll} className="px-4 py-2.5 text-xs font-bold border border-white/[0.08] rounded-xl text-white/40 hover:text-white hover:border-white/20 transition-colors whitespace-nowrap">
              {selectedIds.size === filteredItems.length ? "Deselect All" : "Select All"}
            </button>
          )}
        </div>
      </div>

      <div className="space-y-2">
        {filteredItems.map((item) => (
          <div key={item.id} className={`flex items-center gap-4 bg-white/[0.02] rounded-xl p-4 border transition-colors ${
            selectedIds.has(item.id) ? "border-purple-500/30 bg-purple-500/5" : "border-white/[0.04]"
          }`}>
            <input type="checkbox" checked={selectedIds.has(item.id)} onChange={() => toggleSelect(item.id)} className="w-4 h-4 rounded bg-white/5 border-white/20 accent-purple-500 flex-shrink-0" />
            <img src={(item.image ? item.image.split(",")[0].trim() : "") || "/images/default-portfolio.svg"} alt="" className="w-16 h-12 rounded-lg object-cover flex-shrink-0"
              onError={(e) => { (e.target as HTMLImageElement).src = "/images/default-portfolio.svg"; }} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] px-2 py-0.5 bg-purple-500/10 text-purple-400 rounded-full font-bold">{item.category_name}</span>
                {item.frame_enabled === 0 && <span className="text-[10px] px-2 py-0.5 bg-yellow-500/10 text-yellow-400 rounded-full font-bold">Frame OFF</span>}
                {item.no_image === 1 && <span className="text-[10px] px-2 py-0.5 bg-red-500/10 text-red-400 rounded-full font-bold">No Image</span>}
              </div>
              <p className="text-white font-bold text-sm truncate">{item.client} — {item.title}</p>
              <p className="text-white/30 text-xs truncate">{item.description}</p>
              {item.tech_stack && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {item.tech_stack.split(",").filter(Boolean).slice(0, 5).map((t) => (
                    <span key={t} className="text-[10px] px-1.5 py-0.5 bg-blue-500/10 text-blue-400/70 rounded font-medium">{t}</span>
                  ))}
                </div>
              )}
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => handleEdit(item)} className="px-3 py-1.5 text-xs border border-white/[0.08] rounded-lg text-white/40 hover:text-white hover:border-white/20 transition-colors">Edit</button>
              <button onClick={() => handleDelete(item.id)} className="px-3 py-1.5 text-xs border border-red-500/20 rounded-lg text-red-400/60 hover:text-red-400 hover:border-red-500/40 transition-colors">Del</button>
            </div>
          </div>
        ))}
        {filteredItems.length === 0 && <p className="text-center text-white/20 py-12">No projects found.</p>}
      </div>
    </div>
  );
}
