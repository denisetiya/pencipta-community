"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAssistant } from "../context/assistant-context";
import { AssistantWorkspace } from "../assistant-workspace";
import { X, Maximize2, Sparkles } from "lucide-react";

export function FloatingWidget() {
  const pathname = usePathname();
  const { isOpen, closeAssistant, toggleAssistant } = useAssistant();

  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 40) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (pathname === "/assistant" || pathname === "/ask") {
    return null;
  }

  const showFab = isVisible || isHovered;

  return (
    <>
      {!isOpen && (
        <aside
          aria-label="pencipta-comunity AI Assistant"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`fixed bottom-6 right-6 z-40 flex items-center gap-2 transition-all duration-300 ${
            showFab
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-8 pointer-events-none"
          }`}
        >
          <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-zinc-700 shadow-md border border-zinc-200/80 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-cyan-500" />
            <span>AI Assistant</span>
            <kbd className="ml-1 rounded bg-zinc-100 px-1.5 py-0.5 text-[10px] font-mono text-zinc-500 border border-zinc-200">
              Cmd+K
            </kbd>
          </div>

          <button
            type="button"
            onClick={toggleAssistant}
            aria-label="Open AI Assistant"
            className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-zinc-950 text-white shadow-xl shadow-zinc-950/20 hover:bg-zinc-800 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer ring-4 ring-white"
          >
            <div className="relative flex items-center justify-center">
              <Image
                src="/logo.svg"
                alt="AI Logo"
                width={26}
                height={32}
                className="w-6 h-7.5 object-contain transition-transform group-hover:scale-110"
              />
            </div>
            <span className="absolute top-1 right-1 h-3 w-3 rounded-full bg-cyan-400 border-2 border-zinc-950" />
          </button>
        </aside>
      )}

      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 z-50 flex flex-col items-end animate-in fade-in slide-in-from-bottom-5 duration-250">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs sm:hidden"
            onClick={closeAssistant}
          />

          <div className="relative flex h-full sm:h-[640px] max-h-[100dvh] sm:max-h-[85vh] w-full sm:w-[420px] flex-col overflow-hidden bg-white shadow-2xl sm:rounded-3xl sm:border sm:border-zinc-200/90 ring-1 ring-black/5 z-10">
            <div className="flex h-11 items-center justify-between border-b border-zinc-100 bg-zinc-50/80 px-4">
              <div className="flex items-center gap-2">
                <Image
                  src="/logo.svg"
                  alt="AI Logo"
                  width={18}
                  height={22}
                  className="w-4 h-5 object-contain"
                />
                <span className="text-xs font-semibold text-zinc-900">pencipta-comunity AI</span>
              </div>

              <div className="flex items-center gap-1">
                <Link
                  href="/assistant"
                  onClick={closeAssistant}
                  title="Open full page"
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-200/60 hover:text-zinc-900 transition-colors"
                >
                  <Maximize2 className="h-3.5 w-3.5" />
                </Link>

                <button
                  type="button"
                  onClick={closeAssistant}
                  title="Close Assistant"
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-200/60 hover:text-zinc-900 transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-hidden">
              <AssistantWorkspace mode="drawer" onClose={closeAssistant} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
