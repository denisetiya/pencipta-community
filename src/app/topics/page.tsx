import type { Metadata } from "next";
import { ResponsiveShell } from "@/components/layout";
import { ComingSoon } from "@/components/ui/coming-soon";
import { Hash } from "lucide-react";

export const metadata: Metadata = {
  title: "Topics | pencipta-comunity",
  description: "Browse community discussions and knowledge topics.",
};

export default function TopicsPage() {
  return (
    <ResponsiveShell
      headerTitle="Topics"
      headerSubtitle="Explore knowledge by domain & tech stack"
    >
      <ComingSoon
        title="Browse Topics"
        description="Explore discussions, frameworks, and curated knowledge areas organized by domain. Coming soon!"
        icon={Hash}
        badge="Coming Soon"
      />
    </ResponsiveShell>
  );
}
