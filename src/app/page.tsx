import type { Metadata } from "next";
import { ResponsiveShell } from "@/components/layout";
import { FeedWorkspace } from "@/components/feed";

export const metadata: Metadata = {
  title: "Home Feed | pencipta-comunity",
  description: "Community knowledge network, discussions, and updates.",
};

export default function HomePage() {
  return (
    <ResponsiveShell
      headerTitle="Home"
      headerSubtitle="Explore discussions & knowledge from the community"
    >
      <FeedWorkspace />
    </ResponsiveShell>
  );
}
