import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <AppShell>
      <div className="flex flex-col items-start gap-4 py-16">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Sage Community
        </h1>
        <p className="max-w-md text-slate-600">
          Find the right person to ask — without the awkward first step.
        </p>
        <Link href="/explore">
          <Button>Get started</Button>
        </Link>
      </div>
    </AppShell>
  );
}
