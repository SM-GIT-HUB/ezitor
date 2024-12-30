import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

export const syncUser = mutation({
    args: { userId: v.string(), name: v.string(), email: v.string() },
    handler: async(ctx, args) => {
        const user = await ctx.db.query("users").withIndex("by_user_id").filter(q => q.eq(q.field("userId"), args.userId)).first();

        if (!user)
        {
            await ctx.db.insert("users", {
                userId: args.userId,
                email: args.email,
                name: args.name,
                isPro: false
            })
        }
    }
})

export const getUser = query({
    args: { userId: v.string() },
    handler: async(ctx, args) => {
        if (!args.userId) {
            return null;
        }

        const user = await ctx.db.query("users").withIndex("by_user_id").filter((q) => q.eq(q.field("userId"), args.userId)).first();

        if (!user) {
            return null;
        }

        return user;
    }
})

export const getUserStats = query({
    args: { userId: v.string() },
    handler: async(ctx, args) => {
        const [executions, starredSnippets] = await Promise.all([
            ctx.db.query("codeExecutions").withIndex("by_user_id").filter((q) => q.eq(q.field("userId"), args.userId)).collect(),
            ctx.db.query("stars").withIndex("by_user_id").filter((q) => q.eq(q.field("userId"), args.userId)).collect()
        ])

        const snippetIds = starredSnippets.map((star) => star.snippetId);
        const snippetDetails = await Promise.all(snippetIds.map((id) => ctx.db.get(id)));

        const starredLanguages = snippetDetails.filter(Boolean).reduce(
            (acc, curr) => {
                if (curr?.language) {
                    acc[curr.language] = (acc[curr.language] || 0) + 1;
                }

                return acc;
            },
            {} as Record<string, number>
        )

        const mostStarredLanguage = Object.entries(starredLanguages).sort(([, a], [, b]) => b - a)[0]?.[0] ?? "NA";

        const last24Hours = executions.filter((e) => e._creationTime > Date.now() - 24 * 60 * 60 * 1000).length;

        const languageStats = executions.reduce(
            (acc, curr) => {
                acc[curr.language] = (acc[curr.language] || 0) + 1;
                return acc;
            },
            {} as Record<string, number>
        )

        const languages = Object.keys(languageStats);
        
        const favouriteLanguage = languages.length? languages.reduce((a, b) => (languageStats[a] > languageStats[b] ? a : b)) : "NA";

        return {
            totalExecutions: executions.length,
            languagesCount: languages.length,
            languages,
            last24Hours,
            favouriteLanguage,
            languageStats,
            mostStarredLanguage
        }
    }
})