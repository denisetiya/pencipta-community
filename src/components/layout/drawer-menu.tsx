"use client";

import React from "react";
import Link from "next/link";
import {
  X,
  Bot,
  Sparkles,
  TrendingUp,
  Bookmark,
  Hash,
  Award,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { Logo } from "@/components/ui/logo";

interface DrawerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DrawerMenu({ isOpen, onClose }: DrawerMenuProps) {
  if (!isOpen) return null;

  // Only features that are NOT present in the universal Bottom Navigation Bar (Home, Search, Message, Profile)
  const drawerExclusiveItems = [
    {
      href: "/assistant",
      label: "AI Assistant",
      icon: Bot,
      isHighlight: true,
      description: "Ask questions & get mentor matches",
    },
    {
      href: "/trends",
      label: "Trending Topics",
      icon: TrendingUp,
      description: "Popular discussions & tags",
    },
    {
      href: "/bookmarks",
      label: "Saved Posts",
      icon: Bookmark,
      description: "Your saved knowledge & resources",
    },
    {
      href: "/topics",
      label: "Browse Topics",
      icon: Hash,
      description: "Explore by domain & tech stack",
    },
    {
      href: "/connect",
      label: "Mentorship Network",
      icon: Award,
      description: "Find mentors & track sessions",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <aside className="relative z-10 flex h-full w-4/5 max-w-xs flex-col bg-white shadow-2xl animate-in slide-in-from-left duration-250 border-r border-zinc-100">
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-zinc-100 p-4">
          <div className="flex items-center gap-2">
            <Logo size="sm" />
            <div>
              <div className="text-sm font-bold tracking-tight text-zinc-900 leading-tight">
                pencipta-comunity
              </div>
              <span className="inline-block rounded bg-cyan-100 px-1.5 py-0.2 text-[10px] font-semibold text-cyan-800 uppercase tracking-wider">
                Beta
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            title="Close menu"
            className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition-colors cursor-pointer"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* User Card Summary */}
        <div className="border-b border-zinc-100 p-4 bg-zinc-50/60">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white shadow-xs">
              ME
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-zinc-900">Community User</p>
              <p className="truncate text-xs text-zinc-500">@community_user</p>
            </div>
          </div>
        </div>

        {/* Navigation Links (Exclusive items not in bottom bar) */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
          <div className="px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-zinc-400">
            Community Features
          </div>

          {drawerExclusiveItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`group flex items-start gap-3 rounded-2xl px-3 py-2.5 transition-colors ${
                  item.isHighlight
                    ? "bg-cyan-50/80 text-cyan-900 hover:bg-cyan-100/90"
                    : "text-zinc-700 hover:bg-zinc-100/80 hover:text-zinc-950"
                }`}
              >
                <div className="mt-0.5">
                  <Icon
                    className={`h-4.5 w-4.5 shrink-0 ${
                      item.isHighlight ? "text-cyan-600" : "text-zinc-500 group-hover:text-zinc-900"
                    }`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-zinc-900">{item.label}</span>
                    {item.isHighlight && (
                      <Sparkles className="h-3.5 w-3.5 text-cyan-500 animate-pulse" />
                    )}
                  </div>
                  {item.description && (
                    <p className="text-[11px] text-zinc-500 font-normal truncate mt-0.5">
                      {item.description}
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Drawer Footer */}
        <div className="border-t border-zinc-100 p-3 space-y-1 bg-zinc-50/40">
          <Link
            href="/settings"
            onClick={onClose}
            className="flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-medium text-zinc-600 hover:bg-zinc-100 transition-colors"
          >
            <Settings className="h-4 w-4 text-zinc-400" />
            <span>Settings</span>
          </Link>
          <Link
            href="/help"
            onClick={onClose}
            className="flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-medium text-zinc-600 hover:bg-zinc-100 transition-colors"
          >
            <HelpCircle className="h-4 w-4 text-zinc-400" />
            <span>Help & Feedback</span>
          </Link>
          <Link
            href="/login"
            onClick={onClose}
            className="flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="h-4 w-4 text-red-500" />
            <span>Sign Out</span>
          </Link>
        </div>
      </aside>
    </div>
  );
}
