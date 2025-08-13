"use client";

import * as React from "react";
import { Authenticated } from "convex/react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, Mail, MapPin, User, DollarSign, Tag } from "lucide-react";

export default function AdminShopsPage() {
  const [search, setSearch] = React.useState("");
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Registered Shops</h1>
          <p className="text-muted-foreground">View and manage registered shops.</p>
        </div>
        <div className="w-64">
          <label className="block text-sm font-medium mb-1">Search</label>
          <Input
            placeholder="Search shops..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <Separator />
      <Authenticated>
        <ShopsAdminView search={search} />
      </Authenticated>
    </div>
  );
}

function ShopsAdminView({ search }: { search: string }) {
  const shops = useQuery(api.shops.listAll);
  const updateShop = useMutation(api.shops.adminUpdate);
  const [selected, setSelected] = React.useState<any | null>(null);

  const filtered = React.useMemo(() => {
    if (!shops) return [];
    const term = search.toLowerCase();
    return shops.filter((s) =>
      [
        s.serviceFacilityName,
        s.city,
        s.provinceTerritory,
        s.postalCode,
        s.phoneNumber,
        s.contactEmail,
        s.etransferEmail,
        s.ownerName,
        s.mainContactName,
        s.bestbuyDistributor,
        s.doorRate,
        s.ownerEmail,
      ]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(term))
    );
  }, [shops, search]);

  return (
    <>
      {shops === undefined ? (
        <div className="min-h-[30vh] grid place-items-center">Loading…</div>
      ) : filtered.length === 0 ? (
        <div className="text-muted-foreground">No shops found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((s) => (
            <Sheet key={s._id}>
              <SheetTrigger asChild>
                <button
                  className="text-left w-full rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow p-4"
                  onClick={() => setSelected(s)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center rounded-md bg-muted h-9 w-9">
                        <Building2 className="h-5 w-5" />
                      </span>
                      <div>
                        <div className="font-medium leading-tight">{s.serviceFacilityName}</div>
                        <div className="text-xs text-muted-foreground">Owner: {s.ownerName}</div>
                      </div>
                    </div>
                    <div className="text-xs font-mono rounded border px-2 py-0.5 bg-muted">
                      {s.accountNumber ?? "—"}
                    </div>
                  </div>

                  <div className="mt-3 flex flex-col gap-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>
                        {s.city}, {s.provinceTerritory}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span className="truncate">{s.contactEmail}</span>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-2 text-xs">
                    <span className="inline-flex items-center gap-1 rounded-md border px-2 py-1 bg-secondary">
                      <DollarSign className="h-3 w-3" /> {s.doorRate}
                    </span>
                    {s.bestbuyDistributor && (
                      <span className="inline-flex items-center gap-1 rounded-md border px-2 py-1">
                        <Tag className="h-3 w-3" /> {s.bestbuyDistributor}
                      </span>
                    )}
                  </div>
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="sm:max-w-xl">
                <SheetHeader>
                  <SheetTitle>Edit shop</SheetTitle>
                </SheetHeader>
                {selected?._id === s._id && (
                  <EditShopForm
                    key={s._id}
                    initial={s}
                    onSave={async (data) => {
                      await updateShop({ shopId: s._id, ...data });
                    }}
                  />
                )}
              </SheetContent>
            </Sheet>
          ))}
        </div>
      )}
    </>
  );
}

const formSchema = z.object({
  serviceFacilityName: z.string().min(1),
  streetAddress: z.string().min(1),
  city: z.string().min(1),
  provinceTerritory: z.string().min(1),
  postalCode: z
    .string()
    .regex(/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/, "Invalid Canadian postal code"),
  phoneNumber: z.string().min(7).max(20),
  contactEmail: z.string().email(),
  etransferEmail: z.string().email(),
  ownerName: z.string().min(1),
  mainContactName: z.string().min(1),
  bestbuyDistributor: z.string().min(1),
  doorRate: z.string().min(1),
  acknowledgement: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

function EditShopForm({
  initial,
  onSave,
}: {
  initial: any;
  onSave: (values: FormValues) => Promise<void>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serviceFacilityName: initial.serviceFacilityName,
      streetAddress: initial.streetAddress,
      city: initial.city,
      provinceTerritory: initial.provinceTerritory,
      postalCode: initial.postalCode,
      phoneNumber: initial.phoneNumber,
      contactEmail: initial.contactEmail,
      etransferEmail: initial.etransferEmail,
      ownerName: initial.ownerName,
      mainContactName: initial.mainContactName,
      bestbuyDistributor: initial.bestbuyDistributor,
      doorRate: initial.doorRate,
      acknowledgement: initial.acknowledgement,
    },
  });

  React.useEffect(() => {
    reset({
      serviceFacilityName: initial.serviceFacilityName,
      streetAddress: initial.streetAddress,
      city: initial.city,
      provinceTerritory: initial.provinceTerritory,
      postalCode: initial.postalCode,
      phoneNumber: initial.phoneNumber,
      contactEmail: initial.contactEmail,
      etransferEmail: initial.etransferEmail,
      ownerName: initial.ownerName,
      mainContactName: initial.mainContactName,
      bestbuyDistributor: initial.bestbuyDistributor,
      doorRate: initial.doorRate,
      acknowledgement: initial.acknowledgement,
    });
  }, [initial, reset]);

  return (
    <form
      onSubmit={handleSubmit(async (v) => {
        await onSave(v);
      })}
      className="p-4 space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Service facility name</label>
          <Input {...register("serviceFacilityName")} aria-invalid={!!errors.serviceFacilityName} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Street address</label>
          <Input {...register("streetAddress")} aria-invalid={!!errors.streetAddress} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">City</label>
          <Input {...register("city")} aria-invalid={!!errors.city} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Province/Territory</label>
          <Input {...register("provinceTerritory")} aria-invalid={!!errors.provinceTerritory} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Postal code</label>
          <Input {...register("postalCode")} aria-invalid={!!errors.postalCode} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone number</label>
          <Input {...register("phoneNumber")} aria-invalid={!!errors.phoneNumber} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Contact email</label>
          <Input type="email" {...register("contactEmail")} aria-invalid={!!errors.contactEmail} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">E-transfer email</label>
          <Input type="email" {...register("etransferEmail")} aria-invalid={!!errors.etransferEmail} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Owner name</label>
          <Input {...register("ownerName")} aria-invalid={!!errors.ownerName} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Main contact name</label>
          <Input {...register("mainContactName")} aria-invalid={!!errors.mainContactName} />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Bestbuy Distributor</label>
          <Input {...register("bestbuyDistributor")} aria-invalid={!!errors.bestbuyDistributor} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Door rate</label>
          <Input {...register("doorRate")} aria-invalid={!!errors.doorRate} />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Button type="submit" disabled={isSubmitting}>Save changes</Button>
      </div>
    </form>
  );
}

