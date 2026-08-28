"use client";

import React, { createContext, useContext, useState, useEffect, useSyncExternalStore } from "react";
import type { PostItem, CreatePostInput, PostComment } from "../types/feed.types";
import { INITIAL_POSTS } from "../data/mock-posts";

interface FeedContextType {
  posts: PostItem[];
  addNewPost: (input: CreatePostInput) => void;
  addComment: (postId: string, content: string, authorName?: string) => void;
  toggleLike: (postId: string) => void;
  toggleRepost: (postId: string) => void;
  toggleCommentLike: (postId: string, commentId: string) => void;
  getPostById: (postId: string) => PostItem | undefined;
  isCreateModalOpen: boolean;
  openCreateModal: () => void;
  closeCreateModal: () => void;
}

const FeedContext = createContext<FeedContextType | null>(null);

const STORAGE_KEY = "pencipta_community_feed_posts_v4";

// In-memory feed store with useSyncExternalStore to eliminate React 19 hydration mismatch
let inMemoryPosts: PostItem[] = INITIAL_POSTS;
const listeners = new Set<() => void>();

function notifyListeners() {
  for (const listener of listeners) {
    listener();
  }
}

function updateStore(newPosts: PostItem[]) {
  inMemoryPosts = newPosts;
  try {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newPosts));
    }
  } catch {
    // Ignore storage write error
  }
  notifyListeners();
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function getSnapshot(): PostItem[] {
  return inMemoryPosts;
}

function getServerSnapshot(): PostItem[] {
  return INITIAL_POSTS;
}

export function FeedProvider({ children }: { children: React.ReactNode }) {
  const posts = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Safely restore persisted custom posts on client mount without setState in effect
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          inMemoryPosts = parsed as PostItem[];
          notifyListeners();
        }
      }
    } catch {
      // Ignore
    }
  }, []);

  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  const getPostById = (postId: string) => {
    return posts.find((p) => p.id === postId);
  };

  const toggleLike = (postId: string) => {
    const updated = posts.map((post) => {
      if (post.id !== postId) return post;
      const isLiked = post.reactions.isLikedByMe ?? false;
      const currentCount = post.reactions.rocketsCount;
      return {
        ...post,
        reactions: {
          ...post.reactions,
          isLikedByMe: !isLiked,
          rocketsCount: isLiked ? Math.max(0, currentCount - 1) : currentCount + 1,
        },
      };
    });
    updateStore(updated);
  };

  const toggleRepost = (postId: string) => {
    const updated = posts.map((post) => {
      if (post.id !== postId) return post;
      const isReposted = post.reactions.isRepostedByMe ?? false;
      const currentCount = post.reactions.repostsCount;
      return {
        ...post,
        reactions: {
          ...post.reactions,
          isRepostedByMe: !isReposted,
          repostsCount: isReposted ? Math.max(0, currentCount - 1) : currentCount + 1,
        },
      };
    });
    updateStore(updated);
  };

  const toggleCommentLike = (postId: string, commentId: string) => {
    const updated = posts.map((post) => {
      if (post.id !== postId || !post.comments) return post;
      const updatedComments = post.comments.map((comment) => {
        if (comment.id !== commentId) return comment;
        const isLiked = comment.reactions.isLikedByMe ?? false;
        const currentCount = comment.reactions.rocketsCount;
        return {
          ...comment,
          reactions: {
            ...comment.reactions,
            isLikedByMe: !isLiked,
            rocketsCount: isLiked ? Math.max(0, currentCount - 1) : currentCount + 1,
          },
        };
      });
      return {
        ...post,
        comments: updatedComments,
      };
    });
    updateStore(updated);
  };

  const addNewPost = (input: CreatePostInput) => {
    const newPost: PostItem = {
      id: `post-${Date.now()}`,
      author: {
        id: "me",
        name: input.authorName?.trim() || "You",
        handle: `@${(input.authorName || "you").toLowerCase().replace(/\s+/g, "_")}`,
        role: input.role?.trim() || "Community Member",
        experience: input.experience?.trim() || "Member",
        initials: (input.authorName || "You")
          .split(" ")
          .map((n) => n[0] ?? "")
          .join("")
          .toUpperCase()
          .slice(0, 2) || "ME",
      },
      content: input.content,
      createdAt: "Just now",
      formattedDate: "Just now",
      quotesCount: 0,
      reactions: {
        commentsCount: 0,
        repostsCount: 0,
        rocketsCount: 1,
        viewsCount: 1,
        isLikedByMe: true,
        isRepostedByMe: false,
      },
      attachment: input.hasAttachmentPlaceholder ? { type: "placeholder" } : undefined,
      comments: [],
    };

    updateStore([newPost, ...posts]);
    closeCreateModal();
  };

  const addComment = (postId: string, content: string, authorName?: string) => {
    const newComment: PostComment = {
      id: `comment-${Date.now()}`,
      postId,
      author: {
        id: "me",
        name: authorName?.trim() || "Community User",
        handle: `@${(authorName || "community_user").toLowerCase().replace(/\s+/g, "_")}`,
        role: "Member",
        initials: "ME",
      },
      content: content.trim(),
      createdAt: "Just now",
      reactions: {
        commentsCount: 0,
        repostsCount: 0,
        rocketsCount: 0,
        viewsCount: 1,
        isLikedByMe: false,
        isRepostedByMe: false,
      },
    };

    const updated = posts.map((post) => {
      if (post.id !== postId) return post;
      const currentComments = post.comments ?? [];
      return {
        ...post,
        reactions: {
          ...post.reactions,
          commentsCount: post.reactions.commentsCount + 1,
        },
        comments: [...currentComments, newComment],
      };
    });

    updateStore(updated);
  };

  return (
    <FeedContext.Provider
      value={{
        posts,
        addNewPost,
        addComment,
        toggleLike,
        toggleRepost,
        toggleCommentLike,
        getPostById,
        isCreateModalOpen,
        openCreateModal,
        closeCreateModal,
      }}
    >
      {children}
    </FeedContext.Provider>
  );
}

const defaultFeedContext: FeedContextType = {
  posts: [],
  addNewPost: () => {},
  addComment: () => {},
  toggleLike: () => {},
  toggleRepost: () => {},
  toggleCommentLike: () => {},
  getPostById: () => undefined,
  isCreateModalOpen: false,
  openCreateModal: () => {},
  closeCreateModal: () => {},
};

export function useFeed(): FeedContextType {
  const context = useContext(FeedContext);
  return context ?? defaultFeedContext;
}
