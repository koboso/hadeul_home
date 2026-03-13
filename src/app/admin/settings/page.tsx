"use client";

import { useEffect, useState, useCallback } from "react";
import AdminLayout from "@/components/AdminLayout";

export default function AdminSettings() {
  return (
    <AdminLayout>
      {(auth) => <SettingsContent {...auth} />}
    </AdminLayout>
  );
}

function SettingsContent({ token, setAuthed, authHeaders }: { token: string; authed: boolean; setAuthed: (v: boolean) => void; authHeaders: () => Record<string, string> }) {
  const [maintenance, setMaintenance] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!token) return;
    fetch("/api/admin/settings", { headers: authHeaders() })
      .then((r) => {
        if (r.status === 401) { setAuthed(false); return null; }
        return r.json();
      })
      .then((d) => {
        if (d?.data) setMaintenance(d.data.maintenance_mode === "on");
      });
  }, [token, authHeaders, setAuthed]);

  const toggleMaintenance = async () => {
    const newValue = !maintenance;
    setSaving(true); setMsg("");
    const res = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify({ maintenance_mode: newValue ? "on" : "off" }),
    });
    const d = await res.json(); setSaving(false);
    if (d.success) {
      setMaintenance(newValue);
      setMsg(newValue ? "Maintenance mode enabled" : "Site is now online");
    } else {
      setMsg(d.error || "Settings update failed");
    }
  };

  return (
    <div className="p-8 max-w-3xl">
      <h1 className="text-2xl font-black tracking-tight mb-1">Settings</h1>
      <p className="text-white/30 text-sm mb-8">Site configuration</p>

      {msg && <div className="mb-6 px-4 py-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm">{msg}</div>}

      {/* Maintenance Mode */}
      <div className="bg-white/[0.02] rounded-2xl p-6 border border-white/[0.06]">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold mb-1">Maintenance Mode</h2>
            <p className="text-white/30 text-sm">
              When enabled, all public pages show a maintenance notice.
              <br />
              Admin pages (/admin) remain accessible.
            </p>
          </div>
          <button
            onClick={toggleMaintenance}
            disabled={saving}
            className={`relative w-14 h-7 rounded-full transition-colors ${maintenance ? "bg-red-500" : "bg-white/10"}`}
          >
            <span className={`absolute top-0.5 w-6 h-6 bg-white rounded-full transition-transform ${maintenance ? "translate-x-7" : "translate-x-0.5"}`} />
          </button>
        </div>
        <div className="mt-4 pt-4 border-t border-white/[0.04]">
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${maintenance ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"}`}>
            {maintenance ? "Maintenance" : "Online"}
          </span>
        </div>
      </div>
    </div>
  );
}
