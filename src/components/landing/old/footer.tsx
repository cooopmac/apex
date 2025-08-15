"use client";
import React from "react";
import type { ComponentProps, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
    FacebookIcon,
    InstagramIcon,
    LinkedinIcon,
    YoutubeIcon,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface FooterLink {
    title: string;
    href: string;
    icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
    label: string;
    links: FooterLink[];
}

export function Footer() {
    const { t } = useLanguage();

    const footerLinks: FooterSection[] = [
        {
            label: t("footerProgram"),
            links: [
                { title: t("footerProgramJoin"), href: "/register-shop" },
                { title: t("footerProgramSubmit"), href: "/submit-claim" },
                { title: t("footerProgramFeatures"), href: "#features" },
                { title: t("footerProgramCoverage"), href: "#coverage" },
            ],
        },
        {
            label: t("footerSupport"),
            links: [
                { title: t("footerSupportFAQ"), href: "#faq" },
                { title: t("footerSupportContact"), href: "tel:647-914-1222" },
                { title: t("footerSupportQuestions"), href: "#faq" },
                { title: t("footerSupportHelp"), href: "#faq" },
            ],
        },
        {
            label: t("footerLegal"),
            links: [
                { title: t("footerLegalBrochure"), href: "/brochure.pdf" },
                { title: t("footerLegalTerms"), href: "/brochure.pdf" },
                { title: t("footerLegalPrivacy"), href: "/brochure.pdf" },
                { title: t("footerLegalCoverage"), href: "/brochure.pdf" },
            ],
        },
        {
            label: t("footerConnect"),
            links: [
                {
                    title: t("footerConnectFacebook"),
                    href: "#",
                    icon: FacebookIcon,
                },
                {
                    title: t("footerConnectInstagram"),
                    href: "#",
                    icon: InstagramIcon,
                },
                {
                    title: t("footerConnectLinkedIn"),
                    href: "#",
                    icon: LinkedinIcon,
                },
                {
                    title: t("footerConnectYouTube"),
                    href: "#",
                    icon: YoutubeIcon,
                },
            ],
        },
    ];
    return (
        <footer className="relative w-full bg-black/20 backdrop-blur-md border-t border-white/10 px-6 py-12 lg:py-16">
            <div className="bg-white/10 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur" />

            <div className="max-w-6xl mx-auto grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
                <AnimatedContainer className="space-y-4">
                    <h1 className="text-white text-2xl font-bold">
                        {t("companyName")}
                    </h1>
                    <p className="text-white/70 mt-8 text-sm md:mt-0">
                        {t("footerCopyright").replace(
                            "2024",
                            new Date().getFullYear().toString()
                        )}
                    </p>
                </AnimatedContainer>

                <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2 xl:mt-0">
                    {footerLinks.map((section, index) => (
                        <AnimatedContainer
                            key={section.label}
                            delay={0.1 + index * 0.1}
                        >
                            <div className="mb-10 md:mb-0">
                                <h3 className="text-sm font-medium text-white mb-4">
                                    {section.label}
                                </h3>
                                <ul className="text-white/70 space-y-2 text-sm">
                                    {section.links.map((link) => (
                                        <li key={link.title}>
                                            <a
                                                href={link.href}
                                                className="hover:text-white inline-flex items-center transition-all duration-300"
                                            >
                                                {link.icon && (
                                                    <link.icon className="me-2 size-4" />
                                                )}
                                                {link.title}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </AnimatedContainer>
                    ))}
                </div>
            </div>
        </footer>
    );
}

type ViewAnimationProps = {
    delay?: number;
    className?: ComponentProps<typeof motion.div>["className"];
    children: ReactNode;
};

function AnimatedContainer({
    className,
    delay = 0.1,
    children,
}: ViewAnimationProps) {
    const shouldReduceMotion = useReducedMotion();

    if (shouldReduceMotion) {
        return children;
    }

    return (
        <motion.div
            initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
            whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.8 }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
