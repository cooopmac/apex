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
import { LayoutDashboard, ClipboardList, User as UserIcon, FilePlus2, ListChecks } from "lucide-react";

type UserSidebarProps = {
  children?: React.ReactNode;
  className?: string;
};

export default function UserSidebar({ children, className }: UserSidebarProps) {
  return (
    <SidebarProvider>
      <div className={cn("flex min-h-svh w-full", className)}>
        {/* Left rail + sidebar */}
        <Sidebar collapsible="icon">
          <SidebarHeader>
            <Link
              href="/"
              className="flex items-center gap-2 group-data-[collapsible=icon]:gap-0 px-2 py-1 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:py-0"
            >
              <div className="hidden h-8 w-8 shrink-0 rounded-md bg-white/10 grid place-items-center text-sm font-semibold group-data-[collapsible=icon]:grid">
                A
              </div>
              <span className="text-lg font-semibold leading-none group-data-[collapsible=icon]:hidden">
                ApexLRP
              </span>
            </Link>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Dashboard">
                      <Link href="/dashboard">
                        <LayoutDashboard />
                        <span>Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Claims">
                      <Link href="/dashboard/claims">
                        <ListChecks />
                        <span>Claims</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Submit Claim">
                      <Link href="/dashboard/submit-claim">
                        <FilePlus2 />
                        <span>Submit Claim</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Profile">
                      <Link href="/dashboard/profile">
                        <UserIcon />
                        <span>Profile</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarSeparator />

          <SidebarFooter>
            <div className="flex items-center gap-2 px-2">
              <UserButton afterSignOutUrl="/" />
            </div>
          </SidebarFooter>

          <SidebarRail />
        </Sidebar>

        {/* Right content area with a small top bar holding the trigger */}
        <SidebarInset>
          <div className="flex h-14 items-center gap-2 border-b px-3">
            <SidebarTrigger />
            <div className="text-sm text-muted-foreground">User Dashboard</div>
          </div>
          <div className="flex-1 p-4">{children}</div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
