"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { ConversationSession, AssistantMessage, AssistantContextType, PlatformType } from "../types/assistant.types";
import { INITIAL_CONVERSATIONS } from "../data/mock-conversations";

const STORAGE_KEY = "pencipta_comunity_ai_assistant_sessions_v1";

function getStoredConversations(): ConversationSession[] {
  if (typeof window === "undefined") return INITIAL_CONVERSATIONS;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as unknown;
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed as ConversationSession[];
      }
    }
  } catch {
    // Ignore storage read error
  }
  return INITIAL_CONVERSATIONS;
}

const AssistantContext = createContext<AssistantContextType | null>(null);

export function AssistantProvider({ children }: { children: React.ReactNode }) {
  const [conversations, setConversations] = useState<ConversationSession[]>(getStoredConversations);
  const [activeSessionId, setActiveSessionId] = useState<string | null>("session-ai-community");
  const [activeView, setActiveView] = useState<"chat" | "history">("chat");
  const [platform, setPlatform] = useState<PlatformType>("responsive");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Synchronize conversations changes to localStorage without triggering state cascades
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
    } catch {
      // Ignore storage write error
    }
  }, [conversations]);

  // Global Keyboard Shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const currentSession = conversations.find((c) => c.id === activeSessionId) || null;
  const messages = currentSession?.messages || [];

  // Core send message handler
  const sendMessage = useCallback(
    async (text: string, attachment?: File | null) => {
      const userMessageText = text.trim();
      if ((!userMessageText && !attachment) || isLoading) return;

      const newUserMsg: AssistantMessage = {
        id: `msg-${Date.now()}`,
        sender: "user",
        text: userMessageText || (attachment ? `Attached: ${attachment.name}` : ""),
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        attachmentName: attachment?.name,
      };

      let targetSessionId = activeSessionId;

      if (!targetSessionId) {
        const newSessionId = `session-${Date.now()}`;
        const newSessionTitle =
          userMessageText.length > 28 ? `${userMessageText.slice(0, 28)}...` : userMessageText;

        const newSession: ConversationSession = {
          id: newSessionId,
          title: newSessionTitle || "New Conversation",
          preview: userMessageText,
          createdAt: "Just now",
          updatedAt: "Just now",
          messages: [newUserMsg],
        };

        setConversations((prev) => [newSession, ...prev]);
        setActiveSessionId(newSessionId);
        targetSessionId = newSessionId;
      } else {
        setConversations((prev) =>
          prev.map((session) => {
            if (session.id === targetSessionId) {
              return {
                ...session,
                preview: userMessageText,
                updatedAt: "Just now",
                messages: [...session.messages, newUserMsg],
              };
            }
            return session;
          })
        );
      }

      setIsLoading(true);

      try {
        const res = await fetch("/api/ask", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: userMessageText }),
        });

        let aiResponseText = "";
        let citedProfiles: AssistantMessage["citedProfiles"] = [];

        if (res.ok) {
          const data = (await res.json()) as { data?: { answer?: string; citedProfiles?: AssistantMessage["citedProfiles"] } };
          if (data?.data?.answer) {
            aiResponseText = data.data.answer;
            citedProfiles = data.data.citedProfiles;
          }
        }

        if (!aiResponseText) {
          const lowerText = userMessageText.toLowerCase();
          if (lowerText.includes("beginner") || lowerText.includes("where can i find")) {
            aiResponseText =
              "You can explore dedicated spaces on Discord (Hugging Face, PyTorch, OpenAI Developers), open Reddit forums like r/MachineLearning and r/LearnMachineLearning, and local meetup hubs on pencipta-comunity where beginner study cohorts run weekly.";
          } else if (lowerText.includes("boarding house") || lowerText.includes("map")) {
            aiResponseText =
              "I've generated a spatial model for the student boarding house perimeter. The district is separated into North Quad (quiet, 8-min walk) and South Strip (cafes, transit accessible, budget-friendly).";
          } else if (lowerText.includes("sql") || lowerText.includes("join")) {
            aiResponseText =
              "An INNER JOIN returns only rows where the join condition is met in both tables. A LEFT JOIN returns all rows from the primary table, filling in NULL for unmatched secondary table records.";
          } else {
            aiResponseText =
              `I've processed your request regarding "${userMessageText}". I can help analyze, synthesize data, or outline actionable next steps for the community.`;
          }
        }

        const newAiMsg: AssistantMessage = {
          id: `msg-${Date.now() + 1}`,
          sender: "assistant",
          text: aiResponseText,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          citedProfiles,
        };

        setConversations((prev) =>
          prev.map((session) => {
            if (session.id === targetSessionId) {
              return {
                ...session,
                messages: [...session.messages, newAiMsg],
              };
            }
            return session;
          })
        );
      } catch (err) {
        console.error(err);
        const fallbackAiMsg: AssistantMessage = {
          id: `msg-${Date.now() + 1}`,
          sender: "assistant",
          text: "I am ready to assist you. What specific aspect would you like to explore?",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setConversations((prev) =>
          prev.map((session) => {
            if (session.id === targetSessionId) {
              return {
                ...session,
                messages: [...session.messages, fallbackAiMsg],
              };
            }
            return session;
          })
        );
      } finally {
        setIsLoading(false);
      }
    },
    [activeSessionId, isLoading]
  );

  const openAssistant = useCallback(
    (initialPrompt?: string) => {
      setIsOpen(true);
      setActiveView("chat");
      if (initialPrompt) {
        void sendMessage(initialPrompt);
      }
    },
    [sendMessage]
  );

  const closeAssistant = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleAssistant = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const startNewChat = useCallback(() => {
    setActiveSessionId(null);
    setActiveView("chat");
  }, []);

  const selectSession = useCallback((id: string) => {
    setActiveSessionId(id);
    setActiveView("chat");
  }, []);

  const deleteSession = useCallback(
    (id: string) => {
      setConversations((prev) => prev.filter((c) => c.id !== id));
      if (activeSessionId === id) {
        setActiveSessionId(null);
      }
    },
    [activeSessionId]
  );

  return (
    <AssistantContext.Provider
      value={{
        isOpen,
        activeView,
        activeSessionId,
        conversations,
        currentSession,
        messages,
        isLoading,
        platform,
        setPlatform,
        openAssistant,
        closeAssistant,
        toggleAssistant,
        setActiveView,
        selectSession,
        deleteSession,
        startNewChat,
        sendMessage,
      }}
    >
      {children}
    </AssistantContext.Provider>
  );
}

export function useAssistant(): AssistantContextType {
  const context = useContext(AssistantContext);
  if (!context) {
    throw new Error("useAssistant must be used within an AssistantProvider");
  }
  return context;
}
