"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

export default function AdminSettings() {
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [maintenance, setMaintenance] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

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
    fetch("/api/admin/settings", { headers: authHeaders() })
      .then((r) => {
        if (r.status === 401) { setAuthed(false); localStorage.removeItem("admin_token"); return null; }
        return r.json();
      })
      .then((d) => {
        if (d?.data) setMaintenance(d.data.maintenance_mode === "on");
      });
  }, [authed, token, authHeaders]);

  const toggleMaintenance = async () => {
    const newValue = !maintenance;
    setSaving(true);
    setMsg("");
    const res = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify({ maintenance_mode: newValue ? "on" : "off" }),
    });
    const d = await res.json();
    setSaving(false);
    if (d.success) {
      setMaintenance(newValue);
      setMsg(newValue ? "점검 모드가 활성화되었습니다." : "사이트가 정상 운영됩니다.");
    } else {
      setMsg(d.error || "설정 변경 실패");
    }
  };

  const logout = () => {
    setAuthed(false);
    setToken("");
    localStorage.removeItem("admin_token");
  };

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

  return (
    <div className="min-h-screen bg-[#111] text-white">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black tracking-tight">Settings</h1>
            <p className="text-white/30 text-sm mt-1">사이트 설정 관리</p>
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
          <Link
            href="/admin/careers"
            className="px-4 py-2 text-white/30 hover:text-white hover:bg-white/5 rounded-lg text-sm font-bold transition-colors"
          >
            Careers
          </Link>
          <Link href="/admin/settings" className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg text-sm font-bold">
            Settings
          </Link>
        </div>

        {msg && (
          <div className="mb-6 px-4 py-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm">
            {msg}
          </div>
        )}

        {/* Maintenance Mode */}
        <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold mb-1">점검 모드</h2>
              <p className="text-white/30 text-sm">
                활성화 시 모든 페이지에 점검 안내 페이지가 표시됩니다.
                <br />
                관리자 페이지(/admin)는 영향 없이 접근 가능합니다.
              </p>
            </div>
            <button
              onClick={toggleMaintenance}
              disabled={saving}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                maintenance ? "bg-red-500" : "bg-white/10"
              }`}
            >
              <span
                className={`absolute top-0.5 w-6 h-6 bg-white rounded-full transition-transform ${
                  maintenance ? "translate-x-7" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>
          <div className="mt-4 pt-4 border-t border-white/5">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                maintenance ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"
              }`}
            >
              {maintenance ? "점검 중" : "정상 운영"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
