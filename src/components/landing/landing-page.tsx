"use client";

import { motion } from "framer-motion";

import Silk from "@/backgrounds/Silk/Silk";
import { AnimatedShinyText } from "@/components/landing/animated-shiny-text";
import { Brochure } from "@/components/landing/brochure";
import { FAQ } from "@/components/landing/faq";
import { Feature } from "@/components/landing/feature";
import { Footer } from "@/components/landing/footer";
import { InfiniteSlider } from "@/components/landing/infinite-slider";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import LandingNavbar from "@/components/landing/navbar";
import { LanguageToggle } from "@/components/landing/language-toggle";

export function LandingPage() {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Navigation */}
            <LandingNavbar />
            
            {/* Language Toggle - Fixed in top right corner */}
            <div className="fixed top-6 right-6 z-50">
                <LanguageToggle />
            </div>
            
            {/* Silk Background */}
            <div className="fixed inset-0 -z-10">
                <Silk
                    color="#2a7afa"
                    speed={5}
                    scale={1}
                    noiseIntensity={1.5}
                    rotation={0}
                />
            </div>

            <div className="relative flex items-center justify-center min-h-[60vh] sm:min-h-[65vh] lg:min-h-[70vh] pt-24 sm:pt-28 lg:pt-32 pb-6 sm:pb-8 lg:pb-10 px-4 z-10">
                <div className="text-center max-w-4xl mx-auto">
                    {/* Announcement Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 1,
                            delay: 0.5,
                            ease: [0.25, 0.4, 0.25, 1],
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6"
                    >
                        <AnimatedShinyText
                            className="text-sm font-light text-white/90 max-w-none mx-0 bg-gradient-to-r from-transparent via-white/80 via-50% to-transparent"
                            shimmerWidth={60}
                        >
                            {t("announcementBar")}
                        </AnimatedShinyText>
                        <svg
                            className="w-4 h-4 text-white/60"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </motion.div>

                    {/* Main Heading */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 1,
                            delay: 0.7,
                            ease: [0.25, 0.4, 0.25, 1],
                        }}
                    >
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white mb-8 leading-tight tracking-tight">
                            {t("heroTitle")}{" "}
                            <span className="block">
                                {t("heroTitleSecondLine")}
                            </span>
                        </h1>
                    </motion.div>

                    {/* Subtitle */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 1,
                            delay: 0.9,
                            ease: [0.25, 0.4, 0.25, 1],
                        }}
                    >
                        <p className="text-lg sm:text-xl md:text-2xl font-light text-white/80 mb-8 leading-relaxed max-w-3xl mx-auto">
                            {t("heroSubtitle")}
                        </p>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 1,
                            delay: 1.1,
                            ease: [0.25, 0.4, 0.25, 1],
                        }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <Button
                            className="bg-white text-black hover:bg-white/90 font-medium px-8 py-6 rounded-xl text-lg transition-all duration-200 hover:scale-105"
                            onClick={() =>
                                (window.location.href = "/register-shop")
                            }
                        >
                            {t("joinProgram")}
                        </Button>
                        <Button
                            variant="ghost"
                            className="text-white border border-white/30 hover:bg-white/10 hover:text-white font-light px-8 py-6 rounded-xl text-lg transition-all duration-200 hover:scale-105"
                            onClick={() =>
                                (window.location.href = "/submit-claim")
                            }
                        >
                            {t("submitClaimButton")}
                        </Button>
                    </motion.div>
                </div>
            </div>

            {/* Infinite Slider Section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 1,
                    delay: 1.3,
                    ease: [0.25, 0.4, 0.25, 1],
                }}
                className="w-full pt-4 sm:pt-6 lg:pt-8 pb-8 sm:pb-12 lg:pb-16"
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.8,
                        delay: 1.5,
                        ease: [0.25, 0.4, 0.25, 1],
                    }}
                    className="text-center mb-3"
                >
                    <p className="text-white/50 text-sm font-medium uppercase tracking-wider">
                        {t("sliderTitle")}
                    </p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.8,
                        delay: 1.7,
                        ease: [0.25, 0.4, 0.25, 1],
                    }}
                    className="relative py-4 md:w-[calc(100%-11rem)] mx-auto"
                >
                    <InfiniteSlider speedOnHover={0} speed={50} gap={112}>
                        <div className="flex">
                            <div className="text-white/70 text-lg font-medium whitespace-nowrap mx-auto">
                                {t("benefits.coverage")}
                            </div>
                        </div>
                        <div className="flex">
                            <div className="text-white/70 text-lg font-medium whitespace-nowrap mx-auto">
                                {t("benefits.labourRate")}
                            </div>
                        </div>
                        <div className="flex">
                            <div className="text-white/70 text-lg font-medium whitespace-nowrap mx-auto">
                                {t("benefits.processing")}
                            </div>
                        </div>
                        <div className="flex">
                            <div className="text-white/70 text-lg font-medium whitespace-nowrap mx-auto">
                                {t("benefits.payments")}
                            </div>
                        </div>
                        <div className="flex">
                            <div className="text-white/70 text-lg font-medium whitespace-nowrap mx-auto">
                                {t("benefits.baySize")}
                            </div>
                        </div>
                        <div className="flex">
                            <div className="text-white/70 text-lg font-medium whitespace-nowrap mx-auto">
                                {t("benefits.program")}
                            </div>
                        </div>
                        <div className="flex">
                            <div className="text-white/70 text-lg font-medium whitespace-nowrap mx-auto">
                                {t("benefits.commercial")}
                            </div>
                        </div>
                        <div className="flex">
                            <div className="text-white/70 text-lg font-medium whitespace-nowrap mx-auto">
                                {t("benefits.warranty")}
                            </div>
                        </div>
                    </InfiniteSlider>
                </motion.div>
            </motion.div>

            {/* Features & FAQ Section */}
            <div className="w-full bg-black/10 backdrop-blur-sm">
                <Feature />
                <FAQ />
            </div>

            {/* Brochure Section */}
            <Brochure />

            {/* Footer */}
            <Footer />
        </div>
    );
}
