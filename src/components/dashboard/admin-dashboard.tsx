import type { UserResource } from "@clerk/types";

interface AdminDashboardProps {
  user: UserResource;
}

export default function AdminDashboard({ user }: AdminDashboardProps) {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Admin Dashboard, {user?.firstName || "Admin"}!
        </h1>
      </div>
    </div>
  );
}
