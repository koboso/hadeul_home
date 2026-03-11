"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

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
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [days, setDays] = useState(7);
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [settings, setSettings] = useState<Record<string, string>>({});

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

  const authHeaders = useCallback(
    () => ({ "Content-Type": "application/json", Authorization: `Bearer ${token}` }),
    [token]
  );

  useEffect(() => {
    if (!authed || !token) return;
    // Load analytics
    fetch(`/api/admin/analytics?days=${days}`, { headers: authHeaders() })
      .then((r) => {
        if (r.status === 401) { setAuthed(false); localStorage.removeItem("admin_token"); return null; }
        return r.json();
      })
      .then((d) => d && setData(d.data));
    // Load settings
    fetch("/api/admin/settings", { headers: authHeaders() })
      .then((r) => r.json())
      .then((d) => d.data && setSettings(d.data));
  }, [authed, token, days, authHeaders]);

  const logout = () => {
    setAuthed(false);
    setToken("");
    localStorage.removeItem("admin_token");
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

  const maxViews = data ? Math.max(...data.byDay.map((d) => d.views), 1) : 1;

  /* ─── Dashboard ─── */
  return (
    <div className="min-h-screen bg-[#111] text-white">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black tracking-tight">Dashboard</h1>
            <p className="text-white/30 text-sm mt-1">사이트 분석 및 관리</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-white/30 text-sm hover:text-white transition-colors">
              사이트 &rarr;
            </Link>
            <button onClick={logout} className="text-white/30 text-sm hover:text-red-400 transition-colors">
              로그아웃
            </button>
          </div>
        </div>

        {/* Nav */}
        <div className="flex gap-3 mb-8 border-b border-white/5 pb-4">
          <Link href="/admin" className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg text-sm font-bold">
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

        {!data ? (
          <div className="text-center py-20 text-white/20">로딩 중...</div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: "전체 조회수", value: data.total, sub: `최근 ${days}일` },
                { label: "오늘", value: data.today, sub: `어제: ${data.yesterday}` },
                { label: "고유 방문자", value: data.uniqueVisitors, sub: `최근 ${days}일` },
                {
                  label: "일평균",
                  value: data.byDay.length > 0 ? Math.round(data.total / data.byDay.length) : 0,
                  sub: "views/day",
                },
              ].map((s) => (
                <div key={s.label} className="bg-[#1a1a1a] rounded-xl p-5 border border-white/5">
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
                  {d}일
                </button>
              ))}
            </div>

            {/* Chart (simple bar) */}
            <div className="bg-[#1a1a1a] rounded-xl p-6 border border-white/5 mb-8">
              <h3 className="text-sm font-bold text-white/60 mb-4">일별 조회수</h3>
              {data.byDay.length === 0 ? (
                <p className="text-white/20 text-sm py-8 text-center">데이터가 없습니다.</p>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#1a1a1a] rounded-xl p-6 border border-white/5">
                <h3 className="text-sm font-bold text-white/60 mb-4">페이지별 조회수</h3>
                {data.byPage.length === 0 ? (
                  <p className="text-white/20 text-sm text-center py-4">데이터 없음</p>
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
              <div className="bg-[#1a1a1a] rounded-xl p-6 border border-white/5">
                <h3 className="text-sm font-bold text-white/60 mb-4">유입 경로</h3>
                {data.topReferrers.length === 0 ? (
                  <p className="text-white/20 text-sm text-center py-4">데이터 없음</p>
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
            <div className="mt-8 bg-[#1a1a1a] rounded-xl p-6 border border-white/5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white/60">사이트 상태</h3>
                  <p className="text-xs text-white/20 mt-1">점검 모드 상태</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    settings.maintenance_mode === "on"
                      ? "bg-red-500/20 text-red-400"
                      : "bg-green-500/20 text-green-400"
                  }`}
                >
                  {settings.maintenance_mode === "on" ? "점검 중" : "정상 운영"}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
