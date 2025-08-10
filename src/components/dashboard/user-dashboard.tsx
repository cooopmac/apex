import type { UserResource } from "@clerk/types";
import UserSidebar from "./ui/user-sidebar";

interface UserDashboardProps {
  user: UserResource;
  messages: any[];
}

export default function UserDashboard({ user, messages }: UserDashboardProps) {
  return (
    <UserSidebar>
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Welcome to your Dashboard, {user?.firstName || "User"}!
        </h1>
      </div>
    </div>
    </UserSidebar>
  );
}
