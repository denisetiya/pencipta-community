import { Logo } from "@/components/ui/logo";

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
        <Link href="/login">
          <Button>Get started</Button>
        </Link>
      </div>
    </AppShell>
    <main className="flex min-h-screen w-full items-center justify-center bg-white">
      <Logo size="lg" />
    </main>
  );
}
