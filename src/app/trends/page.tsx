import type { Metadata } from "next";
import { ResponsiveShell } from "@/components/layout";
import { ComingSoon } from "@/components/ui/coming-soon";
import { TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Trending Topics | pencipta-comunity",
  description: "Trending community knowledge and topics are coming soon.",
};

export default function TrendsPage() {
  return (
    <ResponsiveShell
      headerTitle="Trends"
      headerSubtitle="Trending community topics & knowledge insights"
    >
      <ComingSoon
        title="Trending Topics"
        description="Our AI knowledge graph is indexing real-time discussions, skills, and trending mentorship queries. Check back soon!"
        icon={TrendingUp}
        badge="Coming Soon"
      />
    </ResponsiveShell>
  );
}
