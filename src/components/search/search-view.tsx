"use client";

import React, { useState, useMemo } from "react";
import { Search, X, MoreHorizontal, MessageSquare, Coffee, Cpu, Palette } from "lucide-react";
import { MobileStatusBar } from "@/components/layout/mobile-status-bar";
import {
  INITIAL_TRENDING_ITEMS,
  SEARCH_TABS,
  SearchTabType,
  TrendingItem,
} from "./data/mock-search";

export function SearchView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<SearchTabType>("explore");
  const [visibleCount, setVisibleCount] = useState(4);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    let items = INITIAL_TRENDING_ITEMS;

    // Filter by tab if not explore
    if (activeTab !== "explore") {
      items = items.filter((item) => item.tab === activeTab || item.categoryTag?.toLowerCase() === activeTab);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      items = items.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          (item.categoryTag && item.categoryTag.toLowerCase().includes(q)) ||
          (item.subtitle && item.subtitle.toLowerCase().includes(q))
      );
    }

    return items;
  }, [activeTab, searchQuery]);

  const displayedItems = filteredItems.slice(0, visibleCount);

  const renderThumbnail = (type?: TrendingItem["thumbnailType"]) => {
    if (type === "ai") {
      return (
        <div className="h-16 w-16 sm:h-18 sm:w-18 rounded-2xl bg-gradient-to-br from-cyan-500/20 via-sky-400/20 to-blue-600/30 border border-cyan-100 flex items-center justify-center shrink-0 shadow-2xs">
          <Cpu className="h-8 w-8 text-cyan-600 stroke-[1.8]" />
        </div>
      );
    }
    if (type === "cafe") {
      return (
        <div className="h-16 w-16 sm:h-18 sm:w-18 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 border border-amber-200/60 flex items-center justify-center shrink-0 shadow-2xs">
          <Coffee className="h-8 w-8 text-amber-700 stroke-[1.8]" />
        </div>
      );
    }
    if (type === "design") {
      return (
        <div className="h-16 w-16 sm:h-18 sm:w-18 rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 border border-purple-200/60 flex items-center justify-center shrink-0 shadow-2xs">
          <Palette className="h-8 w-8 text-purple-700 stroke-[1.8]" />
        </div>
      );
    }
    if (type === "tech") {
      return (
        <div className="h-16 w-16 sm:h-18 sm:w-18 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 border border-emerald-200/60 flex items-center justify-center shrink-0 shadow-2xs">
          <MessageSquare className="h-8 w-8 text-emerald-700 stroke-[1.8]" />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex min-h-full flex-col bg-white">
      {/* Top Sticky Search Bar Container */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-zinc-100/90">
        {/* Mobile Platform Status Bar */}
        <MobileStatusBar className="md:hidden" />

        {/* Search Input Box */}
        <div className="px-4 pt-3 pb-2 md:px-6">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 h-4.5 w-4.5 text-zinc-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(4);
              }}
              placeholder="Search..."
              className="h-11 w-full rounded-full bg-zinc-100/90 pl-10 pr-10 text-sm font-medium text-zinc-900 placeholder:text-zinc-400 outline-none focus:bg-white focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-300 border border-transparent transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 flex h-6 w-6 items-center justify-center rounded-full text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200/60 transition-colors cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex w-full items-center gap-1 overflow-x-auto px-4 scrollbar-none md:px-6">
          {SEARCH_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id);
                  setVisibleCount(4);
                }}
                className={`relative shrink-0 px-4 py-2.5 text-sm font-semibold transition-colors cursor-pointer ${
                  isActive ? "text-blue-600" : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                <span>{tab.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-blue-600" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content: Today's Trending */}
      <div className="flex-1 pb-8">
        <div className="px-4 pt-4 pb-2 md:px-6">
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-900">
            {searchQuery ? "Search Results" : "Today’s Trending"}
          </h2>
        </div>

        {/* Trending Items List */}
        {displayedItems.length > 0 ? (
          <div className="divide-y divide-zinc-100/90">
            {displayedItems.map((item) => (
              <article
                key={item.id}
                className="group relative px-4 py-4 transition-colors hover:bg-zinc-50/70 md:px-6 cursor-pointer"
              >
                {/* Category Header + 3-dots Menu */}
                <div className="flex items-center justify-between text-xs text-zinc-500 font-normal">
                  <span>{item.category}</span>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveMenuId(activeMenuId === item.id ? null : item.id);
                      }}
                      className="flex h-7 w-7 items-center justify-center rounded-full text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition-colors cursor-pointer"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>

                    {activeMenuId === item.id && (
                      <>
                        <div
                          className="fixed inset-0 z-20"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveMenuId(null);
                          }}
                        />
                        <div className="absolute right-0 top-7 z-30 w-36 rounded-xl border border-zinc-200 bg-white p-1 shadow-lg text-xs font-medium text-zinc-700 animate-in fade-in zoom-in-95">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveMenuId(null);
                            }}
                            className="w-full rounded-lg px-3 py-2 text-left hover:bg-zinc-100 text-zinc-800 transition-colors cursor-pointer"
                          >
                            Not interested
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Main Row */}
                <div className="mt-1 flex items-start justify-between gap-3.5">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[15.5px] font-bold text-zinc-900 leading-snug group-hover:text-blue-600 transition-colors break-words">
                      {item.title}
                    </h3>

                    {/* Subtitle / Timestamp Details */}
                    {item.avatars ? (
                      <div className="mt-2.5 flex items-center gap-2">
                        {/* Overlapping Avatar Chips */}
                        <div className="flex -space-x-1.5 overflow-hidden">
                          {item.avatars.map((av, idx) => (
                            <div
                              key={idx}
                              className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-white bg-zinc-200 text-[9px] font-bold text-zinc-700 shadow-2xs"
                            >
                              {av}
                            </div>
                          ))}
                        </div>
                        <span className="text-xs text-zinc-500 font-normal">
                          {item.timestamp} · {item.categoryTag} · {item.postsCount}
                        </span>
                      </div>
                    ) : item.subtitle ? (
                      <p className="mt-1.5 text-xs text-zinc-500 font-normal">
                        {item.subtitle}
                      </p>
                    ) : (
                      <p className="mt-1.5 text-xs text-zinc-500 font-normal">
                        Trending now · {item.postsCount}
                      </p>
                    )}
                  </div>

                  {/* Optional Right Thumbnail Visual */}
                  {renderThumbnail(item.thumbnailType)}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center text-zinc-400">
            <Search className="mx-auto h-8 w-8 text-zinc-300 mb-2" />
            <p className="text-sm font-medium">No results found for &ldquo;{searchQuery}&rdquo;</p>
            <p className="text-xs text-zinc-400 mt-1">Try searching for topics, news, or keywords.</p>
          </div>
        )}

        {/* Show More Button */}
        {displayedItems.length < filteredItems.length && (
          <div className="mt-6 flex justify-center px-4">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + 4)}
              className="rounded-full border border-zinc-200/90 bg-white px-7 py-2 text-xs sm:text-sm font-bold text-zinc-900 shadow-2xs hover:bg-zinc-50 hover:border-zinc-300 active:scale-95 transition-all cursor-pointer"
            >
              Show more
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
