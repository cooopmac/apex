import { Shield, Clock, FileCheck, TrendingUp } from "lucide-react";
import { AnimatedShinyText } from "@/components/animated-shiny-text";

function Feature() {
    return (
        <div id="features" className="w-full pt-2 pb-20 lg:pt-8 lg:pb-40">
            <div className="container mx-auto px-6">
                <div className="flex flex-col gap-10">
                    <div className="flex gap-4 flex-col items-start">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                                <AnimatedShinyText
                                    className="text-sm font-light text-white/90 max-w-none mx-0 bg-gradient-to-r from-transparent via-white/80 via-50% to-transparent"
                                    shimmerWidth={60}
                                >
                                    Labour Recovery Program
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
                            <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular text-left text-white">
                                Why Choose Our Labour Recovery Program?
                            </h2>
                            <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-white/70 text-left">
                                Enhance your shop's efficiency and reduce
                                warranty repair costs with comprehensive labour
                                coverage.
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-md h-full lg:col-span-2 p-6 aspect-square lg:aspect-auto flex justify-between flex-col">
                            <Shield className="w-8 h-8 stroke-1 text-white" />
                            <div className="flex flex-col">
                                <h3 className="text-xl tracking-tight text-white">
                                    Complete Labour Cost Coverage
                                </h3>
                                <p className="text-white/70 max-w-xs text-base">
                                    We cover all labour costs for warranty
                                    repairs when customers return to your shop
                                    for issues related to your original work.
                                </p>
                            </div>
                        </div>
                        <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-md aspect-square p-6 flex justify-between flex-col">
                            <Clock className="w-8 h-8 stroke-1 text-white" />
                            <div className="flex flex-col">
                                <h3 className="text-xl tracking-tight text-white">
                                    Extended Coverage Period
                                </h3>
                                <p className="text-white/70 max-w-xs text-base">
                                    Coverage up to 24 months or 40,000 km for
                                    most vehicles, 12 months or 10,000 km for
                                    commercial vehicles.
                                </p>
                            </div>
                        </div>

                        <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-md aspect-square p-6 flex justify-between flex-col">
                            <FileCheck className="w-8 h-8 stroke-1 text-white" />
                            <div className="flex flex-col">
                                <h3 className="text-xl tracking-tight text-white">
                                    Simple Claims Process
                                </h3>
                                <p className="text-white/70 max-w-xs text-base">
                                    Submit claims within 4 months of repair.
                                    Quick approval process with settlements
                                    requiring your approval.
                                </p>
                            </div>
                        </div>
                        <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-md h-full lg:col-span-2 p-6 aspect-square lg:aspect-auto flex justify-between flex-col">
                            <TrendingUp className="w-8 h-8 stroke-1 text-white" />
                            <div className="flex flex-col">
                                <h3 className="text-xl tracking-tight text-white">
                                    Enhanced Shop Efficiency
                                </h3>
                                <p className="text-white/70 max-w-xs text-base">
                                    Reduce financial burden from warranty
                                    repairs and improve customer satisfaction
                                    while maintaining your reputation.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { Feature };
