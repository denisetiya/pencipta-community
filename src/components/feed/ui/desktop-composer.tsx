"use client";

import React, { useState } from "react";
import { Image as ImageIcon, Sparkles } from "lucide-react";
import { useFeed } from "../context/feed-context";

export function DesktopComposer() {
  const { addNewPost } = useFeed();
  const [content, setContent] = useState("");
  const [hasAttachment, setHasAttachment] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    addNewPost({
      content: content.trim(),
      authorName: "Community User",
      role: "Member",
      hasAttachmentPlaceholder: hasAttachment,
    });

    setContent("");
    setHasAttachment(false);
  };

  return (
    <div className="hidden md:block border-b border-zinc-100/90 bg-white px-6 py-5">
      <form onSubmit={handleSubmit} className="flex gap-3.5">
        {/* Avatar */}
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white shadow-2xs">
          ME
        </div>

        {/* Composer Body */}
        <div className="flex-1 min-w-0">
          <textarea
            rows={2}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share an insight, question, or update with the community..."
            className="w-full resize-none bg-transparent text-[15px] text-zinc-900 placeholder:text-zinc-400 outline-none leading-relaxed"
          />

          {hasAttachment && (
            <div className="my-2.5 h-32 w-full rounded-2xl border border-dashed border-zinc-300 bg-zinc-50/80 flex items-center justify-center text-xs font-medium text-zinc-500">
              Attachment container ready
            </div>
          )}

          <div className="mt-3 flex items-center justify-between border-t border-zinc-100 pt-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setHasAttachment((prev) => !prev)}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold border transition-all cursor-pointer ${
                  hasAttachment
                    ? "border-cyan-200 bg-cyan-50 text-cyan-700 shadow-2xs"
                    : "border-zinc-200/90 text-zinc-600 hover:bg-zinc-50"
                }`}
              >
                <ImageIcon className="h-3.5 w-3.5" />
                <span>{hasAttachment ? "Box Attached" : "Add Media"}</span>
              </button>

              <span className="flex items-center gap-1 text-[11px] font-semibold text-cyan-800 bg-cyan-50 px-2.5 py-1 rounded-full border border-cyan-200/60">
                <Sparkles className="h-3.5 w-3.5 text-cyan-600" />
                <span>AI Enhanced</span>
              </span>
            </div>

            <button
              type="submit"
              disabled={!content.trim()}
              className="rounded-full bg-zinc-950 px-6 py-2 text-xs font-bold text-white shadow-xs hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
