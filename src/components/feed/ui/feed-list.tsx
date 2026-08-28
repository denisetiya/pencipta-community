"use client";

import React from "react";
import { useFeed } from "../context/feed-context";
import { PostCard } from "./post-card";

export function FeedList() {
  const { posts, toggleLike, toggleRepost } = useFeed();

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center px-4">
        <p className="text-sm font-semibold text-zinc-700">No posts yet</p>
        <p className="text-xs text-zinc-400 mt-1">Be the first to share an update with the community!</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-transparent">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onLike={toggleLike}
          onRepost={toggleRepost}
        />
      ))}
    </div>
  );
}
