"use client";

import React, { useState } from "react";
import {
  MoreHorizontal,
  ChevronDown,
  X,
  Check,
  Share2,
  Image as ImageIcon,
  MessageCircle,
  Repeat2,
  Rocket,
  Bookmark,
} from "lucide-react";
import { CURRENT_PROFILE, ALEX_POSTS, UserProfile } from "./data/mock-profile";
import { PostItem } from "@/components/feed/types/feed.types";

export function ProfileView() {
  const [profile, setProfile] = useState<UserProfile>(CURRENT_PROFILE);
  const [posts, setPosts] = useState<PostItem[]>(ALEX_POSTS);
  const [activeTab, setActiveTab] = useState<"posts" | "replies" | "reposts" | "media">("posts");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);
  const [showTopMenu, setShowTopMenu] = useState(false);

  // Edit profile form state
  const [editName, setEditName] = useState(profile.name);
  const [editHandle, setEditHandle] = useState(profile.handle);
  const [editTitle, setEditTitle] = useState(profile.title);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile((prev) => ({
      ...prev,
      name: editName.trim() || prev.name,
      handle: editHandle.trim().startsWith("@") ? editHandle.trim() : `@${editHandle.trim()}`,
      title: editTitle.trim() || prev.title,
      bio: editTitle.trim() || prev.bio,
    }));
    setIsEditModalOpen(false);
  };

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      void navigator.clipboard.writeText(window.location.href);
    }
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 2500);
  };

  const handleToggleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        const isLiked = p.reactions.isLikedByMe;
        return {
          ...p,
          reactions: {
            ...p.reactions,
            isLikedByMe: !isLiked,
            rocketsCount: isLiked ? p.reactions.rocketsCount - 1 : p.reactions.rocketsCount + 1,
          },
        };
      })
    );
  };

  const handleToggleRepost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        const isReposted = p.reactions.isRepostedByMe;
        return {
          ...p,
          reactions: {
            ...p.reactions,
            isRepostedByMe: !isReposted,
            repostsCount: isReposted ? p.reactions.repostsCount - 1 : p.reactions.repostsCount + 1,
          },
        };
      })
    );
  };

  return (
    <div className="flex min-h-full flex-col bg-white">
      {/* Top Header Bar */}
      <div className="sticky top-0 z-30 flex w-full flex-col border-b border-zinc-100/90 bg-white/95 backdrop-blur-md">
        {/* Header Content */}
        <div className="relative flex h-14 w-full items-center justify-between px-4 md:px-6">
          <div className="w-9" aria-hidden="true" />

          {/* Centered Handle */}
          <h1 className="text-base font-bold text-zinc-900 tracking-tight select-none">
            {profile.handle}
          </h1>

          {/* Right Menu Button */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowTopMenu((prev) => !prev)}
              aria-label="More options"
              className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-900 hover:bg-zinc-100 active:scale-95 transition-colors cursor-pointer"
            >
              <MoreHorizontal className="h-5 w-5" />
            </button>

            {showTopMenu && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setShowTopMenu(false)}
                />
                <div className="absolute right-0 top-10 z-30 w-44 rounded-2xl border border-zinc-200 bg-white p-1.5 shadow-xl text-xs font-medium text-zinc-700 animate-in fade-in zoom-in-95">
                  <button
                    type="button"
                    onClick={() => {
                      setShowTopMenu(false);
                      handleShare();
                    }}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left hover:bg-zinc-100 text-zinc-800 transition-colors cursor-pointer"
                  >
                    <Share2 className="h-4 w-4 text-zinc-500" />
                    <span>Share Profile</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Profile Header Card */}
      <div className="px-4 pt-5 pb-4 md:px-6">
        {/* Top Info Row: Avatar + Stats */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Avatar Container */}
          <div className="relative h-20 w-20 sm:h-22 sm:w-22 shrink-0 rounded-full overflow-hidden bg-zinc-200 border-2 border-zinc-100 shadow-2xs">
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-tr from-zinc-700 to-zinc-900 text-lg sm:text-xl font-bold text-white select-none">
              {profile.initials}
            </div>
          </div>

          {/* Stats Row */}
          <div className="flex flex-1 items-center justify-around text-center">
            <div className="flex flex-col items-center">
              <span className="text-base sm:text-lg font-bold text-zinc-900 leading-tight">
                {profile.stats.posts}
              </span>
              <span className="text-xs text-zinc-500 font-normal mt-0.5">Posts</span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-base sm:text-lg font-bold text-zinc-900 leading-tight">
                {profile.stats.followers}
              </span>
              <span className="text-xs text-zinc-500 font-normal mt-0.5">Followers</span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-base sm:text-lg font-bold text-zinc-900 leading-tight">
                {profile.stats.following}
              </span>
              <span className="text-xs text-zinc-500 font-normal mt-0.5">Following</span>
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="mt-3.5">
          <h2 className="text-[17px] font-bold text-zinc-900 leading-tight">
            {profile.name}
          </h2>
          <p className="text-[13.5px] text-zinc-600 font-normal leading-snug mt-1">
            {profile.title}
          </p>
        </div>

        {/* Action Buttons Row */}
        <div className="mt-4 flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              setEditName(profile.name);
              setEditHandle(profile.handle);
              setEditTitle(profile.title);
              setIsEditModalOpen(true);
            }}
            className="flex-1 rounded-xl border border-zinc-200/90 bg-zinc-50/70 hover:bg-zinc-100 active:scale-95 py-2 text-xs sm:text-sm font-semibold text-zinc-900 text-center transition-all cursor-pointer shadow-2xs"
          >
            Edit Profile
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="flex-1 rounded-xl border border-zinc-200/90 bg-zinc-50/70 hover:bg-zinc-100 active:scale-95 py-2 text-xs sm:text-sm font-semibold text-zinc-900 text-center transition-all cursor-pointer shadow-2xs"
          >
            Share Profile
          </button>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="border-b border-zinc-100 flex items-center justify-around px-2 select-none">
        {/* Posts Tab (with dropdown chevron) */}
        <button
          type="button"
          onClick={() => setActiveTab("posts")}
          className={`relative flex items-center gap-1 py-3 px-3 text-sm transition-colors cursor-pointer ${
            activeTab === "posts"
              ? "font-bold text-zinc-950"
              : "font-medium text-zinc-500 hover:text-zinc-900"
          }`}
        >
          <span>Posts</span>
          <ChevronDown className="h-3.5 w-3.5 text-zinc-600 stroke-[2.2]" />
          {activeTab === "posts" && (
            <span className="absolute bottom-0 left-2 right-2 h-[2.5px] rounded-full bg-zinc-950" />
          )}
        </button>

        {/* Replies Tab */}
        <button
          type="button"
          onClick={() => setActiveTab("replies")}
          className={`relative py-3 px-3 text-sm transition-colors cursor-pointer ${
            activeTab === "replies"
              ? "font-bold text-zinc-950"
              : "font-medium text-zinc-500 hover:text-zinc-900"
          }`}
        >
          <span>Replies</span>
          {activeTab === "replies" && (
            <span className="absolute bottom-0 left-2 right-2 h-[2.5px] rounded-full bg-zinc-950" />
          )}
        </button>

        {/* Reposts Tab */}
        <button
          type="button"
          onClick={() => setActiveTab("reposts")}
          className={`relative py-3 px-3 text-sm transition-colors cursor-pointer ${
            activeTab === "reposts"
              ? "font-bold text-zinc-950"
              : "font-medium text-zinc-500 hover:text-zinc-900"
          }`}
        >
          <span>Reposts</span>
          {activeTab === "reposts" && (
            <span className="absolute bottom-0 left-2 right-2 h-[2.5px] rounded-full bg-zinc-950" />
          )}
        </button>

        {/* Media Tab */}
        <button
          type="button"
          onClick={() => setActiveTab("media")}
          className={`relative py-3 px-3 text-sm transition-colors cursor-pointer ${
            activeTab === "media"
              ? "font-bold text-zinc-950"
              : "font-medium text-zinc-500 hover:text-zinc-900"
          }`}
        >
          <span>Media</span>
          {activeTab === "media" && (
            <span className="absolute bottom-0 left-2 right-2 h-[2.5px] rounded-full bg-zinc-950" />
          )}
        </button>
      </div>

      {/* Tab Content Body */}
      <div className="flex-1">
        {activeTab === "posts" && (
          <div className="divide-y divide-zinc-100">
            {posts.map((post) => (
              <article key={post.id} className="p-4 md:p-6 transition-colors hover:bg-zinc-50/50">
                <div className="flex items-start gap-3">
                  {/* Author Avatar */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white select-none shadow-2xs">
                    {profile.initials}
                  </div>

                  {/* Post Content */}
                  <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold text-[15px] text-zinc-900 tracking-tight leading-tight">
                          {profile.name}
                        </span>
                        <span className="text-[14px] text-zinc-500 font-normal">
                          {profile.handle}
                        </span>
                        <span className="text-zinc-400 text-xs">•</span>
                        <span className="text-[14px] text-zinc-500 font-normal">
                          {post.createdAt}
                        </span>
                      </div>

                      <button
                        type="button"
                        className="text-zinc-400 hover:text-zinc-700 transition-colors p-1"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Post Text */}
                    <div className="mt-2.5 text-[15px] leading-relaxed text-zinc-900 font-normal whitespace-pre-line break-words">
                      {post.content}
                    </div>

                    {/* Attachment Placeholder if enabled */}
                    {post.attachment && (
                      <div className="mt-3.5 h-48 sm:h-56 md:h-64 w-full rounded-2xl bg-zinc-100/90 border border-zinc-200/70 transition-all hover:bg-zinc-100 flex items-center justify-center" />
                    )}

                    {/* Action Bar */}
                    <div className="mt-3.5 flex items-center justify-between text-zinc-500 max-w-sm pt-1">
                      {/* Comments */}
                      <button
                        type="button"
                        className="flex items-center gap-1.5 text-xs font-medium hover:text-cyan-600 transition-colors cursor-pointer"
                      >
                        <MessageCircle className="h-4.5 w-4.5" />
                        <span>{post.reactions.commentsCount}</span>
                      </button>

                      {/* Reposts */}
                      <button
                        type="button"
                        onClick={() => handleToggleRepost(post.id)}
                        className={`flex items-center gap-1.5 text-xs font-medium transition-colors cursor-pointer ${
                          post.reactions.isRepostedByMe
                            ? "text-emerald-600 font-bold"
                            : "hover:text-emerald-600"
                        }`}
                      >
                        <Repeat2 className="h-4.5 w-4.5" />
                        <span>{post.reactions.repostsCount}</span>
                      </button>

                      {/* Rockets / Likes */}
                      <button
                        type="button"
                        onClick={() => handleToggleLike(post.id)}
                        className={`flex items-center gap-1.5 text-xs font-medium transition-colors cursor-pointer ${
                          post.reactions.isLikedByMe
                            ? "text-rose-600 font-bold"
                            : "hover:text-rose-600"
                        }`}
                      >
                        <Rocket
                          className={`h-4.5 w-4.5 ${
                            post.reactions.isLikedByMe ? "fill-rose-500 text-rose-500" : ""
                          }`}
                        />
                        <span>{post.reactions.rocketsCount}</span>
                      </button>

                      {/* Bookmark / Share */}
                      <button
                        type="button"
                        onClick={handleShare}
                        className="flex items-center gap-1 text-xs font-medium hover:text-zinc-900 transition-colors cursor-pointer"
                      >
                        <Bookmark className="h-4.5 w-4.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {activeTab === "replies" && (
          <div className="p-8 text-center text-xs text-zinc-400">
            No replies yet. Your comments on community discussions will appear here.
          </div>
        )}

        {activeTab === "reposts" && (
          <div className="p-8 text-center text-xs text-zinc-400">
            No reposts yet. Repost insightful discussions to show them on your profile.
          </div>
        )}

        {activeTab === "media" && (
          <div className="grid grid-cols-3 gap-1 p-1">
            <div className="aspect-square bg-zinc-100 rounded-lg flex items-center justify-center text-zinc-400">
              <ImageIcon className="h-6 w-6" />
            </div>
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs animate-in fade-in"
            onClick={() => setIsEditModalOpen(false)}
          />

          <div className="relative z-10 w-full max-w-md rounded-3xl bg-white p-5 shadow-2xl border border-zinc-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <h2 className="text-base font-bold text-zinc-900">Edit Profile</h2>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="mt-4 space-y-3">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-500 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-950 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-500 mb-1">
                  Username Handle
                </label>
                <input
                  type="text"
                  required
                  value={editHandle}
                  onChange={(e) => setEditHandle(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-950 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-500 mb-1">
                  Bio / Role
                </label>
                <textarea
                  rows={2}
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 p-3 text-sm text-zinc-900 outline-none focus:border-zinc-950 focus:bg-white transition-all resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-zinc-600 hover:bg-zinc-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-zinc-950 px-5 py-2 text-xs font-semibold text-white shadow-md hover:bg-zinc-800 transition-all cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Share Toast */}
      {showShareToast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full bg-zinc-950 px-4 py-2.5 text-xs font-semibold text-white shadow-xl animate-in fade-in slide-in-from-bottom-3">
          <Check className="h-4 w-4 text-emerald-400" />
          <span>Profile link copied to clipboard!</span>
        </div>
      )}
    </div>
  );
}
