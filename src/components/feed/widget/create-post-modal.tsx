"use client";

import React, { useState } from "react";
import { X, Image as ImageIcon, PlusCircle } from "lucide-react";
import { useFeed } from "../context/feed-context";

export function CreatePostModal() {
  const { isCreateModalOpen, closeCreateModal, addNewPost } = useFeed();
  const [content, setContent] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [role, setRole] = useState("");
  const [includeAttachment, setIncludeAttachment] = useState(false);

  if (!isCreateModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    addNewPost({
      content: content.trim(),
      authorName: authorName.trim() || undefined,
      role: role.trim() || undefined,
      hasAttachmentPlaceholder: includeAttachment,
    });

    setContent("");
    setAuthorName("");
    setRole("");
    setIncludeAttachment(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs animate-in fade-in"
        onClick={closeCreateModal}
      />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-lg rounded-3xl bg-white p-5 shadow-2xl border border-zinc-100 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
          <div className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4 text-zinc-900" />
            <h2 className="text-base font-bold text-zinc-900">New Community Post</h2>
          </div>
          <button
            type="button"
            onClick={closeCreateModal}
            className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-500 mb-1">
                Your Name
              </label>
              <input
                type="text"
                placeholder="e.g. Maya Wardani"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-3 py-2 text-xs text-zinc-900 outline-none focus:border-zinc-950 focus:bg-white transition-all"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-500 mb-1">
                Role / Title
              </label>
              <input
                type="text"
                placeholder="e.g. AI Engineer • 3 YOE"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-3 py-2 text-xs text-zinc-900 outline-none focus:border-zinc-950 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-500 mb-1">
              Content
            </label>
            <textarea
              required
              rows={4}
              placeholder="Share an insight, question, or update with the community..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 p-3 text-sm text-zinc-900 outline-none focus:border-zinc-950 focus:bg-white transition-all resize-none"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={() => setIncludeAttachment((prev) => !prev)}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium border transition-colors cursor-pointer ${
                includeAttachment
                  ? "border-cyan-200 bg-cyan-50 text-cyan-700"
                  : "border-zinc-200 text-zinc-600 hover:bg-zinc-50"
              }`}
            >
              <ImageIcon className="h-3.5 w-3.5" />
              <span>{includeAttachment ? "Attachment Added" : "Add Attachment Box"}</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={closeCreateModal}
                className="rounded-xl px-4 py-2 text-xs font-semibold text-zinc-600 hover:bg-zinc-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!content.trim()}
                className="rounded-xl bg-zinc-950 px-5 py-2 text-xs font-semibold text-white shadow-md hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
