"use client";

import React from "react";
import { Wifi, Battery, BatteryMedium, Signal } from "lucide-react";
import { useViewport, PlatformType } from "@/context/viewport-context";

interface MobileStatusBarProps {
  platform?: PlatformType;
  className?: string;
}

export function MobileStatusBar({ platform: customPlatform, className = "" }: MobileStatusBarProps) {
  const { platform: globalPlatform } = useViewport();
  const platform = customPlatform ?? globalPlatform;

  if (platform === "android") {
    return (
      <div
        className={`flex h-7 w-full items-center justify-between px-6 pt-1 text-[11px] font-medium text-zinc-800 select-none bg-inherit ${className}`}
      >
        <span>9:41</span>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-bold">5G</span>
          <Signal className="h-3 w-3 fill-current" strokeWidth={2.5} />
          <Wifi className="h-3 w-3" strokeWidth={2.5} />
          <BatteryMedium className="h-3.5 w-3.5" strokeWidth={2.2} />
        </div>
      </div>
    );
  }

  if (platform === "ios") {
    return (
      <div
        className={`relative flex h-11 w-full items-center justify-between px-7 pt-1.5 text-xs font-semibold text-zinc-900 select-none bg-inherit ${className}`}
      >
        <span className="font-semibold">9:41</span>

        {/* Apple Dynamic Island */}
        <div className="absolute left-1/2 top-2.5 -translate-x-1/2 flex items-center justify-between h-6 w-24 rounded-full bg-black px-2.5 shadow-xs select-none">
          <div className="h-2.5 w-2.5 rounded-full bg-zinc-900 border border-zinc-800" />
          <div className="h-2 w-2 rounded-full bg-zinc-900" />
        </div>

        <div className="flex items-center gap-1.5">
          <Signal className="h-3.5 w-3.5 fill-current" strokeWidth={2.5} />
          <Wifi className="h-3.5 w-3.5" strokeWidth={2.5} />
          <Battery className="h-4 w-4 fill-current" strokeWidth={2.5} />
        </div>
      </div>
    );
  }

  return null;
}
