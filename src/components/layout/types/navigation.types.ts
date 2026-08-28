import type { LucideIcon } from "lucide-react";

export interface NavigationTabItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: number | string | boolean;
  matchPattern?: RegExp | string[];
}

export interface BottomNavProps {
  items?: NavigationTabItem[];
  activeId?: string;
  onChangeTab?: (tabId: string, href: string) => void;
  className?: string;
  showHomeIndicator?: boolean;
  hideOnScroll?: boolean;
}
