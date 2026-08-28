"use client";

import React from "react";
import { Plus } from "lucide-react";
import { useFeed } from "../context/feed-context";

interface FloatingCreateButtonProps {
  className?: string;
}

export function FloatingCreateButton({ className = "" }: FloatingCreateButtonProps) {
  const { openCreateModal } = useFeed();

  return (
    <button
      type="button"
      onClick={openCreateModal}
      title="Create New Post"
      aria-label="Create New Post"
      className={`flex h-13 w-13 items-center justify-center rounded-full bg-zinc-950 text-white shadow-xl hover:bg-zinc-800 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer ring-2 ring-white select-none ${className}`}
    >
      <Plus className="h-6 w-6 stroke-[2.5]" />
    </button>
  );
}
