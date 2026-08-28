import type { Metadata } from "next";
import { ResponsiveShell } from "@/components/layout";
import { ComingSoon } from "@/components/ui/coming-soon";
import { Settings } from "lucide-react";

export const metadata: Metadata = {
  title: "Settings | pencipta-comunity",
  description: "Manage account settings and notifications.",
};

export default function SettingsPage() {
  return (
    <ResponsiveShell
      headerTitle="Settings"
      headerSubtitle="Manage your account & preferences"
    >
      <ComingSoon
        title="Account Settings"
        description="Preferences, notifications, privacy, and account security controls will be available here soon."
        icon={Settings}
        badge="Coming Soon"
      />
    </ResponsiveShell>
  );
}
