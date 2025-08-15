"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

export function LanguageToggle() {
    const { language, setLanguage } = useLanguage();

    const toggleLanguage = () => {
        setLanguage(language === "en" ? "fr" : "en");
    };

    return (
        <Button
            onClick={toggleLanguage}
            size="sm"
            variant="ghost"
            className="backdrop-blur-md bg-black/30 border border-white/20 text-white/90 hover:text-white hover:bg-white/10 px-4 py-2 rounded-xl font-medium min-w-[60px] transition-all duration-200 shadow-lg hover:scale-105"
        >
            {language === "en" ? "FR" : "EN"}
        </Button>
    );
}
