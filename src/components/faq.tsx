"use client";

import { PhoneCall } from "lucide-react";
import { AnimatedShinyText } from "@/components/animated-shiny-text";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

function FAQ() {
    const { t } = useLanguage();

    return (
        <div id="faq" className="w-full pt-0 pb-20 lg:pt-0 lg:pb-40">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-10">
                    <div className="flex gap-10 flex-col">
                        <div className="flex gap-4 flex-col">
                            <div>
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                                    <AnimatedShinyText
                                        className="text-sm font-light text-white/90 max-w-none mx-0 bg-gradient-to-r from-transparent via-white/80 via-50% to-transparent"
                                        shimmerWidth={60}
                                    >
                                        FAQ
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
                            <div className="flex gap-2 flex-col">
                                <h4 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-left font-regular text-white">
                                    {t("faqTitle")}
                                </h4>
                                <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-white/70 text-left">
                                    {t("faqSubtitle")}
                                </p>
                            </div>
                            <div className="">
                                <Button
                                    className="gap-4 bg-white/20 text-white hover:bg-white/30 hover:text-white border-white/20 px-6 py-2 rounded-xl font-medium"
                                    variant="outline"
                                >
                                    {t("contactSupport")}{" "}
                                    <PhoneCall className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                    <Accordion type="single" collapsible className="w-full">
                        {t("faqs").map((faq: any, index: number) => (
                            <AccordionItem key={index} value={"index-" + index}>
                                <AccordionTrigger>
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent>
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </div>
    );
}

export { FAQ };
