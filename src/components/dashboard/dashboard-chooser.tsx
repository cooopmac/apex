import type { UserResource } from "@clerk/types";
import AdminDashboard from "@/components/dashboard/admin-dashboard";
import UserDashboard from "@/components/dashboard/user-dashboard";

interface DashboardProps {
  user: UserResource | null;
  role: "admin" | "user" | null;
}

export default function Dashboard({ user, role }: DashboardProps) {
  if (!user || !role) {
    return <p className="p-8">Please log in to access your dashboard.</p>;
  }

  if (role === "admin") {
    return <AdminDashboard user={user} />;
  }

  if (role === "user") {
    return <UserDashboard user={user} />;
  }

  return <p className="p-8">Role not recognized.</p>;
}
