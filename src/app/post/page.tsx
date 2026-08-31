import type { Metadata } from "next";
import { ResponsiveShell } from "@/components/layout";
import { PostDetailView } from "@/components/feed";
import { INITIAL_POSTS } from "@/components/feed/data/mock-posts";

export const metadata: Metadata = {
  title: "Post | pencipta-comunity",
  description: "Community discussion and responses.",
};

export default function DefaultPostPage() {
  const post = INITIAL_POSTS[0]!;

  return (
    <ResponsiveShell
      headerTitle="Post"
      headerSubtitle="Discussion thread & comments"
      showMobileHeader={false}
    >
      <PostDetailView post={post} />
    </ResponsiveShell>
  );
}
