import { PostItem } from "@/components/feed/types/feed.types";

export interface UserProfile {
  id: string;
  name: string;
  handle: string;
  title: string;
  bio: string;
  avatarUrl?: string;
  initials: string;
  stats: {
    posts: number;
    followers: string;
    following: number;
  };
}

export const CURRENT_PROFILE: UserProfile = {
  id: "user-alex",
  name: "Alex Rivera",
  handle: "@alexrivera",
  title: "Product Designer | Alumni DKV 2021",
  bio: "Product Designer | Alumni DKV 2021",
  initials: "AR",
  stats: {
    posts: 42,
    followers: "1.2K",
    following: 345,
  },
};

export const ALEX_POSTS: PostItem[] = [
  {
    id: "alex-post-1",
    author: {
      id: "user-alex",
      name: "Alex Rivera",
      handle: "@alexrivera",
      role: "Product Designer",
      experience: "Alumni DKV 2021",
      initials: "AR",
    },
    content:
      "Hello friends! 🚀\n\nMany people asked about the data structures material last week. We've put together an essential cheat sheet to prepare for tomorrow's midterm exam. Keep up the good work!\n\nThe link to the material is in the bio. 👇",
    createdAt: "2j",
    formattedDate: "18.08.2026 • 20:10",
    quotesCount: 0,
    reactions: {
      commentsCount: 1,
      repostsCount: 1,
      rocketsCount: 19,
      viewsCount: 711,
      isLikedByMe: false,
      isRepostedByMe: false,
    },
    attachment: {
      type: "placeholder",
    },
    comments: [
      {
        id: "alex-comment-1",
        postId: "alex-post-1",
        author: {
          id: "user-mustafa",
          name: "Mustafa Yasar",
          handle: "@mustafagu34",
          role: "Member",
          initials: "MY",
        },
        content:
          "Thank you for sharing this cheat sheet! Really helpful for the final preparation.",
        createdAt: "38m",
        reactions: {
          commentsCount: 0,
          repostsCount: 0,
          rocketsCount: 2,
          viewsCount: 24,
          isLikedByMe: false,
          isRepostedByMe: false,
        },
      },
    ],
  },
  {
    id: "alex-post-2",
    author: {
      id: "user-alex",
      name: "Alex Rivera",
      handle: "@alexrivera",
      role: "Product Designer",
      experience: "Alumni DKV 2021",
      initials: "AR",
    },
    content:
      "Just finished mentoring session with our junior fellows discussing Design Systems in Figma. Seeing their 'aha!' moments is always the best feeling. Always happy to connect and give portfolio feedback! ✨",
    createdAt: "1d",
    formattedDate: "17.08.2026 • 15:20",
    quotesCount: 1,
    reactions: {
      commentsCount: 3,
      repostsCount: 2,
      rocketsCount: 38,
      viewsCount: 890,
      isLikedByMe: true,
      isRepostedByMe: false,
    },
  },
];
