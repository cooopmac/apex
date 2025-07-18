import { PhoneCall } from "lucide-react";
import { AnimatedShinyText } from "@/components/animated-shiny-text";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const faqs = [
    {
        question:
            "What is ApexLRP, and how will it impact my shop's operations?",
        answer: "ApexLRP offers Labour Recovery Programs (LRP) that enhance your shop's efficiency by covering the labour costs for warranty repairs. If a car owner returns to your facility within the warranty period for a repair you originally completed, SolutionsLRP covers the labor for the warranty repair. This applies as long as your shop did the initial repair. For most vehicles, labor is covered for up to 24 months or 40,000 km. For commercial vehicles up to the 2500 series (excluding Sprinters), the coverage extends to 12 months or 10,000 km.",
    },
    {
        question: "What is the labour payout rate for my business?",
        answer: "You will receive up to $130.00 for labour if you bought the parts for the original repair and warranty from a Bestbuy Distributor Part Store. If the parts came from another source, the labour rate will be $75.00, based on Mitchell guidelines. When submitting a claim, you must provide proof of where the parts were purchased.",
    },
    {
        question: "Are parts covered under warranty?",
        answer: "No, parts are not covered; that is the responsibility of the parts supplier, we cover the labour for the repair.",
    },
    {
        question: "What's needed to process a Claim?",
        answer: "Original repair invoice, A new warranty repair invoice, Invoice for parts purchased and installed during the original repair, Invoice for parts installed during the warranty repair",
    },
    {
        question: "How do I make a claim and send the required information?",
        answer: "To make a claim click here. You will need to fill out the online form and attach the four required documents.",
    },
    {
        question: "How quickly are claims processed?",
        answer: "Please expect three to five business days for processing of claims. Missing or incorrect information may result in delays.",
    },
    {
        question: "How do I receive payment of my Labour Claim?",
        answer: "Payments will be sent via e-Transfer within 2 business days after you approve the final claim settlement.",
    },
    {
        question: "What should I do if I do not receive the e-Transfer?",
        answer: "If you do not receive the e-Transfer, first check your spam folder. If it's not there, contact Riley 647-914-1222 for assistance.",
    },
    {
        question: "Is SolutionsLRP suitable for shops of all sizes?",
        answer: "Whether you run a small shop or a large repair facility, the labour recovery program will benefit you. It is designed for shops with 10 bays or fewer.",
    },
];

function FAQ() {
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
                                    Frequently Asked Questions
                                </h4>
                                <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-white/70 text-left">
                                    Find answers to common questions about our
                                    Labour Recovery Program. Get clarity on
                                    coverage, claims, and how to maximize your
                                    shop's benefits.
                                </p>
                            </div>
                            <div className="">
                                <Button
                                    className="gap-4 bg-white/20 text-white hover:bg-white/30 hover:text-white border-white/20 px-6 py-2 rounded-xl font-medium"
                                    variant="outline"
                                >
                                    Any questions? Reach out{" "}
                                    <PhoneCall className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
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
