"use client";

import React from "react";
import { useViewport } from "@/context/viewport-context";
import { FeedProvider, CreatePostModal } from "@/components/feed";
import { DesktopSidebar } from "./desktop-sidebar";
import { DesktopRightSidebar } from "./desktop-right-sidebar";
import { BottomNav } from "./bottom-nav";
import { HomeHeader } from "./home-header";

interface ResponsiveShellProps {
  children: React.ReactNode;
  headerTitle?: string;
  headerSubtitle?: string;
  showRightSidebar?: boolean;
}

export function ResponsiveShell({
  children,
  headerTitle = "Home",
  headerSubtitle,
  showRightSidebar = true,
}: ResponsiveShellProps) {
  const { isMobile } = useViewport();

  return (
    <FeedProvider>
      {isMobile ? (
        // Simulated mobile platform (Android / iOS device frame from DevToolbar)
        <div className="relative mx-auto flex h-full min-h-full w-full flex-col bg-white overflow-hidden">
          <HomeHeader />
          <main className="relative flex-1 min-h-0 overflow-y-auto">{children}</main>
          <BottomNav />
          <CreatePostModal />
        </div>
      ) : (
        // Full Desktop Application Mode (100% full screen width and height)
        <div className="flex min-h-screen w-full bg-white">
          {/* Left Desktop Sidebar Navigation */}
          <DesktopSidebar />

          {/* Center Main Content Area (Fluid full width) */}
          <div className="flex flex-1 min-w-0 flex-col bg-white border-r border-zinc-200/80">
            {/* Mobile Header (Hidden on md: breakpoint) */}
            <div className="md:hidden">
              <HomeHeader />
            </div>

            {/* Desktop Header */}
            <header className="sticky top-0 z-30 hidden h-14 w-full items-center justify-between border-b border-zinc-100/90 bg-white/95 px-6 backdrop-blur-md md:flex">
              <div>
                <h1 className="text-base font-bold text-zinc-900 tracking-tight leading-tight">
                  {headerTitle}
                </h1>
                {headerSubtitle && (
                  <p className="text-xs text-zinc-500 font-normal">{headerSubtitle}</p>
                )}
              </div>
            </header>

            {/* Main Content Body */}
            <main className="relative flex-1 min-h-0 w-full">{children}</main>

            {/* Universal Bottom Navigation Bar (Visible on mobile screen width) */}
            <BottomNav className="md:hidden" />
          </div>

          {/* Right Desktop Sidebar (Visible on lg: and wider) */}
          {showRightSidebar && <DesktopRightSidebar />}

          {/* Post Creation Modal */}
          <CreatePostModal />
        </div>
      )}
    </FeedProvider>
  );
}
