"use client";

import Silk from "@/backgrounds/Silk/Silk";
import { Button } from "@/components/ui/button";
import { AnimatedShinyText } from "@/components/animated-shiny-text";
import { Footer } from "@/components/footer";
import { Feature } from "@/components/feature";
import { FAQ } from "@/components/faq";
import { Brochure } from "@/components/brochure";
import { InfiniteSlider } from "@/components/infinite-slider";
import { ProgressiveBlur } from "@/components/progressive-blur";
import { motion } from "framer-motion";

export default function Home() {
    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Silk Background */}
            <div className="fixed inset-0 -z-10">
                <Silk
                    color="#b81010"
                    speed={5}
                    scale={1}
                    noiseIntensity={1.5}
                    rotation={0}
                />
            </div>

            <div className="relative flex items-center justify-center min-h-[70vh] sm:min-h-[75vh] lg:min-h-[80vh] pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-12 lg:pb-16 px-4 z-10">
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
                            Introducing Labour Recovery Programs
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
                            We Cover Your{" "}
                            <span className="block">Warranty Labour Costs</span>
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
                        <p className="text-lg sm:text-xl md:text-2xl font-light text-white/80 mb-12 leading-relaxed max-w-3xl mx-auto">
                            Enhance your shop's efficiency with our Labour
                            Recovery Program. We cover labour costs for warranty
                            repairs up to 24 months or 40,000 km.
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
                            Join the Program
                        </Button>
                        <Button
                            variant="ghost"
                            className="text-white border border-white/30 hover:bg-white/10 hover:text-white font-light px-8 py-6 rounded-xl text-lg transition-all duration-200 hover:scale-105"
                            onClick={() =>
                                (window.location.href = "/submit-claim")
                            }
                        >
                            Submit a Claim
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
                className="w-full pt-8 sm:pt-12 lg:pt-16 pb-16 sm:pb-20 lg:pb-24"
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.8,
                        delay: 1.5,
                        ease: [0.25, 0.4, 0.25, 1],
                    }}
                    className="text-center mb-4"
                >
                    <p className="text-white/50 text-sm font-medium uppercase tracking-wider">
                        Powering the best automotive shops
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
                    className="relative py-6 md:w-[calc(100%-11rem)] mx-auto"
                >
                    <InfiniteSlider speedOnHover={0} speed={50} gap={112}>
                        <div className="flex">
                            <div className="text-white/70 text-lg font-medium whitespace-nowrap mx-auto">
                                ✓ 24 Month Coverage Period
                            </div>
                        </div>
                        <div className="flex">
                            <div className="text-white/70 text-lg font-medium whitespace-nowrap mx-auto">
                                ✓ Up to $130 Labour Rate
                            </div>
                        </div>
                        <div className="flex">
                            <div className="text-white/70 text-lg font-medium whitespace-nowrap mx-auto">
                                ✓ Quick 3-5 Day Processing
                            </div>
                        </div>
                        <div className="flex">
                            <div className="text-white/70 text-lg font-medium whitespace-nowrap mx-auto">
                                ✓ E-Transfer Payments
                            </div>
                        </div>
                        <div className="flex">
                            <div className="text-white/70 text-lg font-medium whitespace-nowrap mx-auto">
                                ✓ Designed for 10 Bays or Fewer
                            </div>
                        </div>
                        <div className="flex">
                            <div className="text-white/70 text-lg font-medium whitespace-nowrap mx-auto">
                                ✓ Labour Recovery Program
                            </div>
                        </div>
                        <div className="flex">
                            <div className="text-white/70 text-lg font-medium whitespace-nowrap mx-auto">
                                ✓ Commercial Vehicle Coverage
                            </div>
                        </div>
                        <div className="flex">
                            <div className="text-white/70 text-lg font-medium whitespace-nowrap mx-auto">
                                ✓ Warranty Repair Protection
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
