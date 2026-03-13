"use client";

import { useEffect, useState, useCallback } from "react";
import AdminLayout from "@/components/AdminLayout";

interface AnalyticsData {
  total: number;
  today: number;
  yesterday: number;
  uniqueVisitors: number;
  byDay: { date: string; views: number }[];
  byPage: { path: string; views: number }[];
  topReferrers: { referrer: string; views: number }[];
}

export default function AdminDashboard() {
  return (
    <AdminLayout>
      {(auth) => <DashboardContent {...auth} />}
    </AdminLayout>
  );
}

function DashboardContent({ token, setAuthed, authHeaders }: { token: string; authed: boolean; setAuthed: (v: boolean) => void; authHeaders: () => Record<string, string> }) {
  const [days, setDays] = useState(7);
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [settings, setSettings] = useState<Record<string, string>>({});

  const loadData = useCallback(() => {
    if (!token) return;
    fetch(`/api/admin/analytics?days=${days}`, { headers: authHeaders() })
      .then((r) => {
        if (r.status === 401) { setAuthed(false); return null; }
        return r.json();
      })
      .then((d) => d && setData(d.data));
    fetch("/api/admin/settings", { headers: authHeaders() })
      .then((r) => r.json())
      .then((d) => d.data && setSettings(d.data));
  }, [token, days, authHeaders, setAuthed]);

  useEffect(() => { loadData(); }, [loadData]);

  const maxViews = data ? Math.max(...data.byDay.map((d) => d.views), 1) : 1;

  return (
    <div className="p-8 max-w-6xl">
      <h1 className="text-2xl font-black tracking-tight mb-1">Dashboard</h1>
      <p className="text-white/30 text-sm mb-8">Site analytics overview</p>

      {!data ? (
        <div className="text-center py-20 text-white/20">Loading...</div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Views", value: data.total, sub: `Last ${days} days` },
              { label: "Today", value: data.today, sub: `Yesterday: ${data.yesterday}` },
              { label: "Unique Visitors", value: data.uniqueVisitors, sub: `Last ${days} days` },
              {
                label: "Daily Avg",
                value: data.byDay.length > 0 ? Math.round(data.total / data.byDay.length) : 0,
                sub: "views/day",
              },
            ].map((s) => (
              <div key={s.label} className="bg-white/[0.03] rounded-xl p-5 border border-white/[0.06]">
                <p className="text-white/30 text-xs mb-1">{s.label}</p>
                <p className="text-3xl font-black tracking-tight">{s.value.toLocaleString()}</p>
                <p className="text-white/20 text-xs mt-1">{s.sub}</p>
              </div>
            ))}
          </div>

          {/* Period Selector */}
          <div className="flex gap-2 mb-6">
            {[7, 14, 30, 90].map((d) => (
              <button
                key={d}
                onClick={() => setDays(d)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  days === d
                    ? "bg-purple-500/20 text-purple-400"
                    : "text-white/30 hover:text-white hover:bg-white/5"
                }`}
              >
                {d}D
              </button>
            ))}
          </div>

          {/* Chart */}
          <div className="bg-white/[0.03] rounded-xl p-6 border border-white/[0.06] mb-8">
            <h3 className="text-sm font-bold text-white/60 mb-4">Daily Views</h3>
            {data.byDay.length === 0 ? (
              <p className="text-white/20 text-sm py-8 text-center">No data</p>
            ) : (
              <div className="flex items-end gap-1 h-40">
                {data.byDay.map((d) => (
                  <div key={d.date} className="flex-1 flex flex-col items-center gap-1 min-w-0">
                    <span className="text-[10px] text-white/30">{d.views}</span>
                    <div
                      className="w-full bg-gradient-to-t from-purple-500 to-cyan-500 rounded-t-sm min-h-[2px]"
                      style={{ height: `${(d.views / maxViews) * 100}%` }}
                    />
                    <span className="text-[9px] text-white/20 truncate w-full text-center">
                      {d.date.slice(5)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Page & Referrer Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white/[0.03] rounded-xl p-6 border border-white/[0.06]">
              <h3 className="text-sm font-bold text-white/60 mb-4">Page Views</h3>
              {data.byPage.length === 0 ? (
                <p className="text-white/20 text-sm text-center py-4">No data</p>
              ) : (
                <div className="space-y-2">
                  {data.byPage.map((p) => (
                    <div key={p.path} className="flex items-center justify-between text-sm">
                      <span className="text-white/60 truncate mr-4 font-mono text-xs">{p.path}</span>
                      <span className="text-white font-bold flex-shrink-0">{p.views}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="bg-white/[0.03] rounded-xl p-6 border border-white/[0.06]">
              <h3 className="text-sm font-bold text-white/60 mb-4">Referrers</h3>
              {data.topReferrers.length === 0 ? (
                <p className="text-white/20 text-sm text-center py-4">No data</p>
              ) : (
                <div className="space-y-2">
                  {data.topReferrers.map((r) => (
                    <div key={r.referrer} className="flex items-center justify-between text-sm">
                      <span className="text-white/60 truncate mr-4 text-xs">{r.referrer}</span>
                      <span className="text-white font-bold flex-shrink-0">{r.views}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Status */}
          <div className="mt-8 bg-white/[0.03] rounded-xl p-6 border border-white/[0.06]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white/60">Site Status</h3>
                <p className="text-xs text-white/20 mt-1">Maintenance mode</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  settings.maintenance_mode === "on"
                    ? "bg-red-500/20 text-red-400"
                    : "bg-green-500/20 text-green-400"
                }`}
              >
                {settings.maintenance_mode === "on" ? "Maintenance" : "Online"}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
