export interface PostAuthor {
  id: string;
  name: string;
  handle: string;
  role: string;
  experience?: string;
  avatarUrl?: string;
  initials?: string;
}

export interface PostReaction {
  commentsCount: number;
  repostsCount: number;
  rocketsCount: number;
  viewsCount: number;
  isLikedByMe?: boolean;
  isRepostedByMe?: boolean;
}

export interface PostAttachment {
  type: "placeholder" | "image" | "link";
  url?: string;
  aspectRatio?: string;
  title?: string;
}

export interface PostComment {
  id: string;
  postId: string;
  author: PostAuthor;
  content: string;
  createdAt: string; // e.g. "38m", "1h"
  reactions: PostReaction;
}

export interface PostItem {
  id: string;
  author: PostAuthor;
  content: string;
  createdAt: string; // e.g. "2j", "4j"
  timestamp?: number;
  formattedDate?: string; // e.g. "18.08.2026 • 20:10"
  quotesCount?: number;
  reactions: PostReaction;
  attachment?: PostAttachment;
  hashtags?: string[];
  comments?: PostComment[];
}

export interface CreatePostInput {
  content: string;
  authorName?: string;
  role?: string;
  experience?: string;
  hasAttachmentPlaceholder?: boolean;
}

export interface AddCommentInput {
  postId: string;
  content: string;
  authorName?: string;
}
