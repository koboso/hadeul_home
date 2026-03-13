"use client";

import { useEffect, useState, useCallback, lazy, Suspense } from "react";
import AdminLayout from "@/components/AdminLayout";

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
  return (
    <AdminLayout>
      {(auth) => <CareersContent {...auth} />}
    </AdminLayout>
  );
}

function CareersContent({ token, setAuthed, authHeaders }: { token: string; authed: boolean; setAuthed: (v: boolean) => void; authHeaders: () => Record<string, string> }) {
  const [items, setItems] = useState<JobPosting[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [filterActive, setFilterActive] = useState("all");

  const headers = useCallback(() => authHeaders(), [authHeaders]);

  const loadItems = useCallback(async () => {
    const res = await fetch("/api/careers");
    const data = await res.json();
    setItems(data.data || []);
  }, []);

  useEffect(() => { loadItems(); }, [loadItems]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true); setMsg("");
    const payload = { ...form, is_active: form.is_active ? 1 : 0 };
    const url = editingId ? `/api/careers/${editingId}` : "/api/careers";
    const method = editingId ? "PUT" : "POST";
    const res = await fetch(url, { method, headers: headers(), body: JSON.stringify(payload) });
    const data = await res.json(); setSaving(false);
    if (data.error) { setMsg(data.error); if (res.status === 401) setAuthed(false); return; }
    setMsg(editingId ? "Updated" : "Created");
    setForm(emptyForm); setEditingId(null); loadItems();
  };

  const handleEdit = (item: JobPosting) => {
    setEditingId(item.id);
    setForm({
      title: item.title, department: item.department || "", job_type: item.job_type || "정규직",
      location: item.location || "", description: item.description || "", requirements: item.requirements || "",
      is_active: item.is_active === 1,
    });
    document.querySelector("main")?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this posting?")) return;
    const res = await fetch(`/api/careers/${id}`, { method: "DELETE", headers: headers() });
    const data = await res.json();
    if (data.error) { setMsg(data.error); if (res.status === 401) setAuthed(false); return; }
    setMsg("Deleted"); loadItems();
  };

  const cancelEdit = () => { setEditingId(null); setForm(emptyForm); setMsg(""); };

  const filteredItems = filterActive === "all" ? items : filterActive === "active" ? items.filter((i) => i.is_active === 1) : items.filter((i) => i.is_active === 0);

  const inputClass = "w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder-white/25 focus:outline-none focus:border-purple-500/50 text-sm";

  return (
    <div className="p-8 max-w-5xl">
      <h1 className="text-2xl font-black tracking-tight mb-1">Careers</h1>
      <p className="text-white/30 text-sm mb-8">Manage job postings</p>

      {msg && <div className="mb-6 px-4 py-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm">{msg}</div>}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white/[0.02] rounded-2xl p-6 border border-white/[0.06] mb-10">
        <h2 className="text-base font-bold mb-6">{editingId ? "Edit Posting" : "New Posting"}</h2>

        <div className="mb-4">
          <label className="block text-white/40 text-xs mb-1.5">Position *</label>
          <input required placeholder="AI Engineer" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputClass} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-white/40 text-xs mb-1.5">Department</label>
            <input placeholder="AI Lab, Game Studio, Platform" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="block text-white/40 text-xs mb-1.5">Job Type</label>
            <select value={form.job_type} onChange={(e) => setForm({ ...form, job_type: e.target.value })} className={`${inputClass} text-white`}>
              <option value="정규직" className="bg-[#161616]">정규직</option>
              <option value="계약직" className="bg-[#161616]">계약직</option>
              <option value="인턴" className="bg-[#161616]">인턴</option>
              <option value="파트타임" className="bg-[#161616]">파트타임</option>
            </select>
          </div>
          <div>
            <label className="block text-white/40 text-xs mb-1.5">Location</label>
            <input placeholder="Daejeon HQ, Remote" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className={inputClass} />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-white/40 text-xs mb-1.5">Description</label>
          <Suspense fallback={<div className={`${inputClass} min-h-[200px] animate-pulse`} />}>
            <RichEditor content={form.description} onChange={(html) => setForm({ ...form, description: html })} token={token} placeholder="Write job description..." />
          </Suspense>
        </div>

        <div className="mb-4">
          <label className="block text-white/40 text-xs mb-1.5">Requirements</label>
          <Suspense fallback={<div className={`${inputClass} min-h-[200px] animate-pulse`} />}>
            <RichEditor content={form.requirements} onChange={(html) => setForm({ ...form, requirements: html })} token={token} placeholder="Required/preferred qualifications..." />
          </Suspense>
        </div>

        <div className="mb-6 flex items-center">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} className="w-4 h-4 accent-purple-500" />
            <span className="text-white/40 text-sm">Active</span>
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
        <h2 className="text-base font-bold">Postings ({filteredItems.length})</h2>
        <select value={filterActive} onChange={(e) => setFilterActive(e.target.value)}
          className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-1.5 text-xs text-white/60 focus:outline-none focus:border-purple-500/50">
          <option value="all" className="bg-[#161616]">All</option>
          <option value="active" className="bg-[#161616]">Active</option>
          <option value="inactive" className="bg-[#161616]">Closed</option>
        </select>
      </div>
      <div className="space-y-2">
        {filteredItems.map((item) => (
          <div key={item.id} className="flex items-center gap-4 bg-white/[0.02] rounded-xl p-4 border border-white/[0.04]">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                {item.department && <span className="text-[10px] px-2 py-0.5 bg-purple-500/10 text-purple-400 rounded-full font-bold">{item.department}</span>}
                <span className="text-[10px] px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded-full font-bold">{item.job_type}</span>
                {item.is_active === 1
                  ? <span className="text-[10px] px-2 py-0.5 bg-green-500/10 text-green-400 rounded-full font-bold">Active</span>
                  : <span className="text-[10px] px-2 py-0.5 bg-red-500/10 text-red-400 rounded-full font-bold">Closed</span>
                }
              </div>
              <p className="text-white font-bold text-sm truncate">{item.title}</p>
              {item.location && <p className="text-white/30 text-xs truncate">{item.location}</p>}
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => handleEdit(item)} className="px-3 py-1.5 text-xs border border-white/[0.08] rounded-lg text-white/40 hover:text-white hover:border-white/20 transition-colors">Edit</button>
              <button onClick={() => handleDelete(item.id)} className="px-3 py-1.5 text-xs border border-red-500/20 rounded-lg text-red-400/60 hover:text-red-400 hover:border-red-500/40 transition-colors">Del</button>
            </div>
          </div>
        ))}
        {filteredItems.length === 0 && <p className="text-center text-white/20 py-12">No postings found.</p>}
      </div>
    </div>
  );
}
