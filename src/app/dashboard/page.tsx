"use client";

import { Authenticated, Unauthenticated } from "convex/react";
import { useUser } from "@clerk/nextjs";

export default function DashboardPage() {
  return (
    <>
      <Authenticated>
        <WelcomePanel />
      </Authenticated>
      <Unauthenticated>
        <AccessDenied />
      </Unauthenticated>
    </>
  );
}

function WelcomePanel() {
  const { user } = useUser();
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome to your Dashboard, {user?.firstName}!</h1>
      <p className="text-muted-foreground">Use the navigation to access sections like Submit Claim or Register Shop.</p>
    </div>
  );
}

function AccessDenied() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p className="text-gray-600">Please sign in to access the dashboard.</p>
      </div>
    </div>
  );
}
