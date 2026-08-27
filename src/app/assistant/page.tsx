import { AssistantWorkspace } from "@/components/assistant";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Assistant | pencipta-comunity",
  description: "Senior-grade AI Assistant with conversation history, capsule input, and multi-turn chat.",
};

export default function AssistantPage() {
  return (
    <div className="h-screen w-full overflow-hidden bg-white">
      <AssistantWorkspace mode="full" />
    </div>
  );
}
