"use client";

import React, { useState, useEffect, useRef } from "react";
import { useViewport, PlatformType } from "@/context/viewport-context";
import { Smartphone, Bot, EyeOff, Wrench, Layout } from "lucide-react";

function getInitialDevMode(): boolean {
  if (process.env.NODE_ENV !== "production") return true;
  if (process.env.NEXT_PUBLIC_ENABLE_DEVTOOLS === "true") return true;
  if (typeof window !== "undefined") {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("dev") === "true" || urlParams.get("dev") === "1") {
        localStorage.setItem("pencipta_dev_mode", "true");
        return true;
      }
      if (localStorage.getItem("pencipta_dev_mode") === "true") {
        return true;
      }
    } catch {
      // Ignore storage error
    }
  }
  return false;
}

function getInitialPosition(): { x: number; y: number } | null {
  if (typeof window === "undefined") return null;
  try {
    const saved = localStorage.getItem("pencipta_dev_tools_pos");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (typeof parsed.x === "number" && typeof parsed.y === "number") {
        const clampedX = Math.min(Math.max(12, parsed.x), window.innerWidth - 50);
        const clampedY = Math.min(Math.max(12, parsed.y), window.innerHeight - 50);
        return { x: clampedX, y: clampedY };
      }
    }
  } catch {
    // Ignore
  }
  return null;
}

export function DevToolbar() {
  const [isClientDev] = useState<boolean>(getInitialDevMode);
  const { platform, setPlatform } = useViewport();

  // Default auto-hidden into the compact floating trigger icon
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isVisibleOnScroll, setIsVisibleOnScroll] = useState(true);
  const lastScrollY = useRef(0);
  const autoHideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Draggable position state initialized lazily
  const [position, setPosition] = useState<{ x: number; y: number } | null>(getInitialPosition);
  const isPointerDownRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef<{ startX: number; startY: number; initX: number; initY: number }>({
    startX: 0,
    startY: 0,
    initX: 0,
    initY: 0,
  });
  const buttonRef = useRef<HTMLButtonElement | null>(null);

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
    if (isDraggingRef.current) return;
    setIsCollapsed(false);
    setIsVisibleOnScroll(true);
  };

  const handleSelectPlatform = (p: PlatformType) => {
    setPlatform(p);
  };

  // Pointer drag handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.button !== 0) return;
    isPointerDownRef.current = true;
    isDraggingRef.current = false;

    const rect = e.currentTarget.getBoundingClientRect();
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initX: rect.left,
      initY: rect.top,
    };

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Ignore
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!isPointerDownRef.current) return;

    const deltaX = e.clientX - dragStartRef.current.startX;
    const deltaY = e.clientY - dragStartRef.current.startY;

    if (Math.hypot(deltaX, deltaY) > 5) {
      isDraggingRef.current = true;
    }

    if (isDraggingRef.current) {
      const buttonSize = 40;
      const margin = 12;
      const rawX = dragStartRef.current.initX + deltaX;
      const rawY = dragStartRef.current.initY + deltaY;

      const clampedX = Math.min(Math.max(margin, rawX), window.innerWidth - buttonSize - margin);
      const clampedY = Math.min(Math.max(margin, rawY), window.innerHeight - buttonSize - margin);

      setPosition({ x: clampedX, y: clampedY });
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!isPointerDownRef.current) return;
    isPointerDownRef.current = false;

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignore
    }

    if (isDraggingRef.current) {
      if (position) {
        try {
          localStorage.setItem("pencipta_dev_tools_pos", JSON.stringify(position));
        } catch {
          // Ignore
        }
      }
      setTimeout(() => {
        isDraggingRef.current = false;
      }, 50);
    } else {
      handleOpenToolbar();
    }
  };

  // Disabled if not in dev mode or explicitly enabled
  if (!isClientDev) {
    return null;
  }

  // Collapsed / Auto-hidden Floating Trigger (Draggable Floating Button)
  if (isCollapsed || !isVisibleOnScroll) {
    const triggerStyle: React.CSSProperties = position
      ? {
          position: "fixed",
          left: `${position.x}px`,
          top: `${position.y}px`,
          zIndex: 50,
          touchAction: "none",
        }
      : {
          position: "fixed",
          top: "12px",
          right: "12px",
          zIndex: 50,
          touchAction: "none",
        };

    return (
      <aside aria-label="Dev Mode Trigger" style={triggerStyle}>
        <button
          ref={buttonRef}
          type="button"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          aria-label="Open Dev Tools"
          title="Drag to move, click to open Dev Tools"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-950/90 text-white shadow-xl backdrop-blur-md hover:bg-zinc-800 active:scale-95 transition-transform cursor-grab active:cursor-grabbing ring-1 ring-white/20 select-none touch-none"
        >
          <Wrench className="h-4 w-4 text-cyan-400 pointer-events-none" />
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
