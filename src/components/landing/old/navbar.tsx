"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Authenticated, Unauthenticated } from "convex/react";
import { SignInButton, UserButton } from "@clerk/nextjs";

export default function LandingNavbar() {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { t } = useLanguage();

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

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after clicking
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <nav
            className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-40 w-11/12 max-w-4xl transition-all duration-300 ${
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

                        {/* Navigation tabs */}
                        <div className="hidden md:flex items-center space-x-6">
                            <button
                                onClick={() => scrollToSection('hero')}
                                className="text-white/80 hover:text-white transition-colors duration-200 font-light text-sm"
                            >
                                {t("Home")}
                            </button>
                            <button
                                onClick={() => scrollToSection('features')}
                                className="text-white/80 hover:text-white transition-colors duration-200 font-light text-sm"
                            >
                                {t("Features")}
                            </button>
                            <button
                                onClick={() => scrollToSection('faq')}
                                className="text-white/80 hover:text-white transition-colors duration-200 font-light text-sm"
                            >
                                {t("FAQ")}
                            </button>
                            <button
                                onClick={() => scrollToSection('brochure')}
                                className="text-white/80 hover:text-white transition-colors duration-200 font-light text-sm"
                            >
                                {t("Brochure")}
                            </button>
                        </div>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden text-white/80 hover:text-white transition-colors duration-200"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                {isMobileMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>

                        {/* Navigation items and login */}
                        <div className="flex items-center space-x-8">
                            <Authenticated>
                                <a
                                    href="/dashboard"
                                    className="text-white/90 hover:text-white transition-colors duration-200 font-light"
                                >
                                    Dashboard
                                </a>
                            </Authenticated>
                            <Authenticated>
                                <UserButton afterSignOutUrl="/" />
                            </Authenticated>
                            <Unauthenticated>
                                <SignInButton forceRedirectUrl="/dashboard">
                                    <Button
                                        size="sm"
                                        className="bg-white/20 text-white hover:bg-white/30 border-white/20 px-6 py-2 rounded-xl font-medium"
                                    >
                                        {t("login")}
                                    </Button>
                                </SignInButton>
                            </Unauthenticated>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 mt-2">
                    <div className="backdrop-blur-md bg-black/30 border border-white/10 rounded-2xl px-6 py-4 shadow-lg">
                        <div className="flex flex-col space-y-4">
                            <button
                                onClick={() => scrollToSection('hero')}
                                className="text-white/80 hover:text-white transition-colors duration-200 font-light text-left py-2"
                            >
                                {t("nav.home") || "Home"}
                            </button>
                            <button
                                onClick={() => scrollToSection('features')}
                                className="text-white/80 hover:text-white transition-colors duration-200 font-light text-left py-2"
                            >
                                {t("nav.features") || "Features"}
                            </button>
                            <button
                                onClick={() => scrollToSection('faq')}
                                className="text-white/80 hover:text-white transition-colors duration-200 font-light text-left py-2"
                            >
                                {t("nav.faq") || "FAQ"}
                            </button>
                            <button
                                onClick={() => scrollToSection('brochure')}
                                className="text-white/80 hover:text-white transition-colors duration-200 font-light text-left py-2"
                            >
                                {t("nav.brochure") || "Brochure"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}