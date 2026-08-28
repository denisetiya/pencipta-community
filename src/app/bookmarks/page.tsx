import type { Metadata } from "next";
import { ResponsiveShell } from "@/components/layout";
import { ComingSoon } from "@/components/ui/coming-soon";
import { Bookmark } from "lucide-react";

export const metadata: Metadata = {
  title: "Bookmarks | pencipta-comunity",
  description: "Saved posts and bookmarks are coming soon.",
};

export default function BookmarksPage() {
  return (
    <ResponsiveShell
      headerTitle="Bookmarks"
      headerSubtitle="Your saved discussions & resources"
    >
      <ComingSoon
        title="Saved Posts"
        description="Bookmark cheat sheets, mentorship advice, and discussions to quickly access them here anytime. Coming soon!"
        icon={Bookmark}
        badge="Coming Soon"
      />
    </ResponsiveShell>
  );
}
