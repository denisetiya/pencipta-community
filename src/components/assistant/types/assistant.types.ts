export type PlatformType = "responsive" | "android" | "ios";

export interface CitedProfile {
  profile_id: string;
  name: string;
  why: string;
}

export interface AssistantMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
  attachmentName?: string;
  citedProfiles?: CitedProfile[];
}

export interface ConversationSession {
  id: string;
  title: string;
  preview: string;
  createdAt: string;
  updatedAt: string;
  messages: AssistantMessage[];
}

export interface AssistantContextType {
  isOpen: boolean;
  activeView: "chat" | "history";
  activeSessionId: string | null;
  conversations: ConversationSession[];
  currentSession: ConversationSession | null;
  messages: AssistantMessage[];
  isLoading: boolean;
  platform: PlatformType;
  setPlatform: (platform: PlatformType) => void;
  openAssistant: (initialPrompt?: string) => void;
  closeAssistant: () => void;
  toggleAssistant: () => void;
  setActiveView: (view: "chat" | "history") => void;
  selectSession: (id: string) => void;
  deleteSession: (id: string) => void;
  startNewChat: () => void;
  sendMessage: (text: string, attachment?: File | null) => Promise<void>;
}
