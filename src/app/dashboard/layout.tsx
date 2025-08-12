"use client";

import * as React from "react";
import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import UserSidebar from "@/components/dashboard/ui/user-sidebar";
import AdminSidebar from "@/components/dashboard/ui/admin-sidebar";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const role = useQuery(api.users.getRole);
  const shop = useQuery(api.shops.getForCurrentUser);
  const router = useRouter();

  React.useEffect(() => {
    if (role === undefined) return;
    if (role === "admin") return; // admins skip onboarding
    if (role === null) return; // unauthenticated handled by middleware
    if (role === "user" && shop === null) {
      router.replace("/dashboard/onboarding");
    }
  }, [role, shop, router]);

  const isLoading = role === undefined || (role === "user" && shop === undefined);
  if (isLoading) return <div className="p-6">Loading…</div>;

  if (role === "admin") return <AdminSidebar>{children}</AdminSidebar>;

  const needsOnboarding = role === "user" && shop === null;
  if (needsOnboarding) {
    // While onboarding, render page content without the user sidebar
    return <>{children}</>;
  }

  return <UserSidebar>{children}</UserSidebar>;
}
