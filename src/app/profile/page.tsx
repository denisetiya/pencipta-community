import type { Metadata } from "next";
import { ResponsiveShell } from "@/components/layout";
import { ComingSoon } from "@/components/ui/coming-soon";
import { User } from "lucide-react";

export const metadata: Metadata = {
  title: "Profile | pencipta-comunity",
  description: "AI-generated knowledge profile is coming soon.",
};

export default function ProfilePage() {
  return (
    <ResponsiveShell
      headerTitle="Profile"
      headerSubtitle="AI knowledge profile & verified credentials"
    >
      <ComingSoon
        title="User Profile"
        description="Manage your AI-extracted knowledge profile, verified skill chips, and mentorship track record here soon!"
        icon={User}
        badge="Coming Soon"
      />
    </ResponsiveShell>
  );
}
