import type { Metadata } from "next";
import { ResponsiveShell } from "@/components/layout";
import { PostDetailView } from "@/components/feed";
import { INITIAL_POSTS } from "@/components/feed/data/mock-posts";
import { notFound } from "next/navigation";

interface PostPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { id } = await params;
  const post = INITIAL_POSTS.find((p) => p.id === id) ?? INITIAL_POSTS[0];

  return {
    title: post ? `${post.author.name} on pencipta-comunity: "${post.content.slice(0, 40)}..."` : "Post | pencipta-comunity",
    description: post?.content ?? "Community discussion thread.",
  };
}

export default async function PostDetailPage({ params }: PostPageProps) {
  const { id } = await params;
  const post = INITIAL_POSTS.find((p) => p.id === id) ?? INITIAL_POSTS[0];

  if (!post) {
    notFound();
  }

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
