import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    role: v.union(v.literal("admin"), v.literal("user")),
    createdAt: v.string(),
  }).index("by_clerkId", ["clerkId"]),

  messages: defineTable({
    author: v.string(),
    body: v.string(),
  }),

  shops: defineTable({
    userId: v.id("users"),
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
    createdAt: v.string(),
    updatedAt: v.string(),
  }).index("by_userId", ["userId"]),
});
