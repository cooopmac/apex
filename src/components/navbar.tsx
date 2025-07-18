"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const controlNavbar = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY < 10) {
                // Always show navbar when at the top
                setIsVisible(true);
            } else if (currentScrollY < lastScrollY) {
                // Show navbar when scrolling up
                setIsVisible(true);
            } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Hide navbar when scrolling down (after 100px)
                setIsVisible(false);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", controlNavbar);
        return () => window.removeEventListener("scroll", controlNavbar);
    }, [lastScrollY]);

    return (
        <nav
            className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-11/12 max-w-4xl transition-all duration-300 ${
                isVisible
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-full opacity-0"
            }`}
        >
            <div className="relative">
                {/* Glassmorphism container */}
                <div className="backdrop-blur-md bg-black/30 border border-white/10 rounded-2xl px-6 py-3 shadow-lg">
                    <div className="flex items-center justify-between">
                        {/* Company name */}
                        <a
                            href="/"
                            className="text-white font-medium text-lg hover:text-white/80 transition-colors duration-200 cursor-pointer"
                        >
                            ApexLRP
                        </a>

                        {/* Navigation items and login */}
                        <div className="flex items-center space-x-8">
                            <a
                                href="/submit-claim"
                                className="text-white/90 hover:text-white transition-colors duration-200 font-light"
                            >
                                Submit a Claim
                            </a>
                            <a
                                href="/register-shop"
                                className="text-white/90 hover:text-white transition-colors duration-200 font-light"
                            >
                                Register My Shop
                            </a>
                            <Button
                                size="sm"
                                className="bg-white/20 text-white hover:bg-white/30 border-white/20 px-6 py-2 rounded-xl font-medium"
                            >
                                Login
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
