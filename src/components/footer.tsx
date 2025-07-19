"use client";
import React from "react";
import type { ComponentProps, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
    FacebookIcon,
    FrameIcon,
    InstagramIcon,
    LinkedinIcon,
    YoutubeIcon,
} from "lucide-react";

interface FooterLink {
    title: string;
    href: string;
    icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
    label: string;
    links: FooterLink[];
}

const footerLinks: FooterSection[] = [
    {
        label: "Program",
        links: [
            { title: "Join the Program", href: "/register-shop" },
            { title: "Submit a Claim", href: "/submit-claim" },
            { title: "Program Features", href: "#features" },
            { title: "Coverage Details", href: "#coverage" },
        ],
    },
    {
        label: "Support",
        links: [
            { title: "FAQs", href: "#faq" },
            { title: "Contact Riley", href: "tel:647-914-1222" },
            { title: "Questions & Answers", href: "#faq" },
            { title: "Help Center", href: "#faq" },
        ],
    },
    {
        label: "Legal",
        links: [
            { title: "Program Brochure", href: "/brochure.pdf" },
            { title: "Terms & Conditions", href: "/brochure.pdf" },
            { title: "Privacy Policy", href: "/brochure.pdf" },
            { title: "Coverage Policy", href: "/brochure.pdf" },
        ],
    },
    {
        label: "Connect",
        links: [
            { title: "Facebook", href: "#", icon: FacebookIcon },
            { title: "Instagram", href: "#", icon: InstagramIcon },
            { title: "LinkedIn", href: "#", icon: LinkedinIcon },
            { title: "YouTube", href: "#", icon: YoutubeIcon },
        ],
    },
];

export function Footer() {
    return (
        <footer className="relative w-full bg-black/20 backdrop-blur-md border-t border-white/10 px-6 py-12 lg:py-16">
            <div className="bg-white/10 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur" />

            <div className="max-w-6xl mx-auto grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
                <AnimatedContainer className="space-y-4">
                    <h1 className="text-white text-2xl font-bold">ApexLRP</h1>
                    <p className="text-white/70 mt-8 text-sm md:mt-0">
                        © {new Date().getFullYear()} ApexLRP. All rights
                        reserved.
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
