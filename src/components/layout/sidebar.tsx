import Link from "next/link";
import { cn } from "@/lib/utils";

const items = [
  { href: "/", label: "Home", icon: "⌂" },
  { href: "/explore", label: "Explore", icon: "⌕" },
  { href: "/trends", label: "Trends", icon: "#" },
  { href: "/profile", label: "Profile", icon: "☺" },
  { href: "/ask", label: "Ask", icon: "?" },
];

export function Sidebar() {
  return (
    <aside className="hidden h-screen w-64 flex-col border-r border-slate-200 px-4 py-6 md:flex">
      <Link href="/" className="mb-8 flex items-center gap-2 px-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-lg font-bold text-white">
          S
        </span>
        <span className="text-lg font-bold tracking-tight text-slate-900">
          pencipta community
        </span>
      </Link>

      <nav className="flex flex-col gap-1">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-full px-4 py-2.5 text-[15px] font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
            )}
          >
            <span className="w-5 text-center">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
