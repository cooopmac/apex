import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    createdAt: v.string(),
  }).index("by_clerkId", ["clerkId"]),

  messages: defineTable({
    author: v.string(),
    body: v.string(),
  }),
});
