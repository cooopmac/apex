"use client";

import * as React from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle } from "lucide-react";

type Status = "submitted" | "review" | "approved" | "rejected";

export default function ClaimDetailsView({
  selected,
  showActions = false,
  onStatus,
}: {
  selected: { claim: any; shop: any; user: any };
  showActions?: boolean;
  onStatus?: (s: "approved" | "rejected") => Promise<void>;
}) {
  const { claim, shop } = selected;

  return (
    <div className="p-4 space-y-6">
      <section className="space-y-1">
        <h3 className="text-lg font-semibold">Overview</h3>
        <div className="text-sm text-muted-foreground">Submitted: {new Date(claim.createdAt).toLocaleString()}</div>
        <div className="text-sm flex items-center gap-2">Status: <StatusBadge status={claim.status} /></div>
      </section>

      <Separator />

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium mb-1">Shop</h4>
          <div className="text-sm">{shop?.serviceFacilityName}</div>
          <div className="text-sm text-muted-foreground">{shop?.city}, {shop?.provinceTerritory} · {shop?.postalCode}</div>
          <div className="text-sm text-muted-foreground">Acct #: {shop?.accountNumber ?? "—"}</div>
          <div className="text-sm text-muted-foreground">Phone: {shop?.phoneNumber}</div>
          <div className="text-sm text-muted-foreground">Contact: {shop?.contactEmail}</div>
          <div className="text-sm text-muted-foreground">E-Transfer: {shop?.etransferEmail}</div>
        </div>
        <div>
          <h4 className="font-medium mb-1">Submitter</h4>
          <div className="text-sm">{claim.submitterName} · {claim.submitterEmail}</div>
          <div className="text-sm text-muted-foreground">Business: {claim.businessName} · Phone: {claim.phoneNumber}</div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium mb-1">Customer</h4>
          <div className="text-sm">{claim.customerFirstName} {claim.customerLastName}</div>
          <div className="text-sm text-muted-foreground">In-Bay Defect: {claim.inBayDefect ? "Yes" : "No"}</div>
          <div className="text-sm text-muted-foreground">Number of parts: {claim.numberOfParts}</div>
        </div>
        <div>
          <h4 className="font-medium mb-1">Vehicle</h4>
          <div className="text-sm">{claim.vehicleYear} {claim.vehicleMake} {claim.vehicleModel}</div>
          <div className="text-sm text-muted-foreground">VIN: {claim.vin} · Plate: {claim.licensePlate}</div>
          <div className="text-sm text-muted-foreground">Mileage: {claim.originalMileage} → {claim.repairMileage} · Drivetrain: {claim.drivetrain}</div>
        </div>
      </section>

      <section>
        <h4 className="font-medium mb-1">Defect Reason</h4>
        <p className="text-sm whitespace-pre-wrap">{claim.defectReason}</p>
      </section>

      <section>
        <h4 className="font-medium mb-1">Attachments</h4>
        {claim.attachments?.length ? (
          <ul className="text-sm list-disc pl-5">
            {claim.attachments.map((a: any, i: number) => (
              <li key={i}>{a.label}: {a.fileName}</li>
            ))}
          </ul>
        ) : (
          <div className="text-sm text-muted-foreground">No attachments provided</div>
        )}
      </section>

      {showActions && onStatus && (
        <div className="flex gap-3 pt-2">
          <Button onClick={() => onStatus("approved")} className="inline-flex items-center gap-1">
            <CheckCircle2 className="h-4 w-4" /> Approve
          </Button>
          <Button variant="destructive" onClick={() => onStatus("rejected")} className="inline-flex items-center gap-1">
            <XCircle className="h-4 w-4" /> Deny
          </Button>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: Status }) {
  const color =
    status === "approved" ? "bg-green-100 text-green-700" :
    status === "rejected" ? "bg-red-100 text-red-700" :
    "bg-yellow-100 text-yellow-700"; // submitted/review → pending yellow
  const label =
    status === "approved" ? "Approved" :
    status === "rejected" ? "Denied" :
    "Pending";
  return <span className={`px-2 py-0.5 rounded text-xs font-medium ${color}`}>{label}</span>;
}


