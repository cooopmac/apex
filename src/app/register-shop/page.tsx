"use client";

import Silk from "@/backgrounds/Silk/Silk";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function RegisterShop() {
    const [formData, setFormData] = useState({
        serviceFacilityName: "",
        streetAddress: "",
        city: "",
        provinceTerritory: "",
        postalCode: "",
        phoneNumber: "",
        contactEmail: "",
        etransferEmail: "",
        ownerName: "",
        mainContactName: "",
        bestbuyDistributor: "",
        doorRate: "",
        acknowledgement: false,
    });

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value, type } = e.target;
        if (type === "checkbox") {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData((prev) => ({
                ...prev,
                [name]: checked,
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Format the form data for email
            const emailData = {
                to_email: "rlammle@solutionslrp.com",
                subject: "New Shop Registration",
                service_facility_name: formData.serviceFacilityName,
                street_address: formData.streetAddress,
                city: formData.city,
                province_territory: formData.provinceTerritory,
                postal_code: formData.postalCode,
                phone_number: formData.phoneNumber,
                contact_email: formData.contactEmail,
                etransfer_email: formData.etransferEmail,
                owner_name: formData.ownerName,
                main_contact_name: formData.mainContactName,
                bestbuy_distributor: formData.bestbuyDistributor,
                door_rate: formData.doorRate,
                acknowledgement: formData.acknowledgement ? "Yes" : "No",
            };

            // Send email using EmailJS
            // You'll need to replace these with your actual EmailJS credentials
            await emailjs.send(
                "service_fyvlxlf", // Replace with your EmailJS service ID
                "template_1ruu9ov", // Replace with your EmailJS template ID for shop registrations
                emailData,
                "HavKou0GHURFCt3DI" // Replace with your EmailJS public key
            );

            alert(
                "Shop registration submitted successfully! You will receive a confirmation email shortly."
            );

            // Reset form
            setFormData({
                serviceFacilityName: "",
                streetAddress: "",
                city: "",
                provinceTerritory: "",
                postalCode: "",
                phoneNumber: "",
                contactEmail: "",
                etransferEmail: "",
                ownerName: "",
                mainContactName: "",
                bestbuyDistributor: "",
                doorRate: "",
                acknowledgement: false,
            });
        } catch (error) {
            console.error("Error sending email:", error);
            alert(
                "There was an error submitting your registration. Please try again."
            );
        }
    };

    return (
        <div className="min-h-screen relative">
            {/* Silk Background */}
            <div className="absolute inset-0">
                <Silk
                    color="#6B46C1"
                    speed={3}
                    scale={2}
                    noiseIntensity={1.2}
                />
            </div>

            <div className="relative pt-24 pb-12 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Glassmorphism Form Container */}
                    <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 shadow-lg">
                        {/* Page Title */}
                        <div className="text-left mb-8">
                            <h1 className="text-6xl font-bold text-white mb-2">
                                Register My Shop
                            </h1>
                            <p className="text-white/80 text-lg">
                                Complete the form below to register your shop
                                with our program
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Shop Details */}
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-6">
                                    Shop Details
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-white font-medium mb-2">
                                            Service facility name:
                                        </label>
                                        <input
                                            type="text"
                                            name="serviceFacilityName"
                                            value={formData.serviceFacilityName}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-white font-medium mb-2">
                                            Street address:
                                        </label>
                                        <input
                                            type="text"
                                            name="streetAddress"
                                            value={formData.streetAddress}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-white font-medium mb-2">
                                            City:
                                        </label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-white font-medium mb-2">
                                            Province or territory:
                                        </label>
                                        <select
                                            name="provinceTerritory"
                                            value={formData.provinceTerritory}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
                                        >
                                            <option
                                                value=""
                                                className="bg-gray-800"
                                            >
                                                Make a selection
                                            </option>
                                            <option
                                                value="AB"
                                                className="bg-gray-800"
                                            >
                                                Alberta
                                            </option>
                                            <option
                                                value="BC"
                                                className="bg-gray-800"
                                            >
                                                British Columbia
                                            </option>
                                            <option
                                                value="MB"
                                                className="bg-gray-800"
                                            >
                                                Manitoba
                                            </option>
                                            <option
                                                value="NB"
                                                className="bg-gray-800"
                                            >
                                                New Brunswick
                                            </option>
                                            <option
                                                value="NL"
                                                className="bg-gray-800"
                                            >
                                                Newfoundland and Labrador
                                            </option>
                                            <option
                                                value="NT"
                                                className="bg-gray-800"
                                            >
                                                Northwest Territories
                                            </option>
                                            <option
                                                value="NS"
                                                className="bg-gray-800"
                                            >
                                                Nova Scotia
                                            </option>
                                            <option
                                                value="NU"
                                                className="bg-gray-800"
                                            >
                                                Nunavut
                                            </option>
                                            <option
                                                value="ON"
                                                className="bg-gray-800"
                                            >
                                                Ontario
                                            </option>
                                            <option
                                                value="PE"
                                                className="bg-gray-800"
                                            >
                                                Prince Edward Island
                                            </option>
                                            <option
                                                value="QC"
                                                className="bg-gray-800"
                                            >
                                                Quebec
                                            </option>
                                            <option
                                                value="SK"
                                                className="bg-gray-800"
                                            >
                                                Saskatchewan
                                            </option>
                                            <option
                                                value="YT"
                                                className="bg-gray-800"
                                            >
                                                Yukon
                                            </option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-white font-medium mb-2">
                                            Postal code:
                                        </label>
                                        <input
                                            type="text"
                                            name="postalCode"
                                            value={formData.postalCode}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-white font-medium mb-2">
                                            Phone number:
                                        </label>
                                        <input
                                            type="tel"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-white font-medium mb-2">
                                            Contact email:
                                        </label>
                                        <input
                                            type="email"
                                            name="contactEmail"
                                            value={formData.contactEmail}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-white font-medium mb-2">
                                            E-transfer payment email:
                                        </label>
                                        <input
                                            type="email"
                                            name="etransferEmail"
                                            value={formData.etransferEmail}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-white font-medium mb-2">
                                            Owner's name:
                                        </label>
                                        <input
                                            type="text"
                                            name="ownerName"
                                            value={formData.ownerName}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-white font-medium mb-2">
                                            Main contact name:
                                        </label>
                                        <input
                                            type="text"
                                            name="mainContactName"
                                            value={formData.mainContactName}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-white font-medium mb-2">
                                            Who is your Bestbuy Distributor
                                            parts supplier?
                                        </label>
                                        <input
                                            type="text"
                                            name="bestbuyDistributor"
                                            value={formData.bestbuyDistributor}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-white font-medium mb-2">
                                            Enter your door rate:
                                        </label>
                                        <input
                                            type="text"
                                            name="doorRate"
                                            value={formData.doorRate}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Acknowledgement */}
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-6">
                                    Acknowledgement
                                </h2>
                                <div>
                                    <p className="text-white font-medium mb-4">
                                        I understand that:
                                    </p>
                                    <label className="flex items-start space-x-3">
                                        <input
                                            type="checkbox"
                                            name="acknowledgement"
                                            checked={formData.acknowledgement}
                                            onChange={handleInputChange}
                                            className="mt-1 w-4 h-4 rounded border-white/20 bg-white/10 text-purple-600 focus:ring-purple-500 focus:ring-2"
                                        />
                                        <span className="text-white/90">
                                            By submitting this form, I have read
                                            the program outline and agree to its
                                            outline presentation and terms.
                                        </span>
                                    </label>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-6 text-center">
                                <Button
                                    type="submit"
                                    className="bg-white/20 text-white hover:bg-white/30 border border-white/20 px-8 py-5 rounded-xl font-medium text-lg backdrop-blur-sm transition-colors duration-200"
                                >
                                    Review My Registration
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
