"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";

const monthNames = [
  "January","February","March","April","May","June","July","August","September","October","November","December"
];

export default function YearStatementsPage() {
  const params = useParams() as { year: string };
  const year = Number(params.year);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">{year} Statement Information</h1>
        <p className="text-muted-foreground">Open a month to upload work orders and edit the monthly sheet.</p>
      </div>
      <Separator />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {monthNames.map((m, idx) => (
          <Link key={m} href={`/dashboard/admin/statements/${year}/${idx + 1}`} className="rounded-xl border p-4 hover:shadow-sm transition-shadow">
            <div className="font-medium">{idx + 1}. {m}</div>
            <div className="text-sm text-muted-foreground">Manage files and sheet</div>
          </Link>
        ))}
      </div>
    </div>
  );
}


