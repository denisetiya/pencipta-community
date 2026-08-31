"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, MoreHorizontal } from "lucide-react";
import type { PostItem } from "../types/feed.types";
import { PostActions } from "./post-actions";
import { CommentCard } from "./comment-card";
import { CommentInputBar } from "./comment-input-bar";
import { MobileStatusBar } from "@/components/layout/mobile-status-bar";
import { useFeed } from "../context/feed-context";

interface PostDetailViewProps {
  post: PostItem;
}

export function PostDetailView({ post: initialPost }: PostDetailViewProps) {
  const router = useRouter();
  const { posts, toggleLike, toggleRepost, toggleCommentLike } = useFeed();
  const [showMenu, setShowMenu] = useState(false);

  // Use live post from feed context if available to keep stats updated
  const currentPost = posts.find((p) => p.id === initialPost.id) ?? initialPost;

  return (
    <div className="flex min-h-full flex-col bg-white">
      {/* Top Header with Mobile Status Bar + Back Navigation */}
      <div className="sticky top-0 z-30 flex w-full flex-col border-b border-zinc-100/90 bg-white/95 backdrop-blur-md md:hidden">
        {/* Mobile Platform Status Bar (Android & iOS in Dev Mode / Mobile Viewports) */}
        <MobileStatusBar />

        {/* Header Bar */}
        <div className="flex h-14 w-full items-center justify-between px-4">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Go back"
            className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-900 hover:bg-zinc-100 active:scale-95 transition-colors cursor-pointer"
          >
            <ChevronLeft className="h-6 w-6 stroke-[2.2]" />
          </button>

          <h1 className="text-base font-bold text-zinc-900 tracking-tight">Post</h1>

          <div className="w-9" aria-hidden="true" />
        </div>
      </div>

      {/* Main Post Section */}
      <article className="border-b border-zinc-100/90 px-4 py-4.5 md:px-6 md:py-6">
        <div className="flex items-start gap-3.5">
          {/* Avatar */}
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-zinc-200 text-xs font-bold text-zinc-700 select-none shadow-2xs">
            {currentPost.author.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={currentPost.author.avatarUrl}
                alt={currentPost.author.name}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <span>{currentPost.author.initials || currentPost.author.name.slice(0, 2).toUpperCase()}</span>
            )}
          </div>

          {/* Author info & More Menu */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-bold text-[15.5px] text-zinc-900 tracking-tight leading-snug">
                    {currentPost.author.name}
                  </span>
                  <span className="text-[14px] text-zinc-500 font-normal">
                    {currentPost.author.handle}
                  </span>
                  <span className="text-zinc-400 text-xs">•</span>
                  <span className="text-[14px] text-zinc-500 font-normal">
                    {currentPost.createdAt}
                  </span>
                </div>

                {(currentPost.author.role || currentPost.author.experience) && (
                  <p className="text-[13px] text-zinc-500 font-normal leading-tight mt-0.5">
                    {currentPost.author.role}
                    {currentPost.author.experience ? ` • ${currentPost.author.experience}` : ""}
                  </p>
                )}
              </div>

              {/* Context menu */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowMenu((prev) => !prev)}
                  title="More options"
                  className="flex h-7 w-7 items-center justify-center rounded-full text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition-colors cursor-pointer"
                >
                  <MoreHorizontal className="h-4.5 w-4.5" />
                </button>

                {showMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-20"
                      onClick={() => setShowMenu(false)}
                    />
                    <div className="absolute right-0 top-8 z-30 w-36 rounded-xl border border-zinc-200 bg-white p-1 shadow-lg text-xs font-medium text-zinc-700 animate-in fade-in zoom-in-95">
                      <button
                        type="button"
                        onClick={() => setShowMenu(false)}
                        className="w-full rounded-lg px-3 py-2 text-left hover:bg-zinc-100 text-zinc-800 transition-colors cursor-pointer"
                      >
                        Copy link
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Post Content */}
            <div className="mt-3 text-[15px] leading-relaxed text-zinc-900 font-normal whitespace-pre-line break-words">
              {currentPost.content}
            </div>

            {/* Attachment Container */}
            {currentPost.attachment && currentPost.attachment.type === "placeholder" && (
              <div className="mt-3.5 h-48 sm:h-56 md:h-64 w-full rounded-2xl bg-zinc-100/90 border border-zinc-200/70 transition-all hover:bg-zinc-100 flex items-center justify-center" />
            )}

            {/* Action Pills */}
            <div className="mt-4">
              <PostActions
                reactions={currentPost.reactions}
                onLike={() => toggleLike(currentPost.id)}
                onRepost={() => toggleRepost(currentPost.id)}
              />
            </div>
          </div>
        </div>
      </article>

      {/* Metrics & Timestamp Row */}
      <div className="border-b border-zinc-100/90 px-4 py-3 md:px-6">
        <div className="flex items-center gap-4 text-xs text-zinc-900 font-medium">
          <div>
            <span className="font-bold">{currentPost.reactions.repostsCount}</span>{" "}
            <span className="text-zinc-600">Repost</span>
          </div>
          <div>
            <span className="font-bold">{currentPost.quotesCount ?? 0}</span>{" "}
            <span className="text-zinc-600">Quote</span>
          </div>
          <div>
            <span className="font-bold">{currentPost.reactions.rocketsCount}</span>{" "}
            <span className="text-zinc-600">Like</span>
          </div>
        </div>
        <p className="mt-1.5 text-[11px] text-zinc-400">
          {currentPost.formattedDate || "18.08.2026 • 20:10"}
        </p>
      </div>

      {/* Comments List Section */}
      <div className="flex-1">
        <h2 className="px-4 pt-4 pb-2 text-base font-bold text-zinc-900 md:px-6 md:text-[17px]">
          Comments
        </h2>

        {currentPost.comments && currentPost.comments.length > 0 ? (
          <div className="divide-y divide-transparent">
            {currentPost.comments.map((comment) => (
              <CommentCard
                key={comment.id}
                comment={comment}
                onLike={() => toggleCommentLike(currentPost.id, comment.id)}
              />
            ))}
          </div>
        ) : (
          <div className="px-4 py-8 text-center text-xs text-zinc-400">
            No comments yet. Start the conversation!
          </div>
        )}
      </div>

      {/* Bottom Reply Input Bar */}
      <CommentInputBar postId={currentPost.id} />
    </div>
  );
}
