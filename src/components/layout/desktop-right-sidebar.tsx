"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, TrendingUp, UserPlus, Check, ArrowRight, Bot } from "lucide-react";
import { useAssistant } from "@/components/assistant/context/assistant-context";

export function DesktopRightSidebar() {
  const { toggleAssistant } = useAssistant();
  const [connectedIds, setConnectedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const trendingList = [
    { tag: "#DataStructures", category: "Computer Science", posts: "1.2k posts" },
    { tag: "#Fundraising", category: "Startups & VC", posts: "840 posts" },
    { tag: "#React19", category: "Web Development", posts: "2.4k posts" },
    { tag: "#AIProductDesign", category: "Product & UX", posts: "950 posts" },
    { tag: "#SystemDesign", category: "Engineering", posts: "1.7k posts" },
  ];

  const suggestedMentors = [
    {
      id: "m1",
      name: "KodingBre",
      role: "Startup Founder",
      experience: "8 YOE · Raised 2 Rounds",
      initials: "KB",
    },
    {
      id: "m2",
      name: "Alya Safitri",
      role: "Product Designer",
      experience: "3 YOE · Design Systems",
      initials: "AS",
    },
    {
      id: "m3",
      name: "Klinik Koding",
      role: "Data Science Lead",
      experience: "5 YOE · Machine Learning",
      initials: "KK",
    },
  ];

  const handleConnectToggle = (id: string) => {
    setConnectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <aside className="sticky top-0 hidden h-screen w-80 lg:w-88 xl:w-96 flex-col gap-4 overflow-y-auto border-l border-zinc-200/80 bg-zinc-50/40 p-5 lg:flex shrink-0 select-none">
      {/* Search Input Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
        <input
          type="text"
          placeholder="Search topics, mentors, posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-2xl border border-zinc-200/90 bg-white py-2.5 pl-10 pr-4 text-xs font-medium text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950 transition-all shadow-2xs"
        />
      </div>

      {/* AI Knowledge Network Card */}
      <div className="rounded-3xl border border-cyan-100 bg-gradient-to-br from-cyan-50/80 via-white to-sky-50/50 p-5 shadow-xs">
        <div className="flex items-center gap-2 text-cyan-800 text-xs font-bold tracking-tight">
          <Bot className="h-4 w-4 text-cyan-600" />
          <span>AI MENTOR ASSISTANT</span>
        </div>
        <p className="mt-1.5 text-xs font-bold text-zinc-900 leading-snug">
          Need guidance or verified answers from the community?
        </p>
        <p className="mt-1 text-[11px] text-zinc-500 leading-relaxed">
          Ask in plain language to get matched with experienced mentors or generate context-rich icebreakers.
        </p>
        <button
          type="button"
          onClick={toggleAssistant}
          className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl bg-zinc-950 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          <span>Ask AI Assistant</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Suggested Mentors / Who to Connect */}
      <div className="rounded-3xl border border-zinc-200/80 bg-white p-4.5 shadow-2xs">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-800">
            Suggested Mentors
          </h2>
          <Link
            href="/search"
            className="text-[11px] font-semibold text-cyan-700 hover:underline"
          >
            See all
          </Link>
        </div>

        <div className="divide-y divide-zinc-100">
          {suggestedMentors.map((mentor) => {
            const isConnected = connectedIds.includes(mentor.id);
            return (
              <div
                key={mentor.id}
                className="flex items-center justify-between py-2.5 gap-2"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-xs font-bold text-zinc-800 shadow-2xs">
                    {mentor.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold text-zinc-900 leading-tight">
                      {mentor.name}
                    </p>
                    <p className="truncate text-[11px] text-zinc-500">{mentor.role}</p>
                    <p className="truncate text-[10px] text-zinc-400">{mentor.experience}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleConnectToggle(mentor.id)}
                  className={`flex h-7 shrink-0 items-center gap-1 rounded-full px-3 text-[11px] font-bold transition-all cursor-pointer ${
                    isConnected
                      ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                      : "bg-zinc-950 text-white hover:bg-zinc-800 active:scale-95"
                  }`}
                >
                  {isConnected ? (
                    <>
                      <Check className="h-3 w-3" />
                      <span>Sent</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-3 w-3" />
                      <span>Connect</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Trending Topics Widget */}
      <div className="rounded-3xl border border-zinc-200/80 bg-white p-4.5 shadow-2xs">
        <div className="flex items-center gap-1.5 mb-3">
          <TrendingUp className="h-3.5 w-3.5 text-zinc-700" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-800">
            Trends in Knowledge
          </h2>
        </div>

        <div className="space-y-2">
          {trendingList.map((item) => (
            <Link
              key={item.tag}
              href={`/search?q=${encodeURIComponent(item.tag)}`}
              className="block rounded-xl p-2 hover:bg-zinc-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-900">{item.tag}</span>
                <span className="text-[10px] font-medium text-zinc-400">{item.posts}</span>
              </div>
              <p className="text-[10px] text-zinc-500 mt-0.5">{item.category}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <div className="px-2 pt-1 text-[11px] text-zinc-400 leading-relaxed">
        <p>© 2026 pencipta-comunity · AI Knowledge Network</p>
        <div className="flex gap-2 mt-1">
          <Link href="/terms" className="hover:underline">Terms</Link>
          <span>·</span>
          <Link href="/privacy" className="hover:underline">Privacy</Link>
          <span>·</span>
          <Link href="/about" className="hover:underline">About</Link>
        </div>
      </div>
    </aside>
  );
}
