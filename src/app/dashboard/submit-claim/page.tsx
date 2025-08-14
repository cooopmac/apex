"use client";

import * as React from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

type Attachment = { label: string; fileName: string };

export default function DashboardSubmitClaimPage() {
  const shop = useQuery(api.shops.getForCurrentUser);
  const submitClaim = useMutation(api.claims.submit);

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [attachments, setAttachments] = React.useState<Attachment[]>([]);

  const [form, setForm] = React.useState({
    // Personal
    businessName: "",
    phoneNumber: "",
    postalCode: "",
    submitterName: "",
    submitterEmail: "",

    // Claim
    customerFirstName: "",
    customerLastName: "",
    vehicleYear: "",
    vehicleMake: "",
    vehicleModel: "",
    vin: "",
    licensePlate: "",
    originalMileage: "",
    repairMileage: "",
    drivetrain: "",
    inBayDefect: false,
    defectReason: "",
    numberOfParts: 1,
  });

  const onChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  > = (e) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else if (name === "numberOfParts") {
      setForm((prev) => ({ ...prev, [name]: Number(value) }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const addAttachment = (label: string, file: File | null) => {
    if (!file) return;
    setAttachments((prev) => [...prev, { label, fileName: file.name }]);
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!shop) return; // still loading or missing shop
    // Client-side VIN check for better UX
    const vin = String(form.vin || "").trim().toUpperCase();
    const isValidVin = /^[A-HJ-NPR-Z0-9]{17}$/.test(vin);
    if (!isValidVin) {
      alert("VIN must be exactly 17 characters (letters/numbers, no I/O/Q)");
      return;
    }
    setIsSubmitting(true);
    try {
      await submitClaim({
        ...form,
        vin,
        drivetrain: mapDrivetrain(form.drivetrain),
        attachments,
      } as any);
      setForm({
        businessName: "",
        phoneNumber: "",
        postalCode: "",
        submitterName: "",
        submitterEmail: "",
        customerFirstName: "",
        customerLastName: "",
        vehicleYear: "",
        vehicleMake: "",
        vehicleModel: "",
        vin: "",
        licensePlate: "",
        originalMileage: "",
        repairMileage: "",
        drivetrain: "",
        inBayDefect: false,
        defectReason: "",
        numberOfParts: 1,
      });
      setAttachments([]);
      alert("Claim submitted");
    } catch (err) {
      console.error(err);
      alert("Failed to submit claim");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (shop === undefined) {
    return <div className="p-6">Loading…</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Submit Claim</h1>
      <p className="text-muted-foreground">
        Fill in the details below. Attach required documents: Original Invoice, Original Part Order, Repair Invoice, Repair Part Order.
      </p>
      <Separator />

      <form onSubmit={onSubmit} className="space-y-8">
        <section className="space-y-4">
          <h2 className="text-lg font-medium">Personal</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <LabeledInput label="Business Name" name="businessName" value={form.businessName} onChange={onChange} />
            <LabeledInput label="Phone Number" name="phoneNumber" value={form.phoneNumber} onChange={onChange} />
            <LabeledInput label="Postal Code" name="postalCode" value={form.postalCode} onChange={onChange} />
            <LabeledInput label="Submitter Name" name="submitterName" value={form.submitterName} onChange={onChange} />
            <LabeledInput label="Submitter Email" name="submitterEmail" value={form.submitterEmail} onChange={onChange} type="email" className="md:col-span-2" />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-medium">Claim</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <LabeledInput label="Customer First Name" name="customerFirstName" value={form.customerFirstName} onChange={onChange} />
            <LabeledInput label="Customer Last Name" name="customerLastName" value={form.customerLastName} onChange={onChange} />
            <LabeledInput label="Vehicle Year" name="vehicleYear" value={form.vehicleYear} onChange={onChange} />
            <LabeledInput label="Vehicle Make" name="vehicleMake" value={form.vehicleMake} onChange={onChange} />
            <LabeledInput label="Vehicle Model" name="vehicleModel" value={form.vehicleModel} onChange={onChange} />
            <LabeledInput label="VIN #" name="vin" value={form.vin} onChange={onChange} />
            <LabeledInput label="License Plate #" name="licensePlate" value={form.licensePlate} onChange={onChange} />
            <LabeledInput label="Original Mileage" name="originalMileage" value={form.originalMileage} onChange={onChange} type="number" />
            <LabeledInput label="Repair Mileage" name="repairMileage" value={form.repairMileage} onChange={onChange} type="number" />

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Drivetrain</label>
              <select name="drivetrain" value={form.drivetrain} onChange={onChange} className="border rounded-md h-9 px-3 bg-background">
                <option value="">Select</option>
                <option value="2WD">2WD</option>
                <option value="4WD">4WD</option>
                <option value="AWD">All Wheel Drive</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <input id="inBayDefect" name="inBayDefect" type="checkbox" checked={form.inBayDefect} onChange={onChange} />
              <label htmlFor="inBayDefect" className="text-sm font-medium">In-Bay Defect</label>
            </div>

            <div className="md:col-span-2 flex flex-col gap-2">
              <label className="text-sm font-medium">Defect Reason</label>
              <textarea name="defectReason" value={form.defectReason} onChange={onChange} rows={3} className="border rounded-md p-3 bg-background" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Number of parts being Claimed</label>
              <select name="numberOfParts" value={form.numberOfParts} onChange={onChange} className="border rounded-md h-9 px-3 bg-background">
                {[1,2,3,4].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-medium">Attachments (metadata for now)</h2>
          <AttachmentPicker label="Original Invoice" onFile={(f) => addAttachment("Original Invoice", f)} />
          <AttachmentPicker label="Original Part Order" onFile={(f) => addAttachment("Original Part Order", f)} />
          <AttachmentPicker label="Repair Invoice" onFile={(f) => addAttachment("Repair Invoice", f)} />
          <AttachmentPicker label="Repair Part Order" onFile={(f) => addAttachment("Repair Part Order", f)} />
          {attachments.length > 0 && (
            <ul className="text-sm text-muted-foreground list-disc pl-4">
              {attachments.map((a, idx) => (
                <li key={idx}>{a.label}: {a.fileName}</li>
              ))}
            </ul>
          )}
        </section>

        <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Submitting…" : "Submit Claim"}</Button>
      </form>
    </div>
  );
}

function LabeledInput({
  label,
  className,
  ...props
}: React.ComponentProps<typeof Input> & { label: string }) {
  return (
    <div className={className}>
      <label className="text-sm font-medium">{label}</label>
      <Input {...props} />
    </div>
  );
}

function AttachmentPicker({
  label,
  onFile,
}: { label: string; onFile: (file: File | null) => void }) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  return (
    <div className="flex items-center gap-2">
      <input ref={inputRef} type="file" className="hidden" onChange={(e) => onFile(e.target.files?.[0] ?? null)} />
      <Button type="button" variant="outline" onClick={() => inputRef.current?.click()}>Choose file</Button>
      <span className="text-sm">{label}</span>
    </div>
  );
}

function mapDrivetrain(value: string): "2WD" | "4WD" | "AWD" {
  if (value === "2WD" || value === "4WD" || value === "AWD") return value;
  return "2WD";
}

