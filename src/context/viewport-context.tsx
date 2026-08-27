"use client";

import React, { createContext, useContext, useState, useMemo } from "react";

export type PlatformType = "responsive" | "android" | "ios";

interface ViewportContextType {
  platform: PlatformType;
  setPlatform: (platform: PlatformType) => void;
  isMobile: boolean;
  isResponsive: boolean;
}

const ViewportContext = createContext<ViewportContextType | null>(null);

export function ViewportProvider({ children }: { children: React.ReactNode }) {
  const [platform, setPlatform] = useState<PlatformType>("responsive");

  const value = useMemo(
    () => ({
      platform,
      setPlatform,
      isMobile: platform === "android" || platform === "ios",
      isResponsive: platform === "responsive",
    }),
    [platform]
  );

  return <ViewportContext.Provider value={value}>{children}</ViewportContext.Provider>;
}

export function useViewport(): ViewportContextType {
  const context = useContext(ViewportContext);
  if (!context) {
    throw new Error("useViewport must be used within a ViewportProvider");
  }
  return context;
}
