import type { PostItem } from "../types/feed.types";

export const INITIAL_POSTS: PostItem[] = [
  {
    id: "post-1",
    author: {
      id: "user-1",
      name: "Klinik Koding",
      handle: "@klinikkoding",
      role: "Data Science",
      experience: "3 Years of Experience",
      initials: "KK",
    },
    content:
      "Hello friends!\n\nMany people asked about the data structures material last week. We've put together an essential cheat sheet to prepare for tomorrow's midterm exam. Keep up the good work!\n\nThe link to the material is in the bio.",
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
        id: "comment-1",
        postId: "post-1",
        author: {
          id: "user-mustafa",
          name: "Mustafa Yasar",
          handle: "@mustafagu34",
          role: "Member",
          initials: "MY",
        },
        content:
          "Provakosyanlara karşı herkes uyanık olmalı. Bu işin muhatapları daha dikkatli olmalı. Devletimizin de bu gibi işlere fırsat vermemesi için gerekli önlemleri almalı.",
        createdAt: "38m",
        reactions: {
          commentsCount: 0,
          repostsCount: 0,
          rocketsCount: 0,
          viewsCount: 1,
          isLikedByMe: false,
          isRepostedByMe: false,
        },
      },
    ],
  },
  {
    id: "post-2",
    author: {
      id: "user-2",
      name: "Budi Prakoso",
      handle: "@budiprak",
      role: "Software Engineer",
      experience: "4 Years of Experience",
      initials: "BP",
    },
    content:
      "Does anyone have any recommendations for a fun place to work on assignments with fast Wi-Fi around campus? I'm bored of being stuck in the library all the time.",
    createdAt: "4j",
    formattedDate: "18.08.2026 • 18:45",
    quotesCount: 0,
    reactions: {
      commentsCount: 1,
      repostsCount: 1,
      rocketsCount: 19,
      viewsCount: 711,
      isLikedByMe: false,
      isRepostedByMe: false,
    },
    comments: [
      {
        id: "comment-2",
        postId: "post-2",
        author: {
          id: "user-4",
          name: "Alya Safitri",
          handle: "@alyasaf",
          role: "Product Designer",
          initials: "AS",
        },
        content: "Check out the new co-working cafe near the west gate! Great coffee and 100Mbps fiber.",
        createdAt: "1j",
        reactions: {
          commentsCount: 0,
          repostsCount: 0,
          rocketsCount: 4,
          viewsCount: 85,
          isLikedByMe: false,
          isRepostedByMe: false,
        },
      },
    ],
  },
  {
    id: "post-3",
    author: {
      id: "user-3",
      name: "Budi Prakoso",
      handle: "@budiprak",
      role: "Software Engineer",
      experience: "4 Years of Experience",
      initials: "BP",
    },
    content:
      "Does anyone have any recommendations for a fun place to work on assignments with fast Wi-Fi around campus? I'm bored of being stuck in the library all the time.",
    createdAt: "4j",
    formattedDate: "18.08.2026 • 18:45",
    quotesCount: 0,
    reactions: {
      commentsCount: 1,
      repostsCount: 1,
      rocketsCount: 19,
      viewsCount: 711,
      isLikedByMe: false,
      isRepostedByMe: false,
    },
  },
  {
    id: "post-4",
    author: {
      id: "user-4",
      name: "Alya Safitri",
      handle: "@alyasaf",
      role: "Product Designer",
      experience: "2 Years of Experience",
      initials: "AS",
    },
    content:
      "Just finished mentoring session with our junior fellows discussing Design Systems in Figma. Seeing their 'aha!' moments is always the best feeling. Always happy to connect and give portfolio feedback!",
    createdAt: "6j",
    formattedDate: "18.08.2026 • 15:20",
    quotesCount: 1,
    reactions: {
      commentsCount: 5,
      repostsCount: 3,
      rocketsCount: 42,
      viewsCount: 1240,
      isLikedByMe: true,
      isRepostedByMe: false,
    },
  },
];
