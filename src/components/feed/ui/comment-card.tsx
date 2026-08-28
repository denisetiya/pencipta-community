"use client";

import React, { useState } from "react";
import { MoreHorizontal, User } from "lucide-react";
import type { PostComment } from "../types/feed.types";
import { PostActions } from "./post-actions";

interface CommentCardProps {
  comment: PostComment;
  onLike?: (id: string) => void;
  onRepost?: () => void;
}

export function CommentCard({ comment, onLike, onRepost }: CommentCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <article className="relative border-b border-zinc-100/90 bg-white px-4 py-4 md:px-6 transition-colors hover:bg-zinc-50/30">
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-200 text-xs font-bold text-zinc-600 shadow-2xs select-none">
          {comment.author.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={comment.author.avatarUrl}
              alt={comment.author.name}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <User className="h-5 w-5 text-zinc-500" />
          )}
        </div>

        {/* Comment Body Area */}
        <div className="flex-1 min-w-0">
          {/* Header Row */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-bold text-[14.5px] text-zinc-900 tracking-tight leading-snug">
                {comment.author.name}
              </span>
              <span className="text-[13.5px] text-zinc-500 font-normal">
                {comment.author.handle}
              </span>
              <span className="text-zinc-400 text-xs">•</span>
              <span className="text-[13.5px] text-zinc-500 font-normal">
                {comment.createdAt}
              </span>
            </div>

            {/* Context Menu */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowMenu((prev) => !prev)}
                title="More options"
                className="flex h-7 w-7 items-center justify-center rounded-full text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition-colors cursor-pointer"
              >
                <MoreHorizontal className="h-4 w-4" />
              </button>

              {showMenu && (
                <>
                  <div
                    className="fixed inset-0 z-20"
                    onClick={() => setShowMenu(false)}
                  />
                  <div className="absolute right-0 top-7 z-30 w-32 rounded-xl border border-zinc-200 bg-white p-1 shadow-lg text-xs font-medium text-zinc-700 animate-in fade-in zoom-in-95">
                    <button
                      type="button"
                      onClick={() => setShowMenu(false)}
                      className="w-full rounded-lg px-2.5 py-1.5 text-left hover:bg-zinc-100 text-zinc-800 transition-colors"
                    >
                      Report
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Comment Content */}
          <div className="mt-1.5 text-[14px] leading-relaxed text-zinc-900 font-normal whitespace-pre-line break-words">
            {comment.content}
          </div>

          {/* Actions Row */}
          <div className="mt-3">
            <PostActions
              reactions={comment.reactions}
              onLike={() => onLike?.(comment.id)}
              onRepost={onRepost}
            />
          </div>
        </div>
      </div>
    </article>
  );
}
