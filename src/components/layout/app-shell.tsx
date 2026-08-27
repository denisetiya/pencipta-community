"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { useViewport } from "@/context/viewport-context";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { isMobile } = useViewport();

  return (
    <div className="flex min-h-screen bg-slate-50">
      {!isMobile && <Sidebar />}
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-6">{children}</main>
    </div>
  );
}
