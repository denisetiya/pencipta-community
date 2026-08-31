import type { Metadata } from "next";
import { ResponsiveShell } from "@/components/layout";
import { SearchView } from "@/components/search";

export const metadata: Metadata = {
  title: "Explore & Search | pencipta-comunity",
  description: "Search community members, mentors, topics, and discussions.",
};

export default function SearchPage() {
  return (
    <ResponsiveShell
      headerTitle="Search & Explore"
      headerSubtitle="Discover trending discussions, topics & community mentors"
      showMobileHeader={false}
    >
      <SearchView />
    </ResponsiveShell>
  );
}
