export interface TrendingItem {
  id: string;
  category: string;
  categoryTag?: string;
  title: string;
  subtitle?: string;
  timestamp?: string;
  postsCount: string;
  avatars?: string[];
  thumbnailType?: "ai" | "cafe" | "tech" | "design";
  tab: "explore" | "trending" | "news" | "sports" | "entertainment";
}

export const SEARCH_TABS = [
  { id: "explore", label: "Eksplore" },
  { id: "trending", label: "Trending" },
  { id: "news", label: "News" },
  { id: "sports", label: "Sports" },
  { id: "entertainment", label: "Entertainment" },
] as const;

export type SearchTabType = (typeof SEARCH_TABS)[number]["id"];

export const INITIAL_TRENDING_ITEMS: TrendingItem[] = [
  {
    id: "trend-1",
    category: "Trending in Education",
    categoryTag: "Education",
    title: "Visual Communication Design Students Share Portfolio Tips for NAMA APP",
    timestamp: "2 hours ago",
    postsCount: "15K posts",
    avatars: ["AS", "BP"],
    tab: "explore",
  },
  {
    id: "trend-2",
    category: "Latest News",
    categoryTag: "Technology",
    title: "Serious Discussion: The Future of AI in the World",
    subtitle: "Trending now · Technology · 49 posts",
    postsCount: "49 posts",
    thumbnailType: "ai",
    tab: "explore",
  },
  {
    id: "trend-3",
    category: "Trending in Careers",
    categoryTag: "Careers",
    title: "Effective Salary Negotiation Tips for Fresh Graduates",
    subtitle: "Trending now · Careers · 747 posts",
    postsCount: "747 posts",
    tab: "explore",
  },
  {
    id: "trend-4",
    category: "Around Campus",
    categoryTag: "Lifestyle",
    title: "Recommended Cozy Cafés for Studying in South Jakarta",
    timestamp: "5 hours ago",
    subtitle: "5 hours ago · Lifestyle · 2.1K posts",
    postsCount: "2.1K posts",
    thumbnailType: "cafe",
    tab: "explore",
  },
  {
    id: "trend-5",
    category: "Trending in Web Tech",
    categoryTag: "Technology",
    title: "React 19 Server Components Architecture in Production",
    timestamp: "3 hours ago",
    subtitle: "3 hours ago · Tech · 8.9K posts",
    postsCount: "8.9K posts",
    thumbnailType: "tech",
    tab: "trending",
  },
  {
    id: "trend-6",
    category: "Campus Sports",
    categoryTag: "Sports",
    title: "Inter-University Badminton Championship Finals This Saturday",
    timestamp: "6 hours ago",
    subtitle: "6 hours ago · Sports · 4.3K posts",
    postsCount: "4.3K posts",
    tab: "sports",
  },
  {
    id: "trend-7",
    category: "Creative Hub",
    categoryTag: "Entertainment",
    title: "Indie Game Developers Showcase New Indonesian Folklore RPG",
    timestamp: "1 day ago",
    subtitle: "1 day ago · Gaming · 12K posts",
    postsCount: "12K posts",
    thumbnailType: "design",
    tab: "entertainment",
  },
];
