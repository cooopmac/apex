import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getForCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();
    if (!user) return null;

    const shop = await ctx.db
      .query("shops")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .unique();
    return shop ?? null;
  },
});

export const upsertForCurrentUser = mutation({
  args: {
    serviceFacilityName: v.string(),
    streetAddress: v.string(),
    city: v.string(),
    provinceTerritory: v.string(),
    postalCode: v.string(),
    phoneNumber: v.string(),
    contactEmail: v.string(),
    etransferEmail: v.string(),
    ownerName: v.string(),
    mainContactName: v.string(),
    bestbuyDistributor: v.string(),
    doorRate: v.string(),
    acknowledgement: v.boolean(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();
    if (!user) throw new Error("User record not found");

    const now = new Date().toISOString();
    const existing = await ctx.db
      .query("shops")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .unique();

    // Generate account number from province initials and last 3 chars of postal code
    const accountNumber = generateAccountNumber(args.provinceTerritory, args.postalCode);

    if (!existing) {
      await ctx.db.insert("shops", {
        userId: user._id,
        ...args,
        accountNumber,
        createdAt: now,
        updatedAt: now,
      });
      return { created: true };
    }

    await ctx.db.patch(existing._id, { ...args, accountNumber, updatedAt: now });
    return { created: false };
  },
});

export const listAll = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const currentUser = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!currentUser || currentUser.role !== "admin") {
      return [];
    }

    const shops = await ctx.db.query("shops").collect();

    const shopsWithOwner = await Promise.all(
      shops.map(async (shop) => {
        const owner = await ctx.db.get(shop.userId);
        return {
          ...shop,
          ownerEmail: owner?.email ?? "",
          ownerRole: owner?.role ?? "user",
        } as const;
      })
    );

    return shopsWithOwner;
  },
});

export const adminUpdate = mutation({
  args: {
    shopId: v.id("shops"),
    serviceFacilityName: v.string(),
    streetAddress: v.string(),
    city: v.string(),
    provinceTerritory: v.string(),
    postalCode: v.string(),
    phoneNumber: v.string(),
    contactEmail: v.string(),
    etransferEmail: v.string(),
    ownerName: v.string(),
    mainContactName: v.string(),
    bestbuyDistributor: v.string(),
    doorRate: v.string(),
    acknowledgement: v.boolean(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const currentUser = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!currentUser || currentUser.role !== "admin") {
      throw new Error("Forbidden");
    }

    const accountNumber = generateAccountNumber(args.provinceTerritory, args.postalCode);

    await ctx.db.patch(args.shopId, {
      serviceFacilityName: args.serviceFacilityName,
      streetAddress: args.streetAddress,
      city: args.city,
      provinceTerritory: args.provinceTerritory,
      postalCode: args.postalCode,
      phoneNumber: args.phoneNumber,
      contactEmail: args.contactEmail,
      etransferEmail: args.etransferEmail,
      ownerName: args.ownerName,
      mainContactName: args.mainContactName,
      bestbuyDistributor: args.bestbuyDistributor,
      doorRate: args.doorRate,
      acknowledgement: args.acknowledgement,
      accountNumber,
      updatedAt: new Date().toISOString(),
    });

    return { ok: true };
  },
});

function generateAccountNumber(provinceTerritory: string, postalCode: string): string {
  const province = String(provinceTerritory || "").replace(/[^A-Za-z]/g, "").toUpperCase();
  // Map full names to abbreviations if needed (fallback: first 2 letters)
  const map: Record<string, string> = {
    ALBERTA: "AB",
    BRITISHCOLUMBIA: "BC",
    MANITOBA: "MB",
    NEWBRUNSWICK: "NB",
    NEWFOUNDLANDANDLABRADOR: "NL",
    NOVASCOTIA: "NS",
    NORTHWESTTERRITORIES: "NT",
    NUNAVUT: "NU",
    ONTARIO: "ON",
    PRINCEEDWARDISLAND: "PE",
    QUEBEC: "QC",
    SASKATCHEWAN: "SK",
    YUKON: "YT",
  };
  const prov = map[province] || province.slice(0, 2);
  const lastThree = String(postalCode || "").replace(/\s+/g, "").slice(-3).toUpperCase();
  return `${prov}${lastThree}`;
}


