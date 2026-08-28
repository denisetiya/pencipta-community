import type { Metadata } from "next";
import { ResponsiveShell } from "@/components/layout";
import { ComingSoon } from "@/components/ui/coming-soon";
import { HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Help & Feedback | pencipta-comunity",
  description: "Help center and community feedback.",
};

export default function HelpPage() {
  return (
    <ResponsiveShell
      headerTitle="Help & Support"
      headerSubtitle="Community guidelines & platform support"
    >
      <ComingSoon
        title="Help & Feedback"
        description="Documentation, community FAQ, and direct feedback submission will be available here soon."
        icon={HelpCircle}
        badge="Coming Soon"
      />
    </ResponsiveShell>
  );
}
