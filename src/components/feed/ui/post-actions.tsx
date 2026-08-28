"use client";

import React, { useState } from "react";
import { MessageCircle, Repeat2, Rocket, BarChart2, Share2, Check } from "lucide-react";
import type { PostReaction } from "../types/feed.types";

interface PostActionsProps {
  reactions: PostReaction;
  onLike?: () => void;
  onRepost?: () => void;
  onComment?: () => void;
  onShare?: () => void;
}

export function PostActions({
  reactions,
  onLike,
  onRepost,
  onComment,
  onShare,
}: PostActionsProps) {
  const [copied, setCopied] = useState(false);

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onShare) {
      onShare();
      return;
    }
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLike?.();
  };

  const handleRepostClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRepost?.();
  };

  const handleCommentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onComment?.();
  };

  return (
    <div className="flex items-center gap-2 pt-1 select-none flex-wrap">
      {/* Comments Pill */}
      <button
        type="button"
        onClick={handleCommentClick}
        title="Reply / Comments"
        className="flex items-center gap-1.5 rounded-full border border-zinc-200/90 bg-white px-2.5 py-1 text-[13px] font-medium text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 active:scale-95 transition-all cursor-pointer shadow-2xs"
      >
        <MessageCircle className="h-3.5 w-3.5 text-zinc-500" />
        <span>{reactions.commentsCount}</span>
      </button>

      {/* Repost Pill */}
      <button
        type="button"
        onClick={handleRepostClick}
        title="Repost"
        className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[13px] font-medium transition-all active:scale-95 cursor-pointer shadow-2xs ${
          reactions.isRepostedByMe
            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
            : "border-zinc-200/90 bg-white text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
        }`}
      >
        <Repeat2
          className={`h-3.5 w-3.5 ${
            reactions.isRepostedByMe ? "text-emerald-600" : "text-zinc-500"
          }`}
        />
        <span>{reactions.repostsCount}</span>
      </button>

      {/* Boost / Rocket Pill */}
      <button
        type="button"
        onClick={handleLikeClick}
        title="Boost / Upvote"
        className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[13px] font-medium transition-all active:scale-95 cursor-pointer shadow-2xs ${
          reactions.isLikedByMe
            ? "border-cyan-200 bg-cyan-50 text-cyan-700"
            : "border-zinc-200/90 bg-white text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
        }`}
      >
        <Rocket
          className={`h-3.5 w-3.5 transition-transform ${
            reactions.isLikedByMe
              ? "text-cyan-600 scale-110 rotate-12"
              : "text-zinc-500 group-hover:rotate-6"
          }`}
        />
        <span>{reactions.rocketsCount}</span>
      </button>

      {/* Views Pill */}
      <div
        title="Views"
        className="flex items-center gap-1.5 rounded-full border border-zinc-200/90 bg-white px-2.5 py-1 text-[13px] font-medium text-zinc-600 shadow-2xs cursor-default"
      >
        <BarChart2 className="h-3.5 w-3.5 text-zinc-500" />
        <span>{reactions.viewsCount}</span>
      </div>

      {/* Share Pill / Button */}
      <button
        type="button"
        onClick={handleShareClick}
        title={copied ? "Link Copied!" : "Share Post"}
        className={`flex items-center justify-center rounded-full border px-2 py-1 text-[13px] font-medium transition-all active:scale-95 cursor-pointer shadow-2xs ${
          copied
            ? "border-emerald-200 bg-emerald-50 text-emerald-600"
            : "border-zinc-200/90 bg-white text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
        }`}
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-emerald-600" />
        ) : (
          <Share2 className="h-3.5 w-3.5" />
        )}
      </button>
    </div>
  );
}
