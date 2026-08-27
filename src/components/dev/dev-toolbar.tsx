"use client";

import React, { useState, useEffect, useRef } from "react";
import { useViewport, PlatformType } from "@/context/viewport-context";
import { Smartphone, Bot, EyeOff, Wrench, Layout } from "lucide-react";

export function DevToolbar() {
  const isDev = process.env.NODE_ENV !== "production";
  const { platform, setPlatform } = useViewport();

  // Default auto-hidden into the compact floating trigger icon
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isVisibleOnScroll, setIsVisibleOnScroll] = useState(true);
  const lastScrollY = useRef(0);
  const autoHideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-hide toolbar on scroll down
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 40) {
        setIsVisibleOnScroll(false);
      } else {
        setIsVisibleOnScroll(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cleanup auto-hide timer
  useEffect(() => {
    const currentTimeout = autoHideTimeoutRef.current;
    return () => {
      if (currentTimeout) {
        clearTimeout(currentTimeout);
      }
    };
  }, []);

  const handleOpenToolbar = () => {
    setIsCollapsed(false);
    setIsVisibleOnScroll(true);
  };

  const handleSelectPlatform = (p: PlatformType) => {
    setPlatform(p);
  };

  // Automatically disabled in production
  if (!isDev) {
    return null;
  }

  // Collapsed / Auto-hidden Floating Trigger (Hanya Icon Kunci Tanpa Tulisan)
  if (isCollapsed || !isVisibleOnScroll) {
    return (
      <aside aria-label="Dev Mode Trigger" className="fixed top-3 right-3 z-50 animate-in fade-in zoom-in-95 duration-200">
        <button
          type="button"
          onClick={handleOpenToolbar}
          aria-label="Open Dev Tools"
          title="Dev Tools"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-950/90 text-white shadow-lg backdrop-blur-md hover:bg-zinc-800 hover:scale-110 active:scale-95 transition-all cursor-pointer ring-1 ring-white/20"
        >
          <Wrench className="h-4 w-4 text-cyan-400" />
        </button>
      </aside>
    );
  }

  // Expanded Sticky Top Bar
  return (
    <header className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-zinc-200 bg-white/95 px-4 py-2 backdrop-blur-md shadow-2xs transition-all duration-300 animate-in fade-in slide-in-from-top-2">
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
          Version:
        </span>

        {/* Responsive Button (Default) */}
        <button
          type="button"
          onClick={() => handleSelectPlatform("responsive")}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-semibold transition cursor-pointer ${
            platform === "responsive"
              ? "bg-zinc-950 text-white shadow-xs"
              : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
          }`}
        >
          <Layout className="h-3.5 w-3.5" />
          <span>Responsive</span>
        </button>

        {/* Android Button */}
        <button
          type="button"
          onClick={() => handleSelectPlatform("android")}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-semibold transition cursor-pointer ${
            platform === "android"
              ? "bg-emerald-600 text-white shadow-xs"
              : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
          }`}
        >
          <Bot className="h-3.5 w-3.5" />
          <span>Android</span>
        </button>

        {/* iOS Button */}
        <button
          type="button"
          onClick={() => handleSelectPlatform("ios")}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-semibold transition cursor-pointer ${
            platform === "ios"
              ? "bg-zinc-950 text-white shadow-xs"
              : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
          }`}
        >
          <Smartphone className="h-3.5 w-3.5" />
          <span>iOS</span>
        </button>
      </div>

      {/* Collapse / Hide Button */}
      <button
        type="button"
        onClick={() => setIsCollapsed(true)}
        title="Hide Dev Toolbar"
        className="flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 transition-colors cursor-pointer"
      >
        <EyeOff className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Hide</span>
      </button>
    </header>
  );
}
