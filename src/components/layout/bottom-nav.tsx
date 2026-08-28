"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, MessageCircle, User } from "lucide-react";
import { useViewport } from "@/context/viewport-context";
import type { BottomNavProps, NavigationTabItem } from "./types/navigation.types";

export const DEFAULT_BOTTOM_NAV_ITEMS: NavigationTabItem[] = [
  {
    id: "home",
    label: "Home",
    href: "/",
    icon: Home,
    matchPattern: ["/"],
  },
  {
    id: "search",
    label: "Search",
    href: "/search",
    icon: Search,
    matchPattern: ["/search", "/explore"],
  },
  {
    id: "message",
    label: "Message",
    href: "/messages",
    icon: MessageCircle,
    matchPattern: ["/messages", "/connect", "/inbox"],
  },
  {
    id: "profile",
    label: "Profile",
    href: "/profile",
    icon: User,
    matchPattern: ["/profile", "/me"],
  },
];

export function BottomNav({
  items = DEFAULT_BOTTOM_NAV_ITEMS,
  activeId,
  onChangeTab,
  className = "",
  showHomeIndicator,
}: BottomNavProps) {
  const pathname = usePathname();
  const { platform } = useViewport();

  // Determine if active tab matches current route or prop
  const isItemActive = (item: NavigationTabItem): boolean => {
    if (activeId) {
      return activeId === item.id;
    }
    if (item.href === "/" && pathname === "/") {
      return true;
    }
    if (item.href !== "/" && pathname?.startsWith(item.href)) {
      return true;
    }
    if (item.matchPattern && Array.isArray(item.matchPattern)) {
      return item.matchPattern.some((p) =>
        typeof p === "string" ? pathname === p || pathname?.startsWith(p) : false
      );
    }
    return false;
  };

  // Determine whether to display the iOS home indicator bar
  const shouldRenderIndicator =
    showHomeIndicator ?? (platform === "ios" || platform === "responsive");

  return (
    <nav
      aria-label="Bottom Navigation"
      className={`sticky bottom-0 z-40 w-full border-t border-zinc-200/80 bg-white/95 backdrop-blur-md transition-all ${className}`}
    >
      <div className="mx-auto flex h-[62px] max-w-md items-center justify-around px-3">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = isItemActive(item);

          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => {
                if (onChangeTab) {
                  onChangeTab(item.id, item.href);
                }
              }}
              className="group relative flex flex-1 flex-col items-center justify-center py-1 transition-transform active:scale-95"
            >
              <div className="relative flex items-center justify-center">
                <Icon
                  className={`h-5.5 w-5.5 transition-colors duration-200 ${
                    isActive
                      ? "text-zinc-950 stroke-[2.4]"
                      : "text-zinc-400 group-hover:text-zinc-700 stroke-[1.8]"
                  }`}
                />

                {/* Optional Badge */}
                {item.badge !== undefined && item.badge !== false && (
                  <span className="absolute -top-1 -right-2 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-cyan-600 px-1 text-[10px] font-bold text-white shadow-xs">
                    {typeof item.badge === "boolean" ? "" : item.badge}
                  </span>
                )}
              </div>

              <span
                className={`text-[11px] tracking-tight mt-1 transition-colors duration-200 ${
                  isActive
                    ? "font-bold text-zinc-950"
                    : "font-medium text-zinc-500 group-hover:text-zinc-800"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>

      {/* iOS Home Indicator Bar */}
      {shouldRenderIndicator && (
        <div className="flex w-full justify-center pb-1.5 pt-0.5" aria-hidden="true">
          <div className="h-1 w-32 rounded-full bg-black/90" />
        </div>
      )}
    </nav>
  );
}
