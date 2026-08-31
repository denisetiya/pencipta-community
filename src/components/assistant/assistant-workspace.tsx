"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAssistant } from "./context/assistant-context";
import { useViewport, PlatformType } from "@/context/viewport-context";
import { Header } from "./ui/header";
import { ChatView } from "./ui/chat-view";
import { Input } from "./ui/input";
import { HistoryView } from "./ui/history-view";
import { PanelLeft } from "lucide-react";

interface AssistantWorkspaceProps {
  mode?: "full" | "drawer" | "compact";
  platform?: PlatformType;
  className?: string;
  onClose?: () => void;
}

export function AssistantWorkspace({
  mode = "full",
  platform: customPlatform,
  className = "",
  onClose,
}: AssistantWorkspaceProps) {
  const router = useRouter();
  const {
    activeView,
    activeSessionId,
    conversations,
    currentSession,
    messages,
    isLoading,
    setActiveView,
    selectSession,
    deleteSession,
    startNewChat,
    sendMessage,
  } = useAssistant();

  const { platform: globalPlatform } = useViewport();
  const platform = customPlatform ?? globalPlatform;
  const isMobile = platform === "android" || platform === "ios";

  const [inputText, setInputText] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true);

  const handleBack = () => {
    if (activeView === "history") {
      setActiveView("chat");
    } else if (onClose) {
      onClose();
    } else {
      router.push("/");
    }
  };

  const handleSend = () => {
    if ((!inputText.trim() && !attachment) || isLoading) return;
    const text = inputText;
    const file = attachment;
    setInputText("");
    setAttachment(null);
    void sendMessage(text, file);
  };

  const handleSuggestion = (prompt: string) => {
    void sendMessage(prompt);
  };

  // Drawer / Floating mode (Compact widget)
  if (mode === "drawer" || mode === "compact") {
    return (
      <div className={`flex h-full w-full flex-col bg-white overflow-hidden ${className}`}>
        <Header
          title={activeView === "history" ? "History" : currentSession ? currentSession.title : "AI Assistant"}
          platform={platform}
          showStatusBar={false}
          onBack={handleBack}
          onNewChat={startNewChat}
          onOpenHistory={() => setActiveView("history")}
          activeView={activeView}
        />

        <main className="flex flex-1 flex-col overflow-hidden bg-white">
          {activeView === "history" ? (
            <HistoryView
              conversations={conversations}
              activeSessionId={activeSessionId}
              onSelectSession={(id) => selectSession(id)}
              onDeleteSession={deleteSession}
              onNewChat={startNewChat}
            />
          ) : (
            <>
              <ChatView
                messages={messages}
                isLoading={isLoading}
                onSelectSuggestion={handleSuggestion}
                platform={platform}
              />
              <Input
                value={inputText}
                onChange={setInputText}
                onSend={handleSend}
                isLoading={isLoading}
                attachment={attachment}
                onAttach={setAttachment}
                platform={platform}
              />
            </>
          )}
        </main>
      </div>
    );
  }

  // =========================================================================
  // FORCED MOBILE MODE (Android & iOS) -> Always single column & mobile status bar
  // =========================================================================
  if (isMobile) {
    return (
      <div className={`flex h-full w-full flex-col bg-white overflow-hidden ${className}`}>
        <Header
          title={activeView === "history" ? "History" : "AI Assistant"}
          platform={platform}
          onBack={handleBack}
          onNewChat={startNewChat}
          onOpenHistory={() => setActiveView("history")}
          activeView={activeView}
        />

        <main className="flex flex-1 min-h-0 flex-col overflow-hidden bg-white">
          {activeView === "history" ? (
            <HistoryView
              conversations={conversations}
              activeSessionId={activeSessionId}
              onSelectSession={(id) => selectSession(id)}
              onDeleteSession={deleteSession}
              onNewChat={startNewChat}
            />
          ) : (
            <>
              <ChatView
                messages={messages}
                isLoading={isLoading}
                onSelectSuggestion={handleSuggestion}
                platform={platform}
              />
              <Input
                value={inputText}
                onChange={setInputText}
                onSend={handleSend}
                isLoading={isLoading}
                attachment={attachment}
                onAttach={setAttachment}
                platform={platform}
              />
            </>
          )}
        </main>
      </div>
    );
  }

  // =========================================================================
  // RESPONSIVE DEFAULT MODE -> Adapts fluidly to screen width (2-pane on desktop, single column on mobile screen)
  // =========================================================================
  return (
    <div className={`flex h-full w-full overflow-hidden bg-white ${className}`}>
      {/* Desktop Left History Sidebar */}
      <aside
        className={`${
          isDesktopSidebarOpen ? "md:w-80" : "md:w-0"
        } hidden md:flex shrink-0 border-r border-zinc-200/80 bg-zinc-50/50 flex-col transition-all duration-300 overflow-hidden`}
      >
        <div className="flex h-14 items-center justify-between px-4 border-b border-zinc-100">
          <h2 className="text-sm font-semibold text-zinc-900">Chat History</h2>
          <button
            type="button"
            onClick={startNewChat}
            title="New Chat"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-600 hover:bg-zinc-200/70 hover:text-zinc-900 transition-colors cursor-pointer"
          >
            <PanelLeft className="h-4 w-4" />
          </button>
        </div>
        <HistoryView
          conversations={conversations}
          activeSessionId={activeSessionId}
          onSelectSession={(id) => selectSession(id)}
          onDeleteSession={deleteSession}
          onNewChat={startNewChat}
          isSidebar={true}
        />
      </aside>

      {/* Main Content Pane */}
      <main className="flex flex-1 min-h-0 flex-col overflow-hidden bg-white">
        {/* Desktop Header on screens >= 768px */}
        <div className="hidden md:block">
          <Header
            title={currentSession ? currentSession.title : "AI Assistant"}
            platform="responsive"
            onBack={handleBack}
            onNewChat={startNewChat}
            isDesktopSidebarOpen={isDesktopSidebarOpen}
            onToggleDesktopSidebar={() => setIsDesktopSidebarOpen(!isDesktopSidebarOpen)}
          />
        </div>

        {/* Mobile Header on screens < 768px */}
        <div className="block md:hidden">
          <Header
            title={activeView === "history" ? "History" : "AI Assistant"}
            platform="responsive"
            onBack={handleBack}
            onNewChat={startNewChat}
            onOpenHistory={() => setActiveView("history")}
            activeView={activeView}
          />
        </div>

        {/* Dynamic Views */}
        {activeView === "history" ? (
          <div className="flex-1 flex flex-col overflow-hidden md:hidden">
            <HistoryView
              conversations={conversations}
              activeSessionId={activeSessionId}
              onSelectSession={(id) => selectSession(id)}
              onDeleteSession={deleteSession}
              onNewChat={startNewChat}
            />
          </div>
        ) : (
          <>
            <ChatView
              messages={messages}
              isLoading={isLoading}
              onSelectSuggestion={handleSuggestion}
              platform="responsive"
            />
            <Input
              value={inputText}
              onChange={setInputText}
              onSend={handleSend}
              isLoading={isLoading}
              attachment={attachment}
              onAttach={setAttachment}
              platform="responsive"
            />
          </>
        )}
      </main>
    </div>
  );
}
