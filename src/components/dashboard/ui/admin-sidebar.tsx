"use client";

import * as React from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarSeparator,
  SidebarTrigger,
  SidebarRail,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ClipboardList,
  Store,
  Users,
  Settings,
} from "lucide-react";

type AdminSidebarProps = {
  children?: React.ReactNode;
  className?: string;
};

export default function AdminSidebar({ children, className }: AdminSidebarProps) {
  return (
    <SidebarProvider>
      <div className={cn("flex min-h-svh w-full", className)}>
        {/* Left rail + sidebar */}
        <Sidebar collapsible="icon">
          <SidebarHeader>
            <Link
              href="/dashboard/admin"
              className="flex items-center gap-2 group-data-[collapsible=icon]:gap-0 px-2 py-1 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:py-0"
            >
              <div className="hidden h-8 w-8 shrink-0 rounded-md bg-white/10 grid place-items-center text-sm font-semibold group-data-[collapsible=icon]:grid">
                A
              </div>
              <span className="text-lg font-semibold leading-none group-data-[collapsible=icon]:hidden">
                ApexLRP Admin
              </span>
            </Link>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Admin Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Overview">
                      <Link href="/dashboard/admin">
                        <LayoutDashboard />
                        <span>Overview</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Claims Queue">
                      <Link href="/dashboard/admin/claims">
                        <ClipboardList />
                        <span>Claims Queue</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Registered Shops">
                      <Link href="/dashboard/admin/shops">
                        <Store />
                        <span>Registered Shops</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Users">
                      <Link href="/dashboard/admin/users">
                        <Users />
                        <span>Users</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarSeparator />

          <SidebarFooter>
            <div className="flex items-center justify-between gap-2 px-2">
              <Link href="/settings" className="flex items-center gap-2 text-sm">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </div>
          </SidebarFooter>

          <SidebarRail />
        </Sidebar>

        {/* Right content area with a small top bar holding the trigger */}
        <SidebarInset>
          <div className="flex h-14 items-center gap-2 border-b px-3">
            <SidebarTrigger />
            <div className="text-sm text-muted-foreground">Admin Dashboard</div>
          </div>
          <div className="flex-1 p-4">{children}</div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
