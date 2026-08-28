"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Search,
  MessageCircle,
  User,
  Bot,
  Sparkles,
  TrendingUp,
  Bookmark,
  PlusCircle,
  LogOut,
} from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { useFeed } from "@/components/feed";

export function DesktopSidebar() {
  const pathname = usePathname();
  const { openCreateModal } = useFeed();

  const navItems = [
    { href: "/", label: "Home", icon: Home, matchPattern: ["/"] },
    { href: "/search", label: "Explore", icon: Search, matchPattern: ["/search", "/explore"] },
    { href: "/assistant", label: "AI Assistant", icon: Bot, isAi: true, matchPattern: ["/assistant", "/ask"] },
    { href: "/messages", label: "Messages", icon: MessageCircle, badge: "2", matchPattern: ["/messages", "/connect"] },
    { href: "/profile", label: "Profile", icon: User, matchPattern: ["/profile"] },
    { href: "/trends", label: "Trends", icon: TrendingUp, matchPattern: ["/trends"] },
    { href: "/bookmarks", label: "Bookmarks", icon: Bookmark, matchPattern: ["/bookmarks"] },
  ];

  const isItemActive = (item: (typeof navItems)[0]) => {
    if (item.href === "/" && pathname === "/") return true;
    if (item.href !== "/" && pathname?.startsWith(item.href)) return true;
    return item.matchPattern?.some((p) => pathname === p || pathname?.startsWith(p)) ?? false;
  };

  return (
    <aside className="sticky top-0 hidden h-screen w-64 flex-col justify-between border-r border-zinc-200/80 bg-white px-4 py-5 md:flex lg:w-68 shrink-0 select-none">
      {/* Top Section: Brand + Navigation */}
      <div className="space-y-6">
        {/* Brand Logo & Name */}
        <Link
          href="/"
          className="flex items-center gap-3 px-2 py-1 transition-opacity hover:opacity-90"
        >
          <Logo size="sm" />
          <div>
            <span className="text-base font-bold tracking-tight text-zinc-900 block leading-tight">
              pencipta-comunity
            </span>
            <span className="inline-block rounded bg-cyan-100 px-1.5 py-0.2 text-[9px] font-bold text-cyan-800 uppercase tracking-wider">
              Beta
            </span>
          </div>
        </Link>

        {/* Navigation Links (Clean styling without active black background box) */}
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isItemActive(item);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center justify-between rounded-2xl px-3.5 py-2.5 text-[15px] transition-colors hover:bg-zinc-100/80 ${
                  active
                    ? "font-bold text-zinc-950"
                    : "font-medium text-zinc-600 hover:text-zinc-950"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <Icon
                    className={`h-5 w-5 shrink-0 transition-colors ${
                      active
                        ? "text-zinc-950 stroke-[2.5]"
                        : item.isAi
                        ? "text-cyan-600 stroke-[2]"
                        : "text-zinc-400 group-hover:text-zinc-800 stroke-[1.8]"
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.isAi && (
                  <Sparkles className="h-4 w-4 text-cyan-500 animate-pulse" />
                )}

                {item.badge && (
                  <span className="rounded-full bg-cyan-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Create Post Button in Sidebar */}
        <button
          type="button"
          onClick={openCreateModal}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-zinc-950 py-3 text-sm font-bold text-white shadow-md hover:bg-zinc-800 active:scale-[0.98] transition-all cursor-pointer"
        >
          <PlusCircle className="h-4.5 w-4.5" />
          <span>New Post</span>
        </button>
      </div>

      {/* Bottom Section: User Profile Card */}
      <div className="border-t border-zinc-100 pt-3">
        <div className="flex items-center justify-between rounded-2xl p-2 hover:bg-zinc-100/70 transition-colors cursor-pointer group">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white">
              ME
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-zinc-900 leading-tight">
                Community User
              </p>
              <p className="truncate text-[11px] text-zinc-400">@community_user</p>
            </div>
          </div>
          <Link
            href="/login"
            title="Sign out"
            className="rounded-lg p-1.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
