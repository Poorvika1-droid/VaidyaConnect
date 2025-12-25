"use client";

import Link from "next/link";
import { Home, Settings, Wrench, Bot, FileText, History } from "lucide-react";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";

const menuItems = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/emr", label: "EMR Integration", icon: FileText },
  { href: "/tools", label: "AI Tools", icon: Bot },
  { href: "/code-history", label: "Code History", icon: History },
];

export function AppSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-16 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 py-4">
        <Link
          href="#"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Logo className="h-5 w-5 transition-all group-hover:scale-110" />
          <span className="sr-only">VaidyaConnect</span>
        </Link>
        {menuItems.map((item) => (
          <SidebarMenuButton
            key={item.href}
            asChild
            variant="default"
            isActive={isActive(item.href)}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
              isActive(item.href) && "bg-accent text-accent-foreground"
            )}
            tooltip={{children: item.label, side: "right"}}
          >
            <Link href={item.href}>
              <item.icon className="h-5 w-5" />
              <span className="sr-only">{item.label}</span>
            </Link>
          </SidebarMenuButton>
        ))}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
        <SidebarMenuButton
            asChild
            variant="default"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            tooltip={{children: "Settings", side: "right"}}
        >
            <Link href="#">
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
            </Link>
        </SidebarMenuButton>
      </nav>
    </aside>
  );
}
