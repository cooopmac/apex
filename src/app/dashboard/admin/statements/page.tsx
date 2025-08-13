"use client";

import * as React from "react";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";
import { Minus, Plus } from "lucide-react";

export default function StatementsIndexPage() {
  const years = useQuery((api as any).statements?.listYears || ({} as any));
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const monthNames = useMemo(
    () => [
      "January","February","March","April","May","June","July","August","September","October","November","December"
    ],
    []
  );
  const [selectedYear, setSelectedYear] = React.useState(currentYear);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Monthly Statements</h1>
        <p className="text-muted-foreground">Pick a year and month to upload work orders and edit the monthly sheet.</p>
      </div>
      <Separator />
      {/* Quick start: jump straight into current year/months */}
      <section className="space-y-3">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <h2 className="text-lg font-medium">Quick start</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setSelectedYear((y) => y - 1)} aria-label="Previous year">
              <Minus className="h-4 w-4" />
            </Button>
            <input
              type="number"
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value || currentYear))}
              className="h-9 w-24 px-2 rounded-md border bg-background text-center no-spinner"
            />
            <Button variant="outline" onClick={() => setSelectedYear((y) => y + 1)} aria-label="Next year">
              <Plus className="h-4 w-4" />
            </Button>
            <Link href={`/dashboard/admin/statements/${selectedYear}`}>
              <Button variant="outline">Open {selectedYear} folder</Button>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {monthNames.map((m, i) => (
            <Link
              key={m}
              href={`/dashboard/admin/statements/${selectedYear}/${i + 1}`}
              className="rounded-lg border p-3 hover:shadow-sm transition-shadow"
            >
              <div className="text-sm font-medium truncate">{i + 1}. {m}</div>
              <div className="text-xs text-muted-foreground">Upload files · Edit sheet</div>
            </Link>
          ))}
        </div>
      </section>

      {years === undefined ? (
        <div className="p-6">Loading…</div>
      ) : years.length === 0 ? (
        <div className="space-y-4">
          <div className="text-muted-foreground">No existing folders yet. Use Quick start above to begin with {selectedYear}.</div>
          <div>
            <Link href={`/dashboard/admin/statements/${selectedYear}`}>
              <Button>Go to {selectedYear}</Button>
            </Link>
          </div>
        </div>
      ) : (
        <section className="space-y-3">
          <h2 className="text-lg font-medium">Existing years</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {years.map((y: number) => (
              <Link key={y} href={`/dashboard/admin/statements/${y}`} className="rounded-xl border p-4 hover:shadow-sm transition-shadow">
                <div className="font-medium">{y} Statement Information</div>
                <div className="text-sm text-muted-foreground">Open to view months</div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}


