"use client";

import * as React from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { CheckCircle2, XCircle, Car } from "lucide-react";

export default function AdminClaimsPage() {
  const [from, setFrom] = React.useState("");
  const [to, setTo] = React.useState("");
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  const pending = useQuery(api.claims.listPendingForAdmin);
  const selected = useQuery(api.claims.getByIdForAdmin, selectedId ? { claimId: selectedId as any } : "skip");
  const setStatus = useMutation(api.claims.setStatusForAdmin);

  const filtered = React.useMemo(() => {
    if (!pending) return [];
    const fromTs = from ? Date.parse(from) : -Infinity;
    const toTs = to ? Date.parse(to) : Infinity;
    return pending.filter((c) => {
      const ts = Date.parse(c.createdAt);
      return ts >= fromTs && ts <= toTs;
    });
  }, [pending, from, to]);

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold">Claims Queue</h1>
          <p className="text-muted-foreground">Review and action pending claims. Oldest first.</p>
        </div>
        <div className="flex items-end gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">From</label>
            <Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">To</label>
            <Input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
          </div>
        </div>
      </div>
      <Separator />

      {pending === undefined ? (
        <div className="min-h-[30vh] grid place-items-center">Loading…</div>
      ) : filtered.length === 0 ? (
        <div className="text-muted-foreground">No pending claims in this range.</div>
      ) : (
        <div className="rounded-xl border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="p-3">Submitted</th>
                <th className="p-3">Shop</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Vehicle</th>
                <th className="p-3">VIN</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c._id} className="border-t">
                  <td className="p-3">{new Date(c.createdAt).toLocaleString()}</td>
                  <td className="p-3">{(c as any).shopName || ""}</td>
                  <td className="p-3">{c.customerFirstName} {c.customerLastName}</td>
                  <td className="p-3 inline-flex items-center gap-2"><Car className="h-4 w-4" />{c.vehicleYear} {c.vehicleMake} {c.vehicleModel}</td>
                  <td className="p-3">{c.vin}</td>
                  <td className="p-3"><StatusBadge status={c.status} /></td>
                  <td className="p-3 text-right">
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedId(c._id as any)}>
                          Review
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="right" className="sm:max-w-2xl">
                        <SheetHeader>
                          <SheetTitle>Claim details</SheetTitle>
                        </SheetHeader>
                        <ClaimDetails claimId={selectedId} selected={selected} onStatus={async (status) => {
                          if (!selectedId) return;
                          await setStatus({ claimId: selectedId as any, status });
                          setSelectedId(null);
                        }} />
                      </SheetContent>
                    </Sheet>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function ClaimDetails({ claimId, selected, onStatus }: { claimId: string | null; selected: any; onStatus: (s: "approved" | "rejected") => Promise<void> }) {
  if (!claimId) return null;
  if (selected === undefined) return <div className="p-4">Loading…</div>;
  if (selected === null) return <div className="p-4 text-muted-foreground">Not found.</div>;

  const { claim, shop, user } = selected;

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

      <div className="flex gap-3 pt-2">
        <Button onClick={() => onStatus("approved")} className="inline-flex items-center gap-1">
          <CheckCircle2 className="h-4 w-4" /> Approve
        </Button>
        <Button variant="destructive" onClick={() => onStatus("rejected")} className="inline-flex items-center gap-1">
          <XCircle className="h-4 w-4" /> Deny
        </Button>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: "submitted" | "review" | "approved" | "rejected" }) {
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

