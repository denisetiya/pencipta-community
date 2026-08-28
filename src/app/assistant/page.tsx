import { AssistantWorkspace } from "@/components/assistant";
import { ResponsiveShell } from "@/components/layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Assistant | pencipta-comunity",
  description: "Senior-grade AI Assistant with conversation history, capsule input, and multi-turn chat.",
};

export default function AssistantPage() {
  return (
    <ResponsiveShell
      headerTitle="AI Assistant"
      headerSubtitle="Senior-grade knowledge assistant & conversation workspace"
      showRightSidebar={false}
    >
      <div className="h-[calc(100vh-56px)] w-full overflow-hidden bg-white flex flex-col">
        <AssistantWorkspace mode="full" />
      </div>
    </ResponsiveShell>
  );
}
