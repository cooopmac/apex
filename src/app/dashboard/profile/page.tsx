"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const schema = z.object({
  serviceFacilityName: z.string().min(1, "Required"),
  streetAddress: z.string().min(1, "Required"),
  city: z.string().min(1, "Required"),
  provinceTerritory: z.string().min(1, "Required"),
  postalCode: z
    .string()
    .regex(/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/, "Invalid Canadian postal code"),
  phoneNumber: z.string().min(7, "Invalid phone").max(20, "Invalid phone"),
  contactEmail: z.string().email("Invalid email"),
  etransferEmail: z.string().email("Invalid email"),
  ownerName: z.string().min(1, "Required"),
  mainContactName: z.string().min(1, "Required"),
  bestbuyDistributor: z.string().min(1, "Required"),
  doorRate: z.string().min(1, "Required"),
  acknowledgement: z.boolean(),
});

type FormValues = z.infer<typeof schema>;

export default function ProfilePage() {
  const shop = useQuery(api.shops.getForCurrentUser);
  const upsertShop = useMutation(api.shops.upsertForCurrentUser);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      serviceFacilityName: "",
      streetAddress: "",
      city: "",
      provinceTerritory: "",
      postalCode: "",
      phoneNumber: "",
      contactEmail: "",
      etransferEmail: "",
      ownerName: "",
      mainContactName: "",
      bestbuyDistributor: "",
      doorRate: "",
      acknowledgement: true,
    },
  });

  React.useEffect(() => {
    if (shop) {
      reset({
        serviceFacilityName: shop.serviceFacilityName,
        streetAddress: shop.streetAddress,
        city: shop.city,
        provinceTerritory: shop.provinceTerritory,
        postalCode: shop.postalCode,
        phoneNumber: shop.phoneNumber,
        contactEmail: shop.contactEmail,
        etransferEmail: shop.etransferEmail,
        ownerName: shop.ownerName,
        mainContactName: shop.mainContactName,
        bestbuyDistributor: shop.bestbuyDistributor,
        doorRate: shop.doorRate,
        acknowledgement: shop.acknowledgement,
      });
    }
  }, [shop, reset]);

  const onSubmit = async (values: FormValues) => {
    await upsertShop(values);
    alert("Profile updated");
  };

  if (shop === undefined) {
    return <div className="p-6">Loading…</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Profile</h1>
        <p className="text-muted-foreground">Update your shop information.</p>
      </div>
      <Separator />

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1">Service facility name</label>
          <Input {...register("serviceFacilityName")} aria-invalid={!!errors.serviceFacilityName} />
          {errors.serviceFacilityName && <p className="text-sm text-red-600 mt-1">{errors.serviceFacilityName.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Street address</label>
            <Input {...register("streetAddress")} aria-invalid={!!errors.streetAddress} />
            {errors.streetAddress && <p className="text-sm text-red-600 mt-1">{errors.streetAddress.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <Input {...register("city")} aria-invalid={!!errors.city} />
            {errors.city && <p className="text-sm text-red-600 mt-1">{errors.city.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Province/Territory</label>
            <select className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]" {...register("provinceTerritory")} aria-invalid={!!errors.provinceTerritory}>
              <option value="">Select…</option>
              {["AB","BC","MB","NB","NL","NT","NS","NU","ON","PE","QC","SK","YT"].map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            {errors.provinceTerritory && <p className="text-sm text-red-600 mt-1">{errors.provinceTerritory.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Postal code</label>
            <Input {...register("postalCode")} aria-invalid={!!errors.postalCode} />
            {errors.postalCode && <p className="text-sm text-red-600 mt-1">{errors.postalCode.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Phone number</label>
            <Input {...register("phoneNumber")} aria-invalid={!!errors.phoneNumber} />
            {errors.phoneNumber && <p className="text-sm text-red-600 mt-1">{errors.phoneNumber.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Door rate</label>
            <Input {...register("doorRate")} aria-invalid={!!errors.doorRate} />
            {errors.doorRate && <p className="text-sm text-red-600 mt-1">{errors.doorRate.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Contact email</label>
            <Input type="email" {...register("contactEmail")} aria-invalid={!!errors.contactEmail} />
            {errors.contactEmail && <p className="text-sm text-red-600 mt-1">{errors.contactEmail.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">E-transfer email</label>
            <Input type="email" {...register("etransferEmail")} aria-invalid={!!errors.etransferEmail} />
            {errors.etransferEmail && <p className="text-sm text-red-600 mt-1">{errors.etransferEmail.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Owner name</label>
            <Input {...register("ownerName")} aria-invalid={!!errors.ownerName} />
            {errors.ownerName && <p className="text-sm text-red-600 mt-1">{errors.ownerName.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Main contact name</label>
            <Input {...register("mainContactName")} aria-invalid={!!errors.mainContactName} />
            {errors.mainContactName && <p className="text-sm text-red-600 mt-1">{errors.mainContactName.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Bestbuy Distributor</label>
          <Input {...register("bestbuyDistributor")} aria-invalid={!!errors.bestbuyDistributor} />
          {errors.bestbuyDistributor && <p className="text-sm text-red-600 mt-1">{errors.bestbuyDistributor.message}</p>}
        </div>

        <div className="pt-2">
          <Button type="submit" disabled={isSubmitting}>Save changes</Button>
        </div>
      </form>
    </div>
  );
}


