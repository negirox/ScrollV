"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Compass,
  PlusSquare,
  User,
  LogIn,
  Clapperboard,
} from "lucide-react";
import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const menuItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/discover", label: "Discover", icon: Compass },
  { href: "/upload", label: "Upload", icon: PlusSquare },
  { href: "/profile", label: "Profile", icon: User },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2">
          <Clapperboard className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-bold font-headline text-primary">ScrollVerse</h1>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.label}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <Separator className="my-2" />
        <div className="p-2 flex flex-col gap-2">
          <Link href="/profile" className="flex items-center gap-3 p-2 rounded-md hover:bg-sidebar-accent">
            <Avatar className="h-10 w-10">
              <AvatarImage src="https://placehold.co/100x100" alt="@shadcn" />
              <AvatarFallback>SV</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-semibold text-sidebar-foreground">
                Demo User
              </span>
              <span className="text-xs text-muted-foreground">
                @demouser
              </span>
            </div>
          </Link>
          <SidebarMenuButton asChild>
             <Link href="/login">
                <LogIn/>
                <span>Login</span>
            </Link>
          </SidebarMenuButton>
        </div>
      </SidebarFooter>
    </>
  );
}
