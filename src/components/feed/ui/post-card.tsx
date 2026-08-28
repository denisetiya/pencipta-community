"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MoreHorizontal } from "lucide-react";
import type { PostItem } from "../types/feed.types";
import { PostActions } from "./post-actions";

interface PostCardProps {
  post: PostItem;
  onLike: (id: string) => void;
  onRepost: (id: string) => void;
}

export function PostCard({ post, onLike, onRepost }: PostCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <article className="relative border-b border-zinc-100/90 bg-white px-4 py-4.5 md:px-6 md:py-5.5 transition-colors hover:bg-zinc-50/40">
      <div className="flex items-start gap-3.5">
        {/* Left Avatar */}
        <Link
          href={`/post/${post.id}`}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-zinc-200 text-xs font-bold text-zinc-700 select-none shadow-2xs hover:opacity-90 transition-opacity"
        >
          {post.author.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.author.avatarUrl}
              alt={post.author.name}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <span>{post.author.initials || post.author.name.slice(0, 2).toUpperCase()}</span>
          )}
        </Link>

        {/* Post Content Area */}
        <div className="flex-1 min-w-0">
          {/* Header Row */}
          <div className="flex items-start justify-between gap-2">
            <Link href={`/post/${post.id}`} className="group block">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-bold text-[15px] md:text-[15.5px] text-zinc-900 tracking-tight leading-snug group-hover:underline">
                  {post.author.name}
                </span>
                <span className="text-[14px] text-zinc-500 font-normal">
                  {post.author.handle}
                </span>
                <span className="text-zinc-400 text-xs">•</span>
                <span className="text-[14px] text-zinc-500 font-normal">
                  {post.createdAt}
                </span>
              </div>

              {/* Subtitle / Experience */}
              {(post.author.role || post.author.experience) && (
                <p className="text-[13px] text-zinc-500 font-normal leading-tight mt-0.5">
                  {post.author.role}
                  {post.author.experience ? ` • ${post.author.experience}` : ""}
                </p>
              )}
            </Link>

            {/* Context Menu Icon */}
            <div className="relative">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu((prev) => !prev);
                }}
                title="More options"
                className="flex h-7 w-7 items-center justify-center rounded-full text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition-colors cursor-pointer"
              >
                <MoreHorizontal className="h-4.5 w-4.5" />
              </button>

              {showMenu && (
                <>
                  <div
                    className="fixed inset-0 z-20"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowMenu(false);
                    }}
                  />
                  <div className="absolute right-0 top-8 z-30 w-36 rounded-xl border border-zinc-200 bg-white p-1 shadow-lg text-xs font-medium text-zinc-700 animate-in fade-in zoom-in-95">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowMenu(false);
                      }}
                      className="w-full rounded-lg px-3 py-2 text-left hover:bg-zinc-100 text-zinc-800 transition-colors cursor-pointer"
                    >
                      Copy link
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowMenu(false);
                      }}
                      className="w-full rounded-lg px-3 py-2 text-left hover:bg-zinc-100 text-zinc-800 transition-colors cursor-pointer"
                    >
                      Mute @{post.author.handle}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Body Content with Link to Post Thread */}
          <Link href={`/post/${post.id}`} className="block">
            <div className="mt-2.5 text-[14.5px] md:text-[15px] leading-relaxed text-zinc-900 font-normal whitespace-pre-line break-words">
              {post.content}
            </div>

            {/* Attachment Box (Placeholder from Reference Image) */}
            {post.attachment && post.attachment.type === "placeholder" && (
              <div className="mt-3.5 h-44 sm:h-56 md:h-64 w-full rounded-2xl bg-zinc-100/90 border border-zinc-200/70 transition-all hover:bg-zinc-100 flex items-center justify-center" />
            )}
          </Link>

          {/* Actions Row */}
          <div className="mt-4">
            <PostActions
              reactions={post.reactions}
              onLike={() => onLike(post.id)}
              onRepost={() => onRepost(post.id)}
            />
          </div>
        </div>
      </div>
    </article>
  );
}
