"use client";

import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function DashboardNavbar() {
    return (
        <nav className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo/Brand */}
                    <div className="flex items-center">
                        <a
                            href="/"
                            className="text-xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
                        >
                            ApexLRP
                        </a>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex items-center space-x-8">
                        <a
                            href="/dashboard"
                            className="text-gray-700 hover:text-gray-900 font-medium"
                        >
                            Dashboard
                        </a>
                        <a
                            href="/submit-claim"
                            className="text-gray-700 hover:text-gray-900 font-medium"
                        >
                            Submit Claim
                        </a>
                        <a
                            href="/register-shop"
                            className="text-gray-700 hover:text-gray-900 font-medium"
                        >
                            Register Shop
                        </a>
                        <Button
                            variant="outline"
                            onClick={() => window.location.href = "/"}
                            className="text-gray-700 hover:text-gray-900"
                        >
                            Back to Home
                        </Button>
                        <UserButton afterSignOutUrl="/" />
                    </div>
                </div>
            </div>
        </nav>
    );
}
