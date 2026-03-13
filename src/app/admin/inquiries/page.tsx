"use client";

import { useEffect, useState, useCallback } from "react";
import AdminLayout from "@/components/AdminLayout";

interface Inquiry {
  id: string;
  type: string;
  company: string;
  name: string;
  phone: string;
  email: string;
  content: string;
  is_read: number;
  ip: string;
  created_at: string;
}

const TYPE_LABELS: Record<string, string> = {
  project: "프로젝트",
  publishing: "퍼블리싱",
  partnership: "파트너십",
  careers: "채용",
  other: "기타",
};

const TYPE_COLORS: Record<string, string> = {
  project: "bg-purple-500/10 text-purple-400",
  publishing: "bg-green-500/10 text-green-400",
  partnership: "bg-pink-500/10 text-pink-400",
  careers: "bg-cyan-500/10 text-cyan-400",
  other: "bg-amber-500/10 text-amber-400",
};

export default function AdminInquiries() {
  return (
    <AdminLayout>
      {(auth) => <InquiriesContent {...auth} />}
    </AdminLayout>
  );
}

function InquiriesContent({ setAuthed, authHeaders }: { token: string; authed: boolean; setAuthed: (v: boolean) => void; authHeaders: () => Record<string, string> }) {
  const [items, setItems] = useState<Inquiry[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [filter, setFilter] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [msg, setMsg] = useState("");

  const headers = useCallback(() => authHeaders(), [authHeaders]);

  const loadItems = useCallback(async () => {
    const params = filter === "all" ? "" : `?is_read=${filter === "unread" ? "0" : "1"}`;
    const res = await fetch(`/api/admin/inquiries${params}`, { headers: headers() });
    if (res.status === 401) { setAuthed(false); return; }
    const data = await res.json();
    setItems(data.data || []);
    setUnreadCount(data.unreadCount || 0);
  }, [filter, headers, setAuthed]);

  useEffect(() => { loadItems(); }, [loadItems]);

  const markRead = async (id: string, isRead: number) => {
    const res = await fetch(`/api/admin/inquiries/${id}`, {
      method: "PATCH",
      headers: headers(),
      body: JSON.stringify({ is_read: isRead }),
    });
    if (res.status === 401) { setAuthed(false); return; }
    loadItems();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("이 문의를 삭제하시겠습니까?")) return;
    const res = await fetch(`/api/admin/inquiries/${id}`, {
      method: "DELETE",
      headers: headers(),
    });
    if (res.status === 401) { setAuthed(false); return; }
    const data = await res.json();
    if (data.error) { setMsg(data.error); return; }
    setMsg("삭제 완료");
    setExpandedId(null);
    loadItems();
  };

  const toggleExpand = (item: Inquiry) => {
    if (expandedId === item.id) {
      setExpandedId(null);
    } else {
      setExpandedId(item.id);
      if (item.is_read === 0) markRead(item.id, 1);
    }
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + "Z");
    return d.toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-2xl font-black tracking-tight">Inquiries</h1>
        {unreadCount > 0 && (
          <span className="px-3 py-1 text-xs font-bold bg-purple-500/20 text-purple-300 rounded-full">
            {unreadCount} 미확인
          </span>
        )}
      </div>
      <p className="text-white/30 text-sm mb-8">고객 문의 관리</p>

      {msg && (
        <div className="mb-6 px-4 py-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm">
          {msg}
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        {[
          { key: "all", label: "전체" },
          { key: "unread", label: "미확인" },
          { key: "read", label: "확인됨" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              filter === tab.key
                ? "bg-purple-500/15 text-purple-300 border border-purple-500/20"
                : "text-white/40 border border-white/[0.06] hover:text-white/60 hover:border-white/10"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Items */}
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className={`rounded-xl border transition-all ${
            item.is_read === 0
              ? "bg-purple-500/[0.03] border-purple-500/10"
              : "bg-white/[0.02] border-white/[0.04]"
          }`}>
            {/* Row header */}
            <button
              onClick={() => toggleExpand(item)}
              className="w-full flex items-center gap-4 p-4 text-left hover:bg-white/[0.02] transition-colors rounded-xl"
            >
              {/* Unread dot */}
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${item.is_read === 0 ? "bg-purple-500" : "bg-transparent"}`} />

              {/* Type badge */}
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold flex-shrink-0 ${TYPE_COLORS[item.type] || "bg-white/5 text-white/40"}`}>
                {TYPE_LABELS[item.type] || item.type || "-"}
              </span>

              {/* Name + Company */}
              <div className="flex-1 min-w-0">
                <span className="text-white font-bold text-sm">{item.name}</span>
                {item.company && <span className="text-white/30 text-sm ml-2">({item.company})</span>}
              </div>

              {/* Email */}
              <span className="text-white/30 text-xs hidden md:block flex-shrink-0">{item.email}</span>

              {/* Date */}
              <span className="text-white/20 text-xs flex-shrink-0">{formatDate(item.created_at)}</span>

              {/* Expand icon */}
              <svg className={`w-4 h-4 text-white/20 transition-transform ${expandedId === item.id ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Expanded detail */}
            {expandedId === item.id && (
              <div className="px-4 pb-4 border-t border-white/[0.04]">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 text-xs">
                  <div>
                    <span className="text-white/30 block mb-1">소속</span>
                    <span className="text-white/70">{item.company || "-"}</span>
                  </div>
                  <div>
                    <span className="text-white/30 block mb-1">연락처</span>
                    <span className="text-white/70">{item.phone || "-"}</span>
                  </div>
                  <div>
                    <span className="text-white/30 block mb-1">이메일</span>
                    <a href={`mailto:${item.email}`} className="text-purple-400 hover:text-purple-300">{item.email}</a>
                  </div>
                  <div>
                    <span className="text-white/30 block mb-1">IP</span>
                    <span className="text-white/40">{item.ip}</span>
                  </div>
                </div>

                <div className="bg-white/[0.02] rounded-lg p-4 mb-4">
                  <span className="text-white/30 text-xs block mb-2">문의 내용</span>
                  <p className="text-white/70 text-sm leading-relaxed whitespace-pre-wrap">{item.content}</p>
                </div>

                <div className="flex gap-2">
                  {item.is_read === 1 ? (
                    <button onClick={() => markRead(item.id, 0)} className="px-3 py-1.5 text-xs border border-white/[0.08] rounded-lg text-white/40 hover:text-white hover:border-white/20 transition-colors">
                      미확인으로 변경
                    </button>
                  ) : (
                    <button onClick={() => markRead(item.id, 1)} className="px-3 py-1.5 text-xs border border-purple-500/20 rounded-lg text-purple-400/60 hover:text-purple-400 hover:border-purple-500/40 transition-colors">
                      확인 처리
                    </button>
                  )}
                  <button onClick={() => handleDelete(item.id)} className="px-3 py-1.5 text-xs border border-red-500/20 rounded-lg text-red-400/60 hover:text-red-400 hover:border-red-500/40 transition-colors">
                    삭제
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {items.length === 0 && (
          <p className="text-center text-white/20 py-12">문의가 없습니다.</p>
        )}
      </div>
    </div>
  );
}
