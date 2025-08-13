import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const listForCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();
    if (!user) return [];

    return await ctx.db
      .query("claims")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .collect();
  },
});

export const submit = mutation({
  args: {
    // Personal components
    businessName: v.string(),
    phoneNumber: v.string(),
    postalCode: v.string(),
    submitterName: v.string(),
    submitterEmail: v.string(),

    // Claim components
    customerFirstName: v.string(),
    customerLastName: v.string(),
    vehicleYear: v.string(),
    vehicleMake: v.string(),
    vehicleModel: v.string(),
    vin: v.string(),
    licensePlate: v.string(),
    originalMileage: v.string(),
    repairMileage: v.string(),
    drivetrain: v.union(v.literal("2WD"), v.literal("4WD"), v.literal("AWD")),
    inBayDefect: v.boolean(),
    defectReason: v.string(),
    numberOfParts: v.number(),

    attachments: v.array(
      v.object({ label: v.string(), fileName: v.string() })
    ),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();
    if (!user) throw new Error("User record not found");

    const shop = await ctx.db
      .query("shops")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .unique();
    if (!shop) throw new Error("Shop not found for user");

    const claimId = await ctx.db.insert("claims", {
      userId: user._id,
      shopId: shop._id,
      ...args,
      status: "submitted",
      createdAt: new Date().toISOString(),
    });

    return { claimId };
  },
});

export const listPendingForAdmin = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const currentUser = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();
    if (!currentUser || currentUser.role !== "admin") return [];

    const all = await ctx.db.query("claims").collect();
    const pending = all
      .filter((c) => c.status === "submitted" || c.status === "review")
      .sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1)); // oldest first

    // Attach shopName for quick display in table (prefer shopId, fallback via userId for legacy rows)
    const withShopName = await Promise.all(
      pending.map(async (c) => {
        let shop = null as any;
        if (c.shopId) {
          shop = await ctx.db.get(c.shopId as any);
        }
        if (!shop && c.userId) {
          shop = await ctx.db
            .query("shops")
            .withIndex("by_userId", (q) => q.eq("userId", c.userId))
            .unique();
        }
        const shopName = shop?.serviceFacilityName ?? "";
        return { ...c, shopName } as const;
      })
    );

    return withShopName;
  },
});

export const listAllForAdmin = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const currentUser = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();
    if (!currentUser || currentUser.role !== "admin") return [];

    const all = await ctx.db.query("claims").collect();
    const sorted = all.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)); // newest first

    const enriched = await Promise.all(
      sorted.map(async (c) => {
        let shop = null as any;
        if (c.shopId) {
          shop = await ctx.db.get(c.shopId as any);
        }
        if (!shop && c.userId) {
          shop = await ctx.db
            .query("shops")
            .withIndex("by_userId", (q) => q.eq("userId", c.userId))
            .unique();
        }
        const shopName = shop?.serviceFacilityName ?? "";
        return { ...c, shopName } as const;
      })
    );

    return enriched;
  },
});

export const getByIdForAdmin = query({
  args: { claimId: v.id("claims") },
  handler: async (ctx, { claimId }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const currentUser = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();
    if (!currentUser || currentUser.role !== "admin") return null;

    const claim = await ctx.db.get(claimId);
    if (!claim) return null;

    // Prefer direct lookup by shopId, but gracefully fallback to using userId for legacy rows
    let shop = null as any;
    if ((claim as any).shopId) {
      shop = await ctx.db.get((claim as any).shopId);
    }
    if (!shop && (claim as any).userId) {
      shop = await ctx.db
        .query("shops")
        .withIndex("by_userId", (q) => q.eq("userId", (claim as any).userId))
        .unique();
    }

    const user = await ctx.db.get((claim as any).userId);
    return { claim, shop, user };
  },
});

export const setStatusForAdmin = mutation({
  args: { claimId: v.id("claims"), status: v.union(v.literal("approved"), v.literal("rejected")) },
  handler: async (ctx, { claimId, status }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const currentUser = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();
    if (!currentUser || currentUser.role !== "admin") throw new Error("Forbidden");

    await ctx.db.patch(claimId, { status });
    return { ok: true };
  },
});


