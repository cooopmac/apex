"use client";

import * as React from "react";
import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import UserSidebar from "@/components/dashboard/ui/user-sidebar";
import AdminSidebar from "@/components/dashboard/ui/admin-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const role = useQuery(api.users.getRole);

  if (role === undefined) return <div className="p-6">Loading…</div>;
  if (role === "admin") return <AdminSidebar>{children}</AdminSidebar>;
  return <UserSidebar>{children}</UserSidebar>;
}
