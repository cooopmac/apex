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

    if (!existing) {
      await ctx.db.insert("shops", {
        userId: user._id,
        ...args,
        createdAt: now,
        updatedAt: now,
      });
      return { created: true };
    }

    await ctx.db.patch(existing._id, { ...args, updatedAt: now });
    return { created: false };
  },
});

export const listAll = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const currentUser = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!currentUser || currentUser.role !== "admin") {
      throw new Error("Forbidden");
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
      updatedAt: new Date().toISOString(),
    });

    return { ok: true };
  },
});


