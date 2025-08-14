"use client";

import * as React from "react";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ClipboardList, CheckCircle2, XCircle, Store, FileText, Car, ArrowRight, TrendingUp } from "lucide-react";

export default function AdminOverviewPage() {
  const claims = useQuery((api as any).claims?.listAllForAdmin || ({} as any));
  const shops = useQuery(api.shops.listAll);

  const stats = React.useMemo(() => {
    const s = { total: 0, pending: 0, approved: 0, rejected: 0 };
    if (!claims) return s;
    s.total = claims.length;
    s.approved = claims.filter((c: any) => c.status === "approved").length;
    s.rejected = claims.filter((c: any) => c.status === "rejected").length;
    s.pending = claims.filter((c: any) => c.status === "submitted" || c.status === "review").length;
    return s;
  }, [claims]);

  const recentClaims = React.useMemo(() => {
    if (!claims) return [] as any[];
    return claims.slice().sort((a: any, b: any) => (a.createdAt < b.createdAt ? 1 : -1)).slice(0, 8);
  }, [claims]);

  const pendingOldestFirst = React.useMemo(() => {
    if (!claims) return [] as any[];
    return claims
      .filter((c: any) => c.status === "submitted" || c.status === "review")
      .slice()
      .sort((a: any, b: any) => (a.createdAt < b.createdAt ? -1 : 1))
      .slice(0, 8);
  }, [claims]);

  const currentYear = new Date().getFullYear();
  const byMonth = React.useMemo(() => {
    const months = Array.from({ length: 12 }, () => 0);
    if (!claims) return months;
    for (const c of claims) {
      const d = new Date(c.createdAt);
      if (d.getFullYear() === currentYear) months[d.getMonth()] += 1;
    }
    return months;
  }, [claims, currentYear]);

  return (
    <div className="space-y-8">
      {/* Header & quick actions */}
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Monitor claims, shops, and statements at a glance.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link href="/dashboard/admin/claims"><Button className="inline-flex items-center gap-2"><ClipboardList className="h-4 w-4" /> Claims Queue</Button></Link>
          <Link href="/dashboard/admin/claims/all"><Button variant="outline" className="inline-flex items-center gap-2"><FileText className="h-4 w-4" /> All Claims</Button></Link>
          <Link href="/dashboard/admin/shops"><Button variant="outline" className="inline-flex items-center gap-2"><Store className="h-4 w-4" /> Shops</Button></Link>
          <Link href="/dashboard/admin/statements"><Button variant="outline" className="inline-flex items-center gap-2"><FileText className="h-4 w-4" /> Statements</Button></Link>
        </div>
      </div>
      <Separator />

      {/* KPI cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
        <StatCard title="Total Claims" value={stats.total} icon={<ClipboardList className="h-5 w-5" />} />
        <StatCard title="Pending" value={stats.pending} icon={<TrendingUp className="h-5 w-5" />} accent="bg-yellow-50 text-yellow-700" />
        <StatCard title="Approved" value={stats.approved} icon={<CheckCircle2 className="h-5 w-5" />} accent="bg-green-50 text-green-700" />
        <StatCard title="Not Approved" value={stats.rejected} icon={<XCircle className="h-5 w-5" />} accent="bg-red-50 text-red-700" />
        <StatCard title="Registered Shops" value={shops?.length ?? 0} icon={<Store className="h-5 w-5" />} />
      </section>

      {/* Monthly snapshot */}
      <section className="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div className="p-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">{currentYear} Snapshot</h2>
            <p className="text-sm text-muted-foreground">Claims per month</p>
          </div>
          <Link href="/dashboard/admin/claims/all" className="text-sm text-primary inline-flex items-center gap-1">View all <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <Separator />
        <div className="p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {monthNames.map((m, i) => (
            <div key={m} className="rounded-lg border p-3">
              <div className="text-xs text-muted-foreground">{m}</div>
              <div className="text-2xl font-semibold">{byMonth[i]}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Pending queue preview */}
      <section className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
        <div className="p-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Pending queue</h2>
            <p className="text-sm text-muted-foreground">Oldest 8 items</p>
          </div>
          <Link href="/dashboard/admin/claims" className="text-sm text-primary inline-flex items-center gap-1">Open queue <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <Separator />
        {claims === undefined ? (
          <div className="p-8">Loading…</div>
        ) : pendingOldestFirst.length === 0 ? (
          <div className="p-8 text-sm text-muted-foreground">No pending claims.</div>
        ) : (
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
                </tr>
              </thead>
              <tbody>
                {pendingOldestFirst.map((c: any) => (
                  <tr key={c._id} className="border-t">
                    <td className="p-3">{new Date(c.createdAt).toLocaleString()}</td>
                    <td className="p-3">{(c as any).shopName || ""}</td>
                    <td className="p-3">{c.customerFirstName} {c.customerLastName}</td>
                    <td className="p-3 inline-flex items-center gap-2"><Car className="h-4 w-4" />{c.vehicleYear} {c.vehicleMake} {c.vehicleModel}</td>
                    <td className="p-3">{c.vin}</td>
                    <td className="p-3"><StatusBadge status={c.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Recent claims */}
      <section className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
        <div className="p-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Recent claims</h2>
            <p className="text-sm text-muted-foreground">Most recent 8</p>
          </div>
          <Link href="/dashboard/admin/claims/all" className="text-sm text-primary inline-flex items-center gap-1">View all <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <Separator />
        {claims === undefined ? (
          <div className="p-8">Loading…</div>
        ) : recentClaims.length === 0 ? (
          <div className="p-8 text-sm text-muted-foreground">No claims yet.</div>
        ) : (
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
                </tr>
              </thead>
              <tbody>
                {recentClaims.map((c: any) => (
                  <tr key={c._id} className="border-t">
                    <td className="p-3">{new Date(c.createdAt).toLocaleString()}</td>
                    <td className="p-3">{(c as any).shopName || ""}</td>
                    <td className="p-3">{c.customerFirstName} {c.customerLastName}</td>
                    <td className="p-3 inline-flex items-center gap-2"><Car className="h-4 w-4" />{c.vehicleYear} {c.vehicleMake} {c.vehicleModel}</td>
                    <td className="p-3">{c.vin}</td>
                    <td className="p-3"><StatusBadge status={c.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Shops highlight */}
      <section className="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div className="p-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Shops</h2>
            <p className="text-sm text-muted-foreground">Recently updated</p>
          </div>
          <Link href="/dashboard/admin/shops" className="text-sm text-primary inline-flex items-center gap-1">Manage shops <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <Separator />
        {shops === undefined ? (
          <div className="p-8">Loading…</div>
        ) : (shops?.length ?? 0) === 0 ? (
          <div className="p-8 text-sm text-muted-foreground">No shops yet.</div>
        ) : (
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {shops
              ?.slice()
              .sort((a: any, b: any) => (a.updatedAt < b.updatedAt ? 1 : -1))
              .slice(0, 6)
              .map((s: any) => (
                <div key={s._id} className="rounded-xl border p-4">
                  <div className="font-medium">{s.serviceFacilityName}</div>
                  <div className="text-xs text-muted-foreground">{s.city}, {s.provinceTerritory} · {s.postalCode}</div>
                  <div className="text-xs text-muted-foreground">Acct #: {s.accountNumber ?? "—"}</div>
                </div>
              ))}
          </div>
        )}
      </section>
    </div>
  );
}

function StatCard({ title, value, icon, accent }: { title: string; value: number | string; icon: React.ReactNode; accent?: string }) {
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
        <span className={`inline-flex items-center justify-center rounded-md h-10 w-10 ${accent ?? "bg-muted"}`}>{icon}</span>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: "submitted" | "review" | "approved" | "rejected" }) {
  const color =
    status === "approved" ? "bg-green-100 text-green-700" :
    status === "rejected" ? "bg-red-100 text-red-700" :
    "bg-yellow-100 text-yellow-700"; // submitted/review → pending
  const label =
    status === "approved" ? "Approved" :
    status === "rejected" ? "Denied" :
    "Pending";
  return <span className={`px-2 py-0.5 rounded text-xs font-medium ${color}`}>{label}</span>;
}

const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
