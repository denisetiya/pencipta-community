"use client";

import React, { useRef, useEffect, useState } from "react";
import { Paperclip, SendHorizontal, X, FileText } from "lucide-react";
import { useViewport, PlatformType } from "@/context/viewport-context";

interface InputProps {
  value: string;
  onChange: (val: string) => void;
  onSend: () => void;
  isLoading?: boolean;
  placeholder?: string;
  attachment?: File | null;
  onAttach?: (file: File | null) => void;
  platform?: PlatformType;
}

export function Input({
  value,
  onChange,
  onSend,
  isLoading = false,
  placeholder = "Ask for help or action...",
  attachment = null,
  onAttach,
  platform: customPlatform,
}: InputProps) {
  const { platform: globalPlatform } = useViewport();
  const platform = customPlatform ?? globalPlatform;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const nextHeight = Math.min(textareaRef.current.scrollHeight, 140);
      textareaRef.current.style.height = `${Math.max(nextHeight, 24)}px`;
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if ((value.trim() || attachment) && !isLoading) {
        onSend();
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onAttach?.(e.target.files[0]);
    }
  };

  return (
    <div className="w-full bg-white/95 backdrop-blur-md pt-2 pb-4 px-4 sm:px-6 border-t border-zinc-100/80">
      <div className="mx-auto w-full max-w-3xl flex flex-col">
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept="image/*,.pdf,.doc,.docx,.txt,.csv,.json"
        />

        {attachment && (
          <div className="mb-2 flex items-center gap-2 self-start rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 w-fit animate-in fade-in duration-150">
            <FileText className="h-3.5 w-3.5 text-zinc-500" />
            <span className="max-w-[200px] truncate">{attachment.name}</span>
            <button
              type="button"
              onClick={() => onAttach?.(null)}
              className="rounded-full p-0.5 hover:bg-zinc-200 text-zinc-400 hover:text-zinc-600 cursor-pointer"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        )}

        <div
          className={`relative flex items-center rounded-full border bg-white px-3.5 py-1.5 shadow-xs transition-all duration-200 ${
            isFocused
              ? "border-zinc-400 ring-2 ring-zinc-900/10 shadow-sm"
              : "border-zinc-200 hover:border-zinc-300"
          }`}
        >
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            aria-label="Attach file"
            title="Attach document or image"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 active:scale-95 focus-visible:outline-none cursor-pointer"
          >
            <Paperclip className="h-5 w-5 rotate-45 stroke-[1.8]" />
          </button>

          <textarea
            ref={textareaRef}
            rows={1}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className="mx-2 max-h-36 min-h-[24px] flex-1 resize-none bg-transparent py-1.5 text-[15px] leading-snug text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
          />

          <button
            type="button"
            onClick={onSend}
            disabled={(!value.trim() && !attachment) || isLoading}
            aria-label="Send message"
            title="Send (Enter)"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-white transition-all duration-150 hover:bg-zinc-800 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100 cursor-pointer shadow-xs"
          >
            <SendHorizontal className="h-4 w-4 stroke-[2.2] translate-x-0.5" />
          </button>
        </div>

        <p className="mt-2.5 text-center text-[11px] sm:text-xs text-zinc-400 leading-tight select-none">
          The assistant always asks for confirmation before changing or publishing something.
        </p>

        {platform === "ios" && (
          <div className="mt-2.5 flex justify-center">
            <div className="h-1 w-32 rounded-full bg-zinc-950/80" />
          </div>
        )}
      </div>
    </div>
  );
}
