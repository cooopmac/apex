"use client";

import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ClipboardList, FilePlus2, CheckCircle2, Clock, XCircle, ArrowRight, Settings2, Car } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const role = useQuery(api.users.getRole);

  useEffect(() => {
    if (role === "admin") {
      router.replace("/dashboard/admin");
    }
  }, [role, router]);

  return (
    <>
      <Authenticated>
        {role === undefined ? (
          <div className="p-6">Loading…</div>
        ) : role === "admin" ? null : (
          <UserDashboardHome />
        )}
      </Authenticated>
      <Unauthenticated>
        <AccessDenied />
      </Unauthenticated>
    </>
  );
}

function UserDashboardHome() {
  const { user } = useUser();
  const shop = useQuery(api.shops.getForCurrentUser);
  const claims = useQuery(api.claims.listForCurrentUser);

  const stats = useMemo(() => {
    if (!claims) return { total: 0, pending: 0, approved: 0, rejected: 0 };
    const approved = claims.filter((c) => c.status === "approved").length;
    const rejected = claims.filter((c) => c.status === "rejected").length;
    const pending = claims.filter((c) => c.status === "submitted" || c.status === "review").length;
    return { total: claims.length, pending, approved, rejected };
  }, [claims]);

  if (shop === undefined || claims === undefined) {
    return <div className="p-6">Loading…</div>;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.firstName}!</h1>
        <p className="text-muted-foreground">{shop ? `Shop: ${shop.serviceFacilityName}` : ""}</p>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickAction href="/dashboard/submit-claim" label="Submit a Claim" icon={<FilePlus2 className="h-5 w-5" />} />
        <QuickAction href="/dashboard/claims" label="View Claims" icon={<ClipboardList className="h-5 w-5" />} />
        <QuickAction href="/dashboard/profile" label="Edit Profile" icon={<Settings2 className="h-5 w-5" />} />
        <QuickAction href="/dashboard/claims" label="Pending Approvals" icon={<Clock className="h-5 w-5" />} badge={stats.pending} />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Claims" value={stats.total} icon={<ClipboardList className="h-5 w-5" />} />
        <StatCard title="Pending" value={stats.pending} icon={<Clock className="h-5 w-5" />} accent="bg-yellow-50 text-yellow-700" />
        <StatCard title="Approved" value={stats.approved} icon={<CheckCircle2 className="h-5 w-5" />} accent="bg-green-50 text-green-700" />
        <StatCard title="Not Approved" value={stats.rejected} icon={<XCircle className="h-5 w-5" />} accent="bg-red-50 text-red-700" />
      </div>

      {/* Recent claims */}
      <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
        <div className="p-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Recent Claims</h2>
            <p className="text-sm text-muted-foreground">Your 5 most recent submissions</p>
          </div>
          <Link href="/dashboard/claims" className="text-sm text-primary inline-flex items-center gap-1">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <Separator />
        {claims.length === 0 ? (
          <div className="p-8 text-sm text-muted-foreground">No claims yet. Get started by submitting your first claim.</div>
        ) : (
          <div className="overflow-x-auto">
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
                {claims
                  .slice()
                  .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
                  .slice(0, 5)
                  .map((c) => (
                    <tr key={c._id} className="border-t">
                      <td className="p-3">{new Date(c.createdAt).toLocaleString()}</td>
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
      </div>

      {/* Helpful info */}
      <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-4">
        <h3 className="font-semibold mb-2">Required documents reminder</h3>
        <p className="text-sm text-muted-foreground">When submitting a claim, be ready to attach: Original Invoice, Original Part Order, Repair Invoice, and Repair Part Order.</p>
      </div>
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

function QuickAction({ href, label, icon, badge }: { href: string; label: string; icon: React.ReactNode; badge?: number }) {
  return (
    <Link href={href} className="rounded-xl border bg-card text-card-foreground shadow-sm p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center rounded-md bg-muted h-9 w-9">{icon}</span>
          <span className="font-medium">{label}</span>
        </div>
        {typeof badge === "number" && (
          <span className="text-xs px-2 py-0.5 rounded bg-muted">{badge}</span>
        )}
      </div>
    </Link>
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

function AccessDenied() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p className="text-gray-600">Please sign in to access the dashboard.</p>
      </div>
    </div>
  );
}
