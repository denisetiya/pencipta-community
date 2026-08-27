import { AssistantWorkspace } from "@/components/assistant";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Assistant | pencipta-comunity",
  description: "AI Assistant for pencipta-comunity.",
};

export default function AskPage() {
  return (
    <div className="h-screen w-full overflow-hidden bg-white">
      <AssistantWorkspace mode="full" />
    </div>
  );
}
