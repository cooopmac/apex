import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

function requireAdmin() {
  return async (ctx: any) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    const currentUser = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q: any) => q.eq("clerkId", identity.subject))
      .unique();
    if (!currentUser || currentUser.role !== "admin") throw new Error("Forbidden");
    return currentUser;
  };
}

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    await requireAdmin()(ctx);
    const url = await ctx.storage.generateUploadUrl();
    return { url };
  },
});

export const addFile = mutation({
  args: { year: v.number(), month: v.number(), name: v.string(), storageId: v.id("_storage") },
  handler: async (ctx, { year, month, name, storageId }) => {
    await requireAdmin()(ctx);
    const id = await ctx.db.insert("statementFiles", {
      year,
      month,
      name,
      storageId,
      createdAt: new Date().toISOString(),
    });
    return { id };
  },
});

export const listYears = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin()(ctx);
    const files = await ctx.db.query("statementFiles").collect();
    const sheets = await ctx.db.query("monthlySheets").collect();
    const years = Array.from(new Set([...files.map((f: any) => f.year), ...sheets.map((s: any) => s.year)])).sort((a, b) => b - a);
    return years;
  },
});

export const listForMonth = query({
  args: { year: v.number(), month: v.number() },
  handler: async (ctx, { year, month }) => {
    await requireAdmin()(ctx);
    const files = await ctx.db
      .query("statementFiles")
      .withIndex("by_year_month", (q: any) => q.eq("year", year).eq("month", month))
      .collect();
    const sheet = await ctx.db
      .query("monthlySheets")
      .withIndex("by_year_month", (q: any) => q.eq("year", year).eq("month", month))
      .unique();
    const filesWithUrl = await Promise.all(
      files.map(async (f: any) => ({
        ...f,
        url: await ctx.storage.getUrl(f.storageId),
      }))
    );
    return { files: filesWithUrl, sheet } as const;
  },
});

export const upsertSheet = mutation({
  args: { year: v.number(), month: v.number(), cells: v.array(v.array(v.string())) },
  handler: async (ctx, { year, month, cells }) => {
    await requireAdmin()(ctx);
    const existing = await ctx.db
      .query("monthlySheets")
      .withIndex("by_year_month", (q: any) => q.eq("year", year).eq("month", month))
      .unique();
    if (!existing) {
      await ctx.db.insert("monthlySheets", { year, month, cells, updatedAt: new Date().toISOString() });
      return { created: true };
    }
    await ctx.db.patch(existing._id, { cells, updatedAt: new Date().toISOString() });
    return { created: false };
  },
});

export const copyLastMonth = mutation({
  args: { fromYear: v.number(), fromMonth: v.number(), toYear: v.number(), toMonth: v.number() },
  handler: async (ctx, { fromYear, fromMonth, toYear, toMonth }) => {
    await requireAdmin()(ctx);
    const source = await ctx.db
      .query("monthlySheets")
      .withIndex("by_year_month", (q: any) => q.eq("year", fromYear).eq("month", fromMonth))
      .unique();
    const sourceCells = source?.cells ?? [];
    const target = await ctx.db
      .query("monthlySheets")
      .withIndex("by_year_month", (q: any) => q.eq("year", toYear).eq("month", toMonth))
      .unique();
    if (!target) {
      await ctx.db.insert("monthlySheets", { year: toYear, month: toMonth, cells: sourceCells, updatedAt: new Date().toISOString() });
    } else {
      await ctx.db.patch(target._id, { cells: sourceCells, updatedAt: new Date().toISOString() });
    }
    return { ok: true };
  },
});


