"use client";

import React, { useState, useMemo } from "react";
import { Search, Trash2, MessageSquare, Plus } from "lucide-react";
import { ConversationSession } from "../types/assistant.types";

interface HistoryViewProps {
  conversations: ConversationSession[];
  activeSessionId: string | null;
  onSelectSession: (id: string) => void;
  onDeleteSession: (id: string) => void;
  onNewChat: () => void;
  isSidebar?: boolean;
}

export function HistoryView({
  conversations,
  activeSessionId,
  onSelectSession,
  onDeleteSession,
  onNewChat,
  isSidebar = false,
}: HistoryViewProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = useMemo(() => {
    if (!searchQuery.trim()) return conversations;
    const q = searchQuery.toLowerCase();
    return conversations.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.preview.toLowerCase().includes(q) ||
        c.messages.some((m) => m.text.toLowerCase().includes(q))
    );
  }, [conversations, searchQuery]);

  return (
    <div
      className={`flex flex-1 flex-col overflow-hidden bg-white ${
        isSidebar ? "w-full border-r border-zinc-200/80 bg-zinc-50/40" : ""
      }`}
    >
      <div className={`${isSidebar ? "p-3.5 pb-2" : "px-4 sm:px-6 pt-2 pb-4"}`}>
        <div className="relative flex items-center">
          <Search className="pointer-events-none absolute left-3.5 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for conversations..."
            className="h-10 w-full rounded-xl border border-zinc-200/90 bg-white pl-10 pr-4 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900/10 transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 text-xs font-medium text-zinc-400 hover:text-zinc-600 cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto divide-y divide-zinc-100/90">
        {filteredConversations.length > 0 ? (
          filteredConversations.map((conv) => {
            const isActive = conv.id === activeSessionId;

            return (
              <div
                key={conv.id}
                className={`group relative flex items-center justify-between transition-all cursor-pointer ${
                  isSidebar ? "px-4 py-3" : "px-4 sm:px-6 py-4.5"
                } ${
                  isActive
                    ? "bg-zinc-100 text-zinc-900 font-medium"
                    : "hover:bg-zinc-100/60 text-zinc-700"
                }`}
                onClick={() => onSelectSession(conv.id)}
              >
                <div className="flex-1 pr-3 min-w-0">
                  <h3
                    className={`tracking-tight truncate ${
                      isSidebar ? "text-sm font-semibold text-zinc-900" : "text-[15px] font-semibold text-zinc-900"
                    }`}
                  >
                    {conv.title}
                  </h3>

                  <p
                    className={`mt-0.5 leading-snug text-zinc-500 line-clamp-2 ${
                      isSidebar ? "text-xs text-zinc-500" : "text-[13px]"
                    }`}
                  >
                    {conv.preview}
                  </p>
                </div>

                <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteSession(conv.id);
                    }}
                    aria-label="Delete conversation"
                    title="Delete conversation"
                    className="flex h-7 w-7 items-center justify-center rounded-full text-zinc-400 hover:bg-zinc-200 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center px-4 py-12 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-400 mb-2">
              <MessageSquare className="h-5 w-5" />
            </div>
            <p className="text-xs font-medium text-zinc-700">No conversations found</p>
            <p className="mt-1 text-[11px] text-zinc-400 max-w-xs">
              {searchQuery
                ? `No results matching "${searchQuery}".`
                : "Your chat history will appear here."}
            </p>
            <button
              type="button"
              onClick={onNewChat}
              className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-3.5 py-1.5 text-xs font-medium text-white hover:bg-zinc-800 transition active:scale-95 cursor-pointer"
            >
              <Plus className="h-3 w-3" />
              <span>Start new</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
