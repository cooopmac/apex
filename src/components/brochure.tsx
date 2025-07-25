"use client";

import { FileText, Download } from "lucide-react";
import { AnimatedShinyText } from "@/components/animated-shiny-text";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

function Brochure() {
    const { t } = useLanguage();
    return (
        <div className="w-full py-16 lg:py-24">
            <div className="container mx-auto px-6">
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                    {/* Badge */}
                    <div className="mb-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                            <AnimatedShinyText
                                className="text-sm font-light text-white/90 max-w-none mx-0 bg-gradient-to-r from-transparent via-white/80 via-50% to-transparent"
                                shimmerWidth={60}
                            >
                                {t("brochureLabel")}
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
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl md:text-4xl font-light text-white mb-4 leading-tight">
                        {t("brochureTitle")}
                    </h2>

                    {/* Description */}
                    <p className="text-lg text-white/70 mb-8 leading-relaxed">
                        {t("brochureDescription")}
                    </p>

                    {/* CTA Button */}
                    <Button
                        className="bg-white/20 text-white hover:bg-white/30 hover:text-white border-white/20 px-8 py-6 rounded-xl text-lg font-medium transition-all duration-200 hover:scale-105 flex items-center gap-3"
                        variant="outline"
                        onClick={() => {
                            // Add your brochure URL here
                            window.open("/brochure.pdf", "_blank");
                        }}
                    >
                        <FileText className="w-5 h-5" />
                        {t("brochureButton")}
                        <Download className="w-4 h-4" />
                    </Button>

                    {/* Legal Notice */}
                    <p className="text-sm text-white/50 mt-6 max-w-2xl mx-auto text-center">
                        {t("brochureLegal")}
                    </p>
                </div>
            </div>
        </div>
    );
}

export { Brochure };
