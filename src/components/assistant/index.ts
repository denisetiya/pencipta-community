// Barrel export for clean, readable imports across the application
export { AssistantProvider, useAssistant } from "./context/assistant-context";
export { AssistantWorkspace } from "./assistant-workspace";
export { FloatingWidget as FloatingAssistantWidget } from "./widget/floating-widget";
export { Logo as AiLogo } from "@/components/ui/logo";
export { Header as AssistantHeader } from "./ui/header";
export { Input as AssistantInput } from "./ui/input";
export { ChatView as AssistantChatView } from "./ui/chat-view";
export { HistoryView as AssistantHistoryView } from "./ui/history-view";
export * from "./types/assistant.types";
