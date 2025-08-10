// convex/users.ts
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const ensureUserRecord = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const clerkId = identity.subject;
    const email = identity.email; // Clerk gives you this

    const existing = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkId))
      .unique();

    if (!existing) {
      await ctx.db.insert("users", {
        clerkId,
        email: email || "",
        createdAt: new Date().toISOString(),
      });
    }
  },
});
