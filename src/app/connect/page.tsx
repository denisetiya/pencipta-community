import type { Metadata } from "next";
import { ResponsiveShell } from "@/components/layout";
import { ComingSoon } from "@/components/ui/coming-soon";
import { Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Mentorship Network | pencipta-comunity",
  description: "Find mentors and track sessions with verified expertise.",
};

export default function ConnectPage() {
  return (
    <ResponsiveShell
      headerTitle="Mentorship Network"
      headerSubtitle="Find verified mentors & schedule sessions"
    >
      <ComingSoon
        title="Mentorship Network"
        description="Connect with domain experts through AI-generated icebreakers and structured session outcomes. Coming soon!"
        icon={Award}
        badge="Coming Soon"
      />
    </ResponsiveShell>
  );
}
