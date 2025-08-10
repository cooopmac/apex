"use client";

import { Authenticated, Unauthenticated } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import DashboardNavbar from "@/components/dashboard/navbar";

export default function Dashboard() {
    return (
        <>
            <Authenticated>
                <DashboardNavbar />
                <DashboardContent />
            </Authenticated>
            <Unauthenticated>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
                        <p className="text-gray-600">Please sign in to access the dashboard.</p>
                    </div>
                </div>
            </Unauthenticated>
        </>
    );
}

function DashboardContent() {
    const { user } = useUser();
    const messages = useQuery(api.messages?.getForCurrentUser);

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                    Welcome to your Dashboard, {user?.firstName}!
                </h1>
                
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Account Information</h2>
                    <p className="text-gray-600">Email: {user?.emailAddresses[0]?.emailAddress}</p>
                    <p className="text-gray-600">User ID: {user?.id}</p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">Your Messages</h2>
                    <p className="text-gray-600">
                        You have {messages?.length || 0} messages
                    </p>
                </div>
            </div>
        </div>
    );
}
