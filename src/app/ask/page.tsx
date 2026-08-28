import { AssistantWorkspace } from "@/components/assistant";
import { ResponsiveShell } from "@/components/layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ask AI Assistant | pencipta-comunity",
  description: "AI Assistant for pencipta-comunity.",
};

export default function AskPage() {
  return (
    <ResponsiveShell
      headerTitle="Ask Community AI"
      headerSubtitle="Get instant verified insights & mentorship recommendations"
      showRightSidebar={false}
    >
      <div className="h-[calc(100vh-56px)] w-full overflow-hidden bg-white flex flex-col">
        <AssistantWorkspace mode="full" />
      </div>
    </ResponsiveShell>
  );
}
