"use client";

import React, { useState } from "react";
import { Send } from "lucide-react";
import { useFeed } from "../context/feed-context";

interface CommentInputBarProps {
  postId: string;
}

export function CommentInputBar({ postId }: CommentInputBarProps) {
  const { addComment } = useFeed();
  const [commentText, setCommentText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    addComment(postId, commentText.trim());
    setCommentText("");
  };

  return (
    <div className="sticky bottom-0 z-30 border-t border-zinc-100/90 bg-white/95 px-4 py-3 backdrop-blur-md md:px-6">
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        {/* User Avatar */}
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-700 text-[11px] font-bold text-white shadow-2xs select-none">
          ME
        </div>

        {/* Capsule Input Field */}
        <div className="relative flex-1">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Send your comment"
            className="w-full rounded-full border border-zinc-200 bg-white py-2.5 pl-4.5 pr-10 text-[13.5px] text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950 transition-all shadow-2xs"
          />

          <button
            type="submit"
            disabled={!commentText.trim()}
            aria-label="Send comment"
            className="absolute right-2 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-zinc-950 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </div>
      </form>
    </div>
  );
}
