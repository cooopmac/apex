"use client";

import Silk from "@/backgrounds/Silk/Silk";
import { Button } from "@/components/ui/button";
import { AnimatedShinyText } from "@/components/animated-shiny-text";
import { Footer } from "@/components/footer";
import { Feature } from "@/components/feature";
import { FAQ } from "@/components/faq";
import { Brochure } from "@/components/brochure";

export default function Home() {
    return (
        <div className="min-h-screen relative">
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

            <div className="relative flex items-center justify-center min-h-[83vh] px-4">
                <div className="text-center max-w-4xl mx-auto">
                    {/* Announcement Bar */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-12">
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
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-light text-white mb-8 leading-tight tracking-tight">
                        We Cover Your{" "}
                        <span className="block">Warranty Labour Costs</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-xl md:text-2xl font-light text-white/80 mb-12 leading-relaxed max-w-3xl mx-auto">
                        Enhance your shop's efficiency with our Labour Recovery
                        Program. We cover labour costs for warranty repairs up
                        to 24 months or 40,000 km.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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
                    </div>
                </div>
            </div>

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
