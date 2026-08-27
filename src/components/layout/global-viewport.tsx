"use client";

import React from "react";
import { useViewport } from "@/context/viewport-context";

export function GlobalViewport({ children }: { children: React.ReactNode }) {
  const { platform } = useViewport();

  if (platform === "android") {
    return (
      <div className="flex min-h-[calc(100vh-45px)] w-full items-center justify-center bg-zinc-200/60 p-2 sm:py-6 overflow-y-auto">
        <div className="flex h-[860px] max-h-[92vh] w-full max-w-[412px] flex-col rounded-[32px] bg-white shadow-2xl border-4 border-zinc-900/10 overflow-hidden transition-all duration-300">
          <div className="flex-1 min-h-0 flex flex-col overflow-hidden">{children}</div>
        </div>
      </div>
    );
  }

  if (platform === "ios") {
    return (
      <div className="flex min-h-[calc(100vh-45px)] w-full items-center justify-center bg-zinc-200/60 p-2 sm:py-6 overflow-y-auto">
        <div className="flex h-[844px] max-h-[92vh] w-full max-w-[390px] flex-col rounded-[48px] bg-white shadow-2xl border-4 border-zinc-900/10 overflow-hidden transition-all duration-300">
          <div className="flex-1 min-h-0 flex flex-col overflow-hidden">{children}</div>
        </div>
      </div>
    );
  }

  // Desktop mode: full width
  return <div className="w-full flex-1 min-h-0 flex flex-col bg-white">{children}</div>;
}
