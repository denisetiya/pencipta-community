import type { Metadata } from "next";
import { ResponsiveShell } from "@/components/layout";
import { ComingSoon } from "@/components/ui/coming-soon";
import { Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Explore & Search | pencipta-comunity",
  description: "Search community members, mentors, topics, and discussions is coming soon.",
};

export default function SearchPage() {
  return (
    <ResponsiveShell
      headerTitle="Search"
      headerSubtitle="Explore community mentors & knowledge"
    >
      <ComingSoon
        title="Search & Explore"
        description="Our AI knowledge search and mentor matching engine is indexing verified community discussions and expertise. Coming soon!"
        icon={Search}
        badge="Coming Soon"
      />
    </ResponsiveShell>
  );
}
