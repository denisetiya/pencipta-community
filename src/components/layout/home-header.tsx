"use client";

import React, { useState } from "react";
import { Menu } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { DrawerMenu } from "./drawer-menu";
import { MobileStatusBar } from "./mobile-status-bar";

interface HomeHeaderProps {
  className?: string;
  onOpenMenu?: () => void;
}

export function HomeHeader({ className = "", onOpenMenu }: HomeHeaderProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleOpen = () => {
    if (onOpenMenu) {
      onOpenMenu();
    } else {
      setIsDrawerOpen(true);
    }
  };

  const handleClose = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-30 flex w-full flex-col border-b border-zinc-100/90 bg-white/95 backdrop-blur-md transition-colors ${className}`}
      >
        {/* Mobile Platform Status Bar (Android & iOS in Dev Mode / Mobile Viewports) */}
        <MobileStatusBar />

        {/* Main Navigation Header Bar (Sitting below Status Bar) */}
        <div className="relative flex h-14 w-full items-center justify-between px-4">
          {/* Left Hamburger Menu Button */}
          <button
            type="button"
            onClick={handleOpen}
            aria-label="Open Navigation Menu"
            className="flex h-10 w-10 items-center justify-center rounded-xl text-zinc-900 hover:bg-zinc-100 active:scale-95 transition-colors cursor-pointer"
          >
            <Menu className="h-6 w-6 stroke-[2.2]" />
          </button>

          {/* Center Brand Logo */}
          <div className="flex items-center justify-center">
            <Logo size="sm" />
          </div>

          {/* Right Balance Spacer to preserve exact center alignment */}
          <div className="flex h-10 w-10 items-center justify-end" aria-hidden="true" />
        </div>
      </header>

      {/* Side Drawer Menu */}
      <DrawerMenu isOpen={isDrawerOpen} onClose={handleClose} />
    </>
  );
}
