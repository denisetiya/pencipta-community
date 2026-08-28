import Link from "next/link";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";
import { Home, Bot, Compass, TrendingUp, User } from "lucide-react";

const items = [
  { href: "/", label: "Home", icon: Home },
  { href: "/assistant", label: "AI Assistant", icon: Bot },
  { href: "/explore", label: "Explore", icon: Compass },
  { href: "/trends", label: "Trends", icon: TrendingUp },
  { href: "/profile", label: "Profile", icon: User },
];

export function Sidebar() {
  return (
    <aside className="hidden h-screen w-64 flex-col border-r border-zinc-200/80 px-4 py-6 md:flex bg-white">
      <Link href="/" className="mb-8 flex items-center gap-2.5 px-2">
        <Logo size="sm" />
        <span className="text-lg font-bold tracking-tight text-zinc-900">
          pencipta-comunity
        </span>
      </Link>

      <nav className="flex flex-col gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[15px] font-medium text-zinc-600 transition-colors hover:bg-zinc-100/80 hover:text-zinc-900"
              )}
            >
              <Icon className="h-4.5 w-4.5 shrink-0 text-zinc-500" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
