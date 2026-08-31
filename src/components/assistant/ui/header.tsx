"use client";

import React from "react";
import {
  ChevronLeft,
  SquarePen,
  History,
  PanelLeftClose,
  PanelLeft,
  Plus,
} from "lucide-react";
import { useViewport, PlatformType } from "@/context/viewport-context";
import { MobileStatusBar } from "@/components/layout/mobile-status-bar";

interface HeaderProps {
  title: string;
  platform?: PlatformType;
  onBack?: () => void;
  onNewChat?: () => void;
  onOpenHistory?: () => void;
  activeView?: "chat" | "history";
  isDesktopSidebarOpen?: boolean;
  onToggleDesktopSidebar?: () => void;
  showStatusBar?: boolean;
}

export function Header({
  title,
  platform: customPlatform,
  onBack,
  onNewChat,
  onOpenHistory,
  activeView = "chat",
  isDesktopSidebarOpen = true,
  onToggleDesktopSidebar,
  showStatusBar = true,
}: HeaderProps) {
  const { platform: globalPlatform } = useViewport();
  const platform = customPlatform ?? globalPlatform;
  // Desktop Header
  if (onToggleDesktopSidebar) {
    return (
      <header className="sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b border-zinc-200/80 bg-white/95 px-6 backdrop-blur-md">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              title="Back to Home"
              aria-label="Back to Home"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 transition-colors cursor-pointer"
            >
              <ChevronLeft className="h-5 w-5 stroke-[2.2]" />
            </button>
          )}

          {onToggleDesktopSidebar && (
            <button
              type="button"
              onClick={onToggleDesktopSidebar}
              title={isDesktopSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 transition-colors cursor-pointer"
            >
              {isDesktopSidebarOpen ? (
                <PanelLeftClose className="h-5 w-5" />
              ) : (
                <PanelLeft className="h-5 w-5" />
              )}
            </button>
          )}

          <div className="flex items-center gap-2">
            <h1 className="text-base font-semibold text-zinc-900">{title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onNewChat}
            className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 text-xs font-medium text-zinc-700 shadow-2xs hover:bg-zinc-50 hover:border-zinc-300 transition-all active:scale-95 cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5 text-zinc-500" />
            <span>New Chat</span>
          </button>
        </div>
      </header>
    );
  }

  // Mobile / Native Header (Android, iOS, or responsive)
  return (
    <header className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-md transition-colors border-b border-zinc-100/60">
      {/* Mobile Status Bar (Rendered only if enabled and in mobile platform simulation) */}
      {showStatusBar && <MobileStatusBar platform={platform} />}

      {/* Main Navigation Bar */}
      <div className="relative flex h-14 items-center justify-between px-4 sm:px-6">
        <button
          type="button"
          onClick={onBack}
          aria-label="Go back"
          className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-800 transition-colors hover:bg-zinc-100 active:scale-95 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none cursor-pointer"
        >
          <ChevronLeft className="h-6 w-6 stroke-[2.2]" />
        </button>

        <h1 className="absolute left-1/2 -translate-x-1/2 text-[17px] font-semibold tracking-tight text-zinc-900 select-none">
          {title}
        </h1>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onNewChat}
            aria-label="New conversation"
            title="New Chat"
            className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-800 transition-colors hover:bg-zinc-100 active:scale-95 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none cursor-pointer"
          >
            <SquarePen className="h-5 w-5 stroke-[1.9]" />
          </button>

          {activeView === "chat" && onOpenHistory && (
            <button
              type="button"
              onClick={onOpenHistory}
              aria-label="View history"
              title="Chat History"
              className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-800 transition-colors hover:bg-zinc-100 active:scale-95 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none cursor-pointer"
            >
              <History className="h-5 w-5 stroke-[1.9]" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
