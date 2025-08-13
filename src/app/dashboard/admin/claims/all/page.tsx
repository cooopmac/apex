"use client";

import * as React from "react";
import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Car } from "lucide-react";
import { Input } from "@/components/ui/input";
import ClaimDetailsView from "../claim-details-view";

export default function AdminAllClaimsPage() {
  const allClaims = useQuery(api.claims.listAllForAdmin);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const selected = useQuery(api.claims.getByIdForAdmin, selectedId ? { claimId: selectedId as any } : "skip");
  const [shopQuery, setShopQuery] = React.useState("");
  const [status, setStatus] = React.useState<"all" | "submitted" | "review" | "approved" | "rejected">("all");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">All Claims</h1>
        <p className="text-muted-foreground">Browse all claims by year and month.</p>
      </div>
      <Separator />
      <div className="flex items-end gap-3 flex-wrap">
        <div>
          <label className="block text-sm font-medium mb-1">Shop</label>
          <Input placeholder="Search shop name" value={shopQuery} onChange={(e) => setShopQuery(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            className="h-9 px-3 rounded-md border bg-background"
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
          >
            <option value="all">All</option>
            <option value="submitted">Submitted</option>
            <option value="review">Review</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <AllClaimsView
        claims={allClaims}
        filters={{ shopQuery, status }}
        onSelect={(id) => setSelectedId(id)}
      />

      <Sheet open={!!selectedId} onOpenChange={(open) => !open && setSelectedId(null)}>
        <SheetContent side="right" className="sm:max-w-2xl">
          <SheetHeader>
            <SheetTitle>Claim details</SheetTitle>
          </SheetHeader>
          {selectedId && selected !== undefined && selected !== null && (
            <ClaimDetailsView selected={selected as any} />
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

function AllClaimsView({ claims, filters, onSelect }: { claims: any[] | undefined; filters: { shopQuery: string; status: "all" | "submitted" | "review" | "approved" | "rejected" }; onSelect: (id: string) => void }) {
  if (claims === undefined) return <div className="min-h-[30vh] grid place-items-center">Loading…</div>;
  if (!claims || claims.length === 0) return <div className="text-muted-foreground">No claims found.</div>;

  const normalizedQuery = filters.shopQuery.trim().toLowerCase();
  const filtered = claims.filter((c) => {
    const matchesShop = normalizedQuery
      ? String((c as any).shopName || "").toLowerCase().includes(normalizedQuery)
      : true;
    const matchesStatus = filters.status === "all" ? true : c.status === filters.status;
    return matchesShop && matchesStatus;
  });

  const byYear = new Map<string, any[]>();
  for (const c of filtered) {
    const d = new Date(c.createdAt);
    const year = String(d.getFullYear());
    const list = byYear.get(year) ?? [];
    list.push(c);
    byYear.set(year, list);
  }

  const monthNames = [
    "January","February","March","April","May","June","July","August","September","October","November","December"
  ];

  function groupByMonth(list: any[]) {
    const map = new Map<string, any[]>();
    for (const c of list) {
      const d = new Date(c.createdAt);
      const key = monthNames[d.getMonth()];
      const arr = map.get(key) ?? [];
      arr.push(c);
      map.set(key, arr);
    }
    return map;
  }

  const sortedYears = Array.from(byYear.entries()).sort((a, b) => Number(b[0]) - Number(a[0]));

  const now = new Date();
  const currentYear = String(now.getFullYear());
  const currentMonthName = monthNames[now.getMonth()];

  return (
    <div className="rounded-xl border overflow-hidden">
      <Accordion type="multiple" className="w-full" defaultValue={[currentYear] as any}>
        {sortedYears.map(([year, list]) => {
          const byMonth = Array.from(groupByMonth(list).entries()).sort((a, b) => monthNames.indexOf(b[0]) - monthNames.indexOf(a[0]));
          return (
            <AccordionItem key={year} value={year} className="border-b">
              <AccordionTrigger className="px-4 bg-muted/30">{year}</AccordionTrigger>
              <AccordionContent className="px-0">
                <Accordion type="multiple" defaultValue={year === currentYear ? ([`${currentYear}-${currentMonthName}`] as any) : undefined}>
                  {byMonth.map(([month, rows]) => (
                    <AccordionItem key={month} value={`${year}-${month}`} className="border-b">
                      <AccordionTrigger className="px-4">
                        <span className="inline-flex items-center gap-2">
                          {month}
                          <span className="text-xs px-2 py-0.5 rounded bg-muted">{rows.length}</span>
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="px-0">
                        <div className="overflow-x-auto">
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
                              {rows
                                .slice()
                                .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
                                .map((c) => (
                                  <tr key={c._id} className="border-t">
                                    <td className="p-3">{new Date(c.createdAt).toLocaleString()}</td>
                                    <td className="p-3">{(c as any).shopName || ""}</td>
                                    <td className="p-3">{c.customerFirstName} {c.customerLastName}</td>
                                    <td className="p-3 inline-flex items-center gap-2"><Car className="h-4 w-4" />{c.vehicleYear} {c.vehicleMake} {c.vehicleModel}</td>
                                    <td className="p-3">{c.vin}</td>
                                    <td className="p-3"><StatusBadge status={c.status} /></td>
                                    <td className="p-3 text-right">
                                      <Button variant="outline" size="sm" onClick={() => onSelect(c._id as any)}>Review</Button>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}

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


