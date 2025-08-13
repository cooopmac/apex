import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    role: v.union(v.literal("admin"), v.literal("user")),
    createdAt: v.string(),
  }).index("by_clerkId", ["clerkId"]),


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
    // Admin-only reference for payouts
    accountNumber: v.optional(v.string()),
    createdAt: v.string(),
    updatedAt: v.string(),
  }).index("by_userId", ["userId"]),

  claims: defineTable({
    userId: v.id("users"),
    shopId: v.id("shops"),

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
    drivetrain: v.union(
      v.literal("2WD"),
      v.literal("4WD"),
      v.literal("AWD")
    ),
    inBayDefect: v.boolean(),
    defectReason: v.string(),
    numberOfParts: v.number(),

    // Attachments metadata only (files not stored yet)
    attachments: v.array(
      v.object({
        label: v.string(),
        fileName: v.string(),
      })
    ),

    status: v.union(
      v.literal("submitted"),
      v.literal("review"),
      v.literal("approved"),
      v.literal("rejected")
    ),
    createdAt: v.string(),
  }).index("by_userId", ["userId"]).index("by_shopId", ["shopId"]),

  // Admin-only: Monthly Statements file storage
  statementFiles: defineTable({
    year: v.number(),
    month: v.number(), // 1-12
    name: v.string(),
    storageId: v.id("_storage"),
    createdAt: v.string(),
  }).index("by_year_month", ["year", "month"]),

  // Admin-only: Editable monthly sheet (simple grid of strings)
  monthlySheets: defineTable({
    year: v.number(),
    month: v.number(), // 1-12
    cells: v.array(v.array(v.string())),
    updatedAt: v.string(),
  }).index("by_year_month", ["year", "month"]),
});
