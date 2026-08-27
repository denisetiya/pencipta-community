"use client";

import React, { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/ui/logo";
import { AssistantMessage, PlatformType } from "../types/assistant.types";
import { Sparkles, Copy, Check } from "lucide-react";

interface ChatViewProps {
  messages: AssistantMessage[];
  isLoading?: boolean;
  onSelectSuggestion?: (prompt: string) => void;
  platform?: PlatformType;
}

const SUGGESTIONS = [
  "What exactly is an AI community?",
  "Student Boarding House Map",
  "Summarize onboarding UX research",
  "Explain SQL INNER vs LEFT JOIN",
];

export function ChatView({
  messages,
  isLoading = false,
  onSelectSuggestion,
}: ChatViewProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Empty state
  if (messages.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12 text-center select-none animate-in fade-in duration-300">
        <div className="mb-6">
          <Logo size="md" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 max-w-xs sm:max-w-md leading-tight">
          Where are we kicking things off?
        </h2>

        <div className="mt-8 flex flex-wrap justify-center gap-2 max-w-lg">
          {SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => onSelectSuggestion?.(suggestion)}
              className="group flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs sm:text-sm font-medium text-zinc-700 shadow-2xs transition-all hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900 active:scale-95 cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5 text-cyan-500 transition-transform group-hover:scale-110" />
              <span>{suggestion}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Active chat stream
  return (
    <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
      <div className="mx-auto w-full max-w-3xl space-y-6">
        {messages.map((msg) => {
          const isUser = msg.sender === "user";

          return (
            <div
              key={msg.id}
              className={`flex items-end gap-2.5 sm:gap-3 ${
                isUser ? "justify-end" : "justify-start"
              }`}
            >
              {!isUser && (
                <div
                  aria-hidden="true"
                  className="h-8 w-8 shrink-0 rounded-full bg-zinc-300/90 shadow-2xs flex items-center justify-center text-[10px] font-bold text-zinc-600 select-none"
                >
                  AI
                </div>
              )}

              <div
                className={`group relative flex flex-col ${
                  isUser ? "items-end" : "items-start"
                } max-w-[85%] sm:max-w-[78%]`}
              >
                <div
                  className={`rounded-[22px] px-5 py-3.5 text-[15px] leading-relaxed break-words shadow-2xs ${
                    isUser
                      ? "bg-zinc-950 text-white rounded-br-sm"
                      : "bg-[#f4f4f6] text-zinc-900 rounded-bl-sm"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.text}</div>

                  {msg.citedProfiles && msg.citedProfiles.length > 0 && (
                    <div className="mt-3.5 pt-3 border-t border-zinc-200/80 space-y-2">
                      <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                        Relevant Mentors & Members
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.citedProfiles.map((cp) => (
                          <div
                            key={cp.profile_id}
                            className="flex items-center gap-1 rounded-lg bg-white/90 px-2.5 py-1 text-xs text-zinc-800 border border-zinc-200 shadow-2xs"
                          >
                            <span className="font-medium">{cp.name}</span>
                            <span className="text-zinc-400">·</span>
                            <span className="text-zinc-500 truncate max-w-[140px]">{cp.why}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {!isUser && (
                  <div className="mt-1 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={() => handleCopy(msg.id, msg.text)}
                      className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-600" />
                          <span className="text-emerald-600">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {isUser && (
                <div
                  aria-hidden="true"
                  className="h-8 w-8 shrink-0 rounded-full bg-zinc-300/90 shadow-2xs flex items-center justify-center text-[10px] font-bold text-zinc-600 select-none"
                >
                  U
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-end gap-2.5 sm:gap-3 justify-start animate-in fade-in duration-200">
            <div
              aria-hidden="true"
              className="h-8 w-8 shrink-0 rounded-full bg-zinc-300/90 shadow-2xs flex items-center justify-center text-[10px] font-bold text-zinc-600 select-none"
            >
              AI
            </div>

            <div className="rounded-[22px] rounded-bl-sm bg-[#f4f4f6] px-5 py-4 shadow-2xs flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-zinc-500 animate-bounce [animation-delay:-0.3s]" />
              <span className="h-2 w-2 rounded-full bg-zinc-500 animate-bounce [animation-delay:-0.15s]" />
              <span className="h-2 w-2 rounded-full bg-zinc-500 animate-bounce" />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
