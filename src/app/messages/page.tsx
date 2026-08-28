import type { Metadata } from "next";
import { ResponsiveShell } from "@/components/layout";
import { ComingSoon } from "@/components/ui/coming-soon";
import { MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Messages | pencipta-comunity",
  description: "Direct mentorship messaging is coming soon.",
};

export default function MessagesPage() {
  return (
    <ResponsiveShell
      headerTitle="Messages"
      headerSubtitle="Direct mentorship chats & inquiries"
    >
      <ComingSoon
        title="Direct Messages"
        description="We're currently building context-rich mentorship conversations with AI-generated icebreakers and spam-free handshakes. Stay tuned!"
        icon={MessageCircle}
        badge="Coming Soon"
      />
    </ResponsiveShell>
  );
}
