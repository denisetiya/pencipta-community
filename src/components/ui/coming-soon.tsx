import React from "react";
import Link from "next/link";
import { LucideIcon, Layers, ArrowLeft } from "lucide-react";

interface ComingSoonProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  badge?: string;
}

export function ComingSoon({
  title,
  description = "This feature is currently under active development and will be available in an upcoming release.",
  icon: Icon = Layers,
  badge = "Coming Soon",
}: ComingSoonProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-8 py-24 text-center select-none">
      <div className="relative mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-zinc-100/80 shadow-xs border border-zinc-200/60">
        <Icon className="h-9 w-9 text-zinc-700 stroke-[1.8]" />
      </div>

      <span className="inline-block rounded-full bg-zinc-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2">
        {badge}
      </span>

      <h1 className="text-xl font-bold tracking-tight text-zinc-900 md:text-2xl">
        {title}
      </h1>

      <p className="mt-2 max-w-sm text-sm text-zinc-500 leading-relaxed font-normal">
        {description}
      </p>

      <div className="mt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-2xl bg-zinc-950 px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-zinc-800 active:scale-95 transition-all"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
}
