import { AssistantWorkspace } from "@/components/assistant";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Assistant | pencipta-comunity",
  description: "Senior-grade AI Assistant with conversation history, capsule input, and multi-turn chat.",
};

export default function AssistantPage() {
  return (
    <div className="h-[100dvh] max-h-[100dvh] w-full overflow-hidden bg-white flex flex-col">
      <AssistantWorkspace mode="full" />
    </div>
  );
}
