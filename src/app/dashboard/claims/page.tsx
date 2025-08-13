"use client";

import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";

function StatusBadge({ status }: { status: "submitted" | "review" | "approved" | "rejected" }) {
  const color =
    status === "approved" ? "bg-green-100 text-green-700" :
    status === "rejected" ? "bg-red-100 text-red-700" :
    status === "review" ? "bg-yellow-100 text-yellow-700" :
    "bg-gray-100 text-gray-700";
  const label =
    status === "approved" ? "Approved" :
    status === "rejected" ? "Not approved" :
    status === "review" ? "Pending" :
    "Submitted";
  return <span className={`px-2 py-0.5 rounded text-xs font-medium ${color}`}>{label}</span>;
}

export default function ClaimsPage() {
  const claims = useQuery(api.claims.listForCurrentUser);

  if (claims === undefined) return <div className="p-6">Loading…</div>;

  const active = claims.filter((c) => c.status === "submitted" || c.status === "review");
  const past = claims.filter((c) => c.status === "approved" || c.status === "rejected");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Claims</h1>
        <p className="text-muted-foreground">View your active and past claims.</p>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-medium">Active</h2>
        {active.length === 0 ? (
          <p className="text-sm text-muted-foreground">No active claims.</p>
        ) : (
          <div className="overflow-hidden rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-left">
                <tr>
                  <th className="p-3">Submitted</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Vehicle</th>
                  <th className="p-3">VIN</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {active.map((c) => (
                  <tr key={c._id} className="border-t">
                    <td className="p-3">{new Date(c.createdAt).toLocaleString()}</td>
                    <td className="p-3">{c.customerFirstName} {c.customerLastName}</td>
                    <td className="p-3">{c.vehicleYear} {c.vehicleMake} {c.vehicleModel}</td>
                    <td className="p-3">{c.vin}</td>
                    <td className="p-3"><StatusBadge status={c.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium">Past</h2>
        {past.length === 0 ? (
          <p className="text-sm text-muted-foreground">No past claims.</p>
        ) : (
          <div className="overflow-hidden rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-left">
                <tr>
                  <th className="p-3">Submitted</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Vehicle</th>
                  <th className="p-3">VIN</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {past.map((c) => (
                  <tr key={c._id} className="border-t">
                    <td className="p-3">{new Date(c.createdAt).toLocaleString()}</td>
                    <td className="p-3">{c.customerFirstName} {c.customerLastName}</td>
                    <td className="p-3">{c.vehicleYear} {c.vehicleMake} {c.vehicleModel}</td>
                    <td className="p-3">{c.vin}</td>
                    <td className="p-3"><StatusBadge status={c.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}


