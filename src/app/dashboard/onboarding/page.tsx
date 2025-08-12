"use client";

import * as React from "react";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
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
  phoneNumber: z
    .string()
    .min(7, "Invalid phone")
    .max(20, "Invalid phone"),
  contactEmail: z.string().email("Invalid email"),
  etransferEmail: z.string().email("Invalid email"),
  ownerName: z.string().min(1, "Required"),
  mainContactName: z.string().min(1, "Required"),
  bestbuyDistributor: z.string().min(1, "Required"),
  doorRate: z.string().min(1, "Required"),
  acknowledgement: z
    .boolean()
    .refine((v) => v === true, { message: "You must acknowledge the terms" }),
});

type FormValues = z.infer<typeof schema>;

export default function OnboardingPage() {
  const router = useRouter();
  const { user } = useUser();
  const shop = useQuery(api.shops.getForCurrentUser);
  const upsertShop = useMutation(api.shops.upsertForCurrentUser);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
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
      acknowledgement: false,
    },
  });

  useEffect(() => {
    // Prefill from Clerk profile when available
    if (user) {
      if (user.emailAddresses?.[0]?.emailAddress) {
        setValue("contactEmail", user.emailAddresses[0].emailAddress);
        setValue("etransferEmail", user.emailAddresses[0].emailAddress);
      }
      const ownerName = [user.firstName, user.lastName].filter(Boolean).join(" ");
      if (ownerName) setValue("ownerName", ownerName);
      if (ownerName) setValue("mainContactName", ownerName);
    }
  }, [user, setValue]);

  useEffect(() => {
    if (shop) {
      // If shop already exists, skip onboarding
      router.replace("/dashboard");
    }
  }, [shop, router]);

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    await upsertShop(values);
    router.replace("/dashboard");
  };

  return (
    <div className="p-6">
      <div className="max-w-3xl mx-auto rounded-xl border bg-card text-card-foreground shadow-sm">
        <div className="p-6">
          <h1 className="text-2xl font-semibold">Complete your shop profile</h1>
          <p className="text-muted-foreground mt-1">Please provide your shop details to continue.</p>
        </div>
        <Separator />
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 pt-4 space-y-5">
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
                {[
                  "AB","BC","MB","NB","NL","NT","NS","NU","ON","PE","QC","SK","YT",
                ].map((p) => (
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

          <label className="flex items-start gap-2">
            <input type="checkbox" className="mt-1 h-4 w-4 rounded border" {...register("acknowledgement")} />
            <span className="text-sm text-muted-foreground">
              I have read the program outline and agree to its terms.
            </span>
          </label>
          {errors.acknowledgement && <p className="text-sm text-red-600 mt-1">{errors.acknowledgement.message}</p>}

          <div className="pt-2">
            <Button type="submit" disabled={isSubmitting}>Save and continue</Button>
          </div>
        </form>
      </div>
    </div>
  );
}


