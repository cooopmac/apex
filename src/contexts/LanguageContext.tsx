"use client";

import React, { createContext, useContext, useState } from "react";
import { translations, Language } from "@/lib/translations";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string, values?: { [key: string]: any }) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
    undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>("en");

    const t = (key: string, values?: { [key: string]: any }): any => {
        const keys = key.split(".");
        let value: any = translations[language];

        for (const k of keys) {
            if (value && typeof value === "object" && k in value) {
                value = value[k];
            } else {
                // Fallback to English if key doesn't exist
                let fallbackValue: any = translations.en;
                for (const fallbackKey of keys) {
                    if (
                        fallbackValue &&
                        typeof fallbackValue === "object" &&
                        fallbackKey in fallbackValue
                    ) {
                        fallbackValue = fallbackValue[fallbackKey];
                    } else {
                        return key;
                    }
                }
                if (typeof fallbackValue === "function") {
                    return fallbackValue(values);
                }
                return fallbackValue;
            }
        }

        if (typeof value === "function") {
            return value(values);
        }
        return value;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
