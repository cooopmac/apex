"use client";

import Silk from "@/backgrounds/Silk/Silk";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function SubmitClaim() {
    const [formData, setFormData] = useState({
        businessName: "",
        phoneNumber: "",
        postalCode: "",
        submitterName: "",
        submitterEmail: "",
        firstName: "",
        lastName: "",
        vehicleYear: "",
        vehicleMake: "",
        vehicleModel: "",
        vin: "",
        originalMileage: "",
        warrantyMileage: "",
        licensePlate: "",
        drivetrain: "",
        defectiveDescription: "",
        defectiveWarrantyRepair: "",
        partsReplaced: "",
        acknowledgement1: false,
        acknowledgement2: false,
        acknowledgement3: false,
    });

    const [uploadedFiles, setUploadedFiles] = useState({
        originalRepairInvoice: null as File | null,
        originalPartInvoice: null as File | null,
        warrantyRepairInvoice: null as File | null,
        replacementPartInvoice: null as File | null,
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

    const handleFileChange = (
        fileType: keyof typeof uploadedFiles,
        file: File | null
    ) => {
        setUploadedFiles((prev) => ({
            ...prev,
            [fileType]: file,
        }));
    };

    const triggerFileInput = (fileType: keyof typeof uploadedFiles) => {
        const fileInput = document.getElementById(
            `file-${fileType}`
        ) as HTMLInputElement;
        fileInput?.click();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Format the form data for email
            const emailData = {
                to_email: "rlammle@solutionslrp.com",
                subject: "New Warranty Claim Submission",
                business_name: formData.businessName,
                phone_number: formData.phoneNumber,
                postal_code: formData.postalCode,
                submitter_name: formData.submitterName,
                submitter_email: formData.submitterEmail,
                first_name: formData.firstName,
                last_name: formData.lastName,
                vehicle_year: formData.vehicleYear,
                vehicle_make: formData.vehicleMake,
                vehicle_model: formData.vehicleModel,
                vin: formData.vin,
                original_mileage: formData.originalMileage,
                warranty_mileage: formData.warrantyMileage,
                license_plate: formData.licensePlate,
                drivetrain: formData.drivetrain,
                defective_description: formData.defectiveDescription,
                defective_warranty_repair: formData.defectiveWarrantyRepair,
                parts_replaced: formData.partsReplaced,
                uploaded_files: Object.keys(uploadedFiles)
                    .filter(
                        (key) =>
                            uploadedFiles[key as keyof typeof uploadedFiles]
                    )
                    .join(", "),
                acknowledgement1: formData.acknowledgement1 ? "Yes" : "No",
                acknowledgement2: formData.acknowledgement2 ? "Yes" : "No",
                acknowledgement3: formData.acknowledgement3 ? "Yes" : "No",
            };

            // Send email using EmailJS
            // You'll need to replace these with your actual EmailJS credentials
            await emailjs.send(
                "service_fyvlxlf", // Replace with your EmailJS service ID
                "template_ydzzkk2", // Replace with your EmailJS template ID
                emailData,
                "HavKou0GHURFCt3DI" // Replace with your EmailJS public key
            );

            alert(
                "Claim submitted successfully! You will receive a confirmation email shortly."
            );

            // Reset form
            setFormData({
                businessName: "",
                phoneNumber: "",
                postalCode: "",
                submitterName: "",
                submitterEmail: "",
                firstName: "",
                lastName: "",
                vehicleYear: "",
                vehicleMake: "",
                vehicleModel: "",
                vin: "",
                originalMileage: "",
                warrantyMileage: "",
                licensePlate: "",
                drivetrain: "",
                defectiveDescription: "",
                defectiveWarrantyRepair: "",
                partsReplaced: "",
                acknowledgement1: false,
                acknowledgement2: false,
                acknowledgement3: false,
            });

            setUploadedFiles({
                originalRepairInvoice: null,
                originalPartInvoice: null,
                warrantyRepairInvoice: null,
                replacementPartInvoice: null,
            });
        } catch (error) {
            console.error("Error sending email:", error);
            alert(
                "There was an error submitting your claim. Please try again."
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
                                Submit a Claim
                            </h1>
                            <p className="text-white/80 text-lg">
                                Complete the form below to submit your warranty
                                repair claim
                            </p>
                        </div>

                        {/* Note */}
                        <div className="mb-8 p-4 bg-white/5 rounded-lg border border-white/10">
                            <p className="text-white/90 text-sm">
                                <strong>NOTE:</strong> Please submit only one
                                claim at a time. Once that claim is processed,
                                you may submit the next one.
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
                                            Business name:
                                        </label>
                                        <input
                                            type="text"
                                            name="businessName"
                                            value={formData.businessName}
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
                                            Submitter name:
                                        </label>
                                        <input
                                            type="text"
                                            name="submitterName"
                                            value={formData.submitterName}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-white font-medium mb-2">
                                            Submitter email address:
                                        </label>
                                        <input
                                            type="email"
                                            name="submitterEmail"
                                            value={formData.submitterEmail}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Customer & Warranty Repair Details */}
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-6">
                                    Customer & Warranty Repair Details
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-white font-medium mb-2">
                                            First name:
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-white font-medium mb-2">
                                            Last name:
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-white font-medium mb-2">
                                            Vehicle year:
                                        </label>
                                        <select
                                            name="vehicleYear"
                                            value={formData.vehicleYear}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
                                        >
                                            <option
                                                value=""
                                                className="bg-gray-800"
                                            >
                                                Select year
                                            </option>
                                            {Array.from(
                                                { length: 30 },
                                                (_, i) => {
                                                    const year =
                                                        new Date().getFullYear() -
                                                        i;
                                                    return (
                                                        <option
                                                            key={year}
                                                            value={year}
                                                            className="bg-gray-800"
                                                        >
                                                            {year}
                                                        </option>
                                                    );
                                                }
                                            )}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-white font-medium mb-2">
                                            Vehicle make:
                                        </label>
                                        <select
                                            name="vehicleMake"
                                            value={formData.vehicleMake}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
                                        >
                                            <option
                                                value=""
                                                className="bg-gray-800"
                                            >
                                                Select make
                                            </option>
                                            <option
                                                value="toyota"
                                                className="bg-gray-800"
                                            >
                                                Toyota
                                            </option>
                                            <option
                                                value="honda"
                                                className="bg-gray-800"
                                            >
                                                Honda
                                            </option>
                                            <option
                                                value="ford"
                                                className="bg-gray-800"
                                            >
                                                Ford
                                            </option>
                                            <option
                                                value="chevrolet"
                                                className="bg-gray-800"
                                            >
                                                Chevrolet
                                            </option>
                                            <option
                                                value="nissan"
                                                className="bg-gray-800"
                                            >
                                                Nissan
                                            </option>
                                            <option
                                                value="bmw"
                                                className="bg-gray-800"
                                            >
                                                BMW
                                            </option>
                                            <option
                                                value="mercedes"
                                                className="bg-gray-800"
                                            >
                                                Mercedes-Benz
                                            </option>
                                            <option
                                                value="audi"
                                                className="bg-gray-800"
                                            >
                                                Audi
                                            </option>
                                            <option
                                                value="volkswagen"
                                                className="bg-gray-800"
                                            >
                                                Volkswagen
                                            </option>
                                            <option
                                                value="other"
                                                className="bg-gray-800"
                                            >
                                                Other
                                            </option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-white font-medium mb-2">
                                            Vehicle model:
                                        </label>
                                        <input
                                            type="text"
                                            name="vehicleModel"
                                            value={formData.vehicleModel}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-white font-medium mb-2">
                                            Vehicle Identification Number (VIN):
                                        </label>
                                        <input
                                            type="text"
                                            name="vin"
                                            value={formData.vin}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-white font-medium mb-2">
                                            Original repair mileage:
                                        </label>
                                        <div className="flex">
                                            <input
                                                type="number"
                                                name="originalMileage"
                                                value={formData.originalMileage}
                                                onChange={handleInputChange}
                                                className="flex-1 px-4 py-3 rounded-l-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
                                            />
                                            <span className="px-4 py-3 bg-white/20 border border-white/20 rounded-r-xl text-white font-medium">
                                                KM
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-white font-medium mb-2">
                                            Warranty repair mileage:
                                        </label>
                                        <div className="flex">
                                            <input
                                                type="number"
                                                name="warrantyMileage"
                                                value={formData.warrantyMileage}
                                                onChange={handleInputChange}
                                                className="flex-1 px-4 py-3 rounded-l-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
                                            />
                                            <span className="px-4 py-3 bg-white/20 border border-white/20 rounded-r-xl text-white font-medium">
                                                KM
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-white font-medium mb-2">
                                            License plate number:
                                        </label>
                                        <input
                                            type="text"
                                            name="licensePlate"
                                            value={formData.licensePlate}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-white font-medium mb-2">
                                            Drivetrain:
                                        </label>
                                        <select
                                            name="drivetrain"
                                            value={formData.drivetrain}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
                                        >
                                            <option
                                                value=""
                                                className="bg-gray-800"
                                            >
                                                Select drivetrain
                                            </option>
                                            <option
                                                value="fwd"
                                                className="bg-gray-800"
                                            >
                                                Front-Wheel Drive (FWD)
                                            </option>
                                            <option
                                                value="rwd"
                                                className="bg-gray-800"
                                            >
                                                Rear-Wheel Drive (RWD)
                                            </option>
                                            <option
                                                value="awd"
                                                className="bg-gray-800"
                                            >
                                                All-Wheel Drive (AWD)
                                            </option>
                                            <option
                                                value="4wd"
                                                className="bg-gray-800"
                                            >
                                                Four-Wheel Drive (4WD)
                                            </option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-white font-medium mb-2">
                                            Brief description if a defective
                                            repair was required:
                                        </label>
                                        <textarea
                                            name="defectiveDescription"
                                            value={
                                                formData.defectiveDescription
                                            }
                                            onChange={handleInputChange}
                                            rows={3}
                                            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm resize-vertical"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-white font-medium mb-2">
                                            Defective warranty repair:
                                        </label>
                                        <textarea
                                            name="defectiveWarrantyRepair"
                                            value={
                                                formData.defectiveWarrantyRepair
                                            }
                                            onChange={handleInputChange}
                                            rows={3}
                                            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm resize-vertical"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-white font-medium mb-2">
                                            Indicate the number of parts
                                            replaced for warranty repair:
                                        </label>
                                        <select
                                            name="partsReplaced"
                                            value={formData.partsReplaced}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
                                        >
                                            <option
                                                value=""
                                                className="bg-gray-800"
                                            >
                                                Select number of parts
                                            </option>
                                            {Array.from(
                                                { length: 10 },
                                                (_, i) => (
                                                    <option
                                                        key={i + 1}
                                                        value={i + 1}
                                                        className="bg-gray-800"
                                                    >
                                                        {i + 1}
                                                    </option>
                                                )
                                            )}
                                            <option
                                                value="10+"
                                                className="bg-gray-800"
                                            >
                                                10+
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* File Attachments */}
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-6">
                                    File Attachments
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-white font-medium mb-2">
                                            Original repair invoice:
                                        </label>
                                        <div className="flex">
                                            <input
                                                type="text"
                                                value={
                                                    uploadedFiles
                                                        .originalRepairInvoice
                                                        ?.name || "Choose file"
                                                }
                                                placeholder="Choose file"
                                                className="flex-1 px-4 py-3 rounded-l-xl bg-white/10 border border-white/20 border-r-0 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
                                                readOnly
                                            />
                                            <input
                                                id="file-originalRepairInvoice"
                                                type="file"
                                                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                                onChange={(e) =>
                                                    handleFileChange(
                                                        "originalRepairInvoice",
                                                        e.target.files?.[0] ||
                                                            null
                                                    )
                                                }
                                                className="hidden"
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    triggerFileInput(
                                                        "originalRepairInvoice"
                                                    )
                                                }
                                                className="px-6 py-3 rounded-r-xl bg-white/20 hover:bg-white/30 border border-white/20 border-l-0 text-white backdrop-blur-sm transition-colors duration-200"
                                            >
                                                Browse
                                            </button>
                                        </div>
                                        <p className="text-white/60 text-xs mt-1">
                                            {uploadedFiles.originalRepairInvoice
                                                ? "1"
                                                : "0"}
                                            /1 files uploaded
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-white font-medium mb-2">
                                            Original part invoice:
                                        </label>
                                        <div className="flex">
                                            <input
                                                type="text"
                                                value={
                                                    uploadedFiles
                                                        .originalPartInvoice
                                                        ?.name || "Choose file"
                                                }
                                                placeholder="Choose file"
                                                className="flex-1 px-4 py-3 rounded-l-xl bg-white/10 border border-white/20 border-r-0 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
                                                readOnly
                                            />
                                            <input
                                                id="file-originalPartInvoice"
                                                type="file"
                                                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                                onChange={(e) =>
                                                    handleFileChange(
                                                        "originalPartInvoice",
                                                        e.target.files?.[0] ||
                                                            null
                                                    )
                                                }
                                                className="hidden"
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    triggerFileInput(
                                                        "originalPartInvoice"
                                                    )
                                                }
                                                className="px-6 py-3 rounded-r-xl bg-white/20 hover:bg-white/30 border border-white/20 border-l-0 text-white backdrop-blur-sm transition-colors duration-200"
                                            >
                                                Browse
                                            </button>
                                        </div>
                                        <p className="text-white/60 text-xs mt-1">
                                            {uploadedFiles.originalPartInvoice
                                                ? "1"
                                                : "0"}
                                            /1 files uploaded
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-white font-medium mb-2">
                                            Warranty repair invoice:
                                        </label>
                                        <div className="flex">
                                            <input
                                                type="text"
                                                value={
                                                    uploadedFiles
                                                        .warrantyRepairInvoice
                                                        ?.name || "Choose file"
                                                }
                                                placeholder="Choose file"
                                                className="flex-1 px-4 py-3 rounded-l-xl bg-white/10 border border-white/20 border-r-0 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
                                                readOnly
                                            />
                                            <input
                                                id="file-warrantyRepairInvoice"
                                                type="file"
                                                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                                onChange={(e) =>
                                                    handleFileChange(
                                                        "warrantyRepairInvoice",
                                                        e.target.files?.[0] ||
                                                            null
                                                    )
                                                }
                                                className="hidden"
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    triggerFileInput(
                                                        "warrantyRepairInvoice"
                                                    )
                                                }
                                                className="px-6 py-3 rounded-r-xl bg-white/20 hover:bg-white/30 border border-white/20 border-l-0 text-white backdrop-blur-sm transition-colors duration-200"
                                            >
                                                Browse
                                            </button>
                                        </div>
                                        <p className="text-white/60 text-xs mt-1">
                                            {uploadedFiles.warrantyRepairInvoice
                                                ? "1"
                                                : "0"}
                                            /1 files uploaded
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-white font-medium mb-2">
                                            Replacement part invoice:
                                        </label>
                                        <div className="flex">
                                            <input
                                                type="text"
                                                value={
                                                    uploadedFiles
                                                        .replacementPartInvoice
                                                        ?.name || "Choose file"
                                                }
                                                placeholder="Choose file"
                                                className="flex-1 px-4 py-3 rounded-l-xl bg-white/10 border border-white/20 border-r-0 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
                                                readOnly
                                            />
                                            <input
                                                id="file-replacementPartInvoice"
                                                type="file"
                                                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                                onChange={(e) =>
                                                    handleFileChange(
                                                        "replacementPartInvoice",
                                                        e.target.files?.[0] ||
                                                            null
                                                    )
                                                }
                                                className="hidden"
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    triggerFileInput(
                                                        "replacementPartInvoice"
                                                    )
                                                }
                                                className="px-6 py-3 rounded-r-xl bg-white/20 hover:bg-white/30 border border-white/20 border-l-0 text-white backdrop-blur-sm transition-colors duration-200"
                                            >
                                                Browse
                                            </button>
                                        </div>
                                        <p className="text-white/60 text-xs mt-1">
                                            {uploadedFiles.replacementPartInvoice
                                                ? "1"
                                                : "0"}
                                            /1 files uploaded
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Acknowledgements */}
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-6">
                                    Acknowledgements
                                </h2>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-white font-medium mb-2">
                                            I understand that:
                                        </p>
                                        <label className="flex items-start space-x-3">
                                            <input
                                                type="checkbox"
                                                name="acknowledgement1"
                                                checked={
                                                    formData.acknowledgement1
                                                }
                                                onChange={handleInputChange}
                                                className="mt-1 w-4 h-4 rounded border-white/20 bg-white/10 text-purple-600 focus:ring-purple-500 focus:ring-2"
                                            />
                                            <span className="text-white/90">
                                                Upon receiving a claim,
                                                SolutionsLRP will take 5
                                                business days to review all
                                                necessary information and obtain
                                                approval from the shop for the
                                                claim.
                                            </span>
                                        </label>
                                    </div>
                                    <div>
                                        <p className="text-white font-medium mb-2">
                                            I understand that:
                                        </p>
                                        <label className="flex items-start space-x-3">
                                            <input
                                                type="checkbox"
                                                name="acknowledgement2"
                                                checked={
                                                    formData.acknowledgement2
                                                }
                                                onChange={handleInputChange}
                                                className="mt-1 w-4 h-4 rounded border-white/20 bg-white/10 text-purple-600 focus:ring-purple-500 focus:ring-2"
                                            />
                                            <span className="text-white/90">
                                                After approval, the claim will
                                                be paid out within 2 business
                                                days via e-transfer to the email
                                                address on file for approved
                                                e-transfer payment.
                                            </span>
                                        </label>
                                    </div>
                                    <div>
                                        <p className="text-white font-medium mb-2">
                                            I understand that:
                                        </p>
                                        <label className="flex items-start space-x-3">
                                            <input
                                                type="checkbox"
                                                name="acknowledgement3"
                                                checked={
                                                    formData.acknowledgement3
                                                }
                                                onChange={handleInputChange}
                                                className="mt-1 w-4 h-4 rounded border-white/20 bg-white/10 text-purple-600 focus:ring-purple-500 focus:ring-2"
                                            />
                                            <span className="text-white/90">
                                                All claims must be submitted
                                                within 4 months of the warranty
                                                repair invoice date for
                                                approval. Claims submitted after
                                                two months will be paid out at a
                                                rate of $75.00. Claims submitted
                                                after 4 months will not be
                                                eligible for settlement.
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-6 text-center">
                                <Button
                                    type="submit"
                                    className="bg-white/20 text-white hover:bg-white/30 border border-white/20 px-8 py-5 rounded-xl font-medium text-lg backdrop-blur-sm transition-colors duration-200"
                                >
                                    Review My Claim
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
