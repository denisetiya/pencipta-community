"use client";

import React from "react";
import { FeedList } from "./ui/feed-list";
import { FloatingCreateButton } from "./widget/floating-create-button";

interface FeedWorkspaceProps {
  showFab?: boolean;
}

export function FeedWorkspace({ showFab = true }: FeedWorkspaceProps) {
  return (
    <div className="relative flex min-h-full flex-col bg-white">
      {/* Feed Posts */}
      <FeedList />

      {/* FAB on mobile viewports */}
      {showFab && (
        <FloatingCreateButton className="fixed sm:absolute right-4 bottom-20 z-30 md:hidden" />
      )}
    </div>
  );
}
