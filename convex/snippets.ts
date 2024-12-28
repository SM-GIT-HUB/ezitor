import { ConvexError, v } from "convex/values"
import { mutation, query } from "./_generated/server"

export const createSnippet = mutation({
    args: { title: v.string(), language: v.string(), code: v.string() },
    handler: async(ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        
        if (!identity) {
            throw new ConvexError("Not authenticated");
        }

        const user = await ctx.db.query("users").withIndex("by_user_id").filter((q) => q.eq(q.field("userId"), identity.subject)).first();

        if (!user) {
            throw new ConvexError("User not found");
        }

        const snippetId = await ctx.db.insert("snippets", {
            userId: identity.subject,
            username: user.name,
            ...args
        })

        return snippetId;
    }
})

export const getSnippets = query({
    handler: async(ctx) => {
        const snippets = await ctx.db.query("snippets").order("desc").collect();
        return snippets;
    }
})

export const isSnippetStarred = query({
    args: { snippetId: v.id("snippets") },
    handler: async(ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            return false;
        }

        const star = await ctx.db.query("stars").withIndex("by_user_id_and_snippet_id").filter((q) => q.eq(q.field("userId"), identity.subject) && q.eq(q.field("snippetId"), args.snippetId)).first();

        return !!star;
    }
})

export const getSnippetStarCount = query({
    args: { snippetId: v.id("snippets") },
    handler: async(ctx, args) => {
        const stars = await ctx.db.query("stars").withIndex("by_snippet_id").filter((q) => q.eq(q.field("snippetId"), args.snippetId)).collect();

        return stars.length;
    }
})

export const deleteSnippet = mutation({
    args: { snippetId: v.id("snippets") },
    handler: async(ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new ConvexError("Not authenticated");
        }

        const [user, snippet] = await Promise.all([
            ctx.db.query("users").withIndex("by_user_id").filter((q) => q.eq(q.field("userId"), identity.subject)).first(),
            ctx.db.query("snippets").filter((q) => q.eq(q.field("_id"), args.snippetId)).first()
        ])
        
        if (!user) {
            throw new ConvexError("User not found");
        }

        if (!snippet) {
            throw new ConvexError("Snippet not found");
        }

        if (snippet.userId != identity.subject) {
            throw new ConvexError("You cannot delete this snippet");
        }
        
        const [comments, stars] = await Promise.all([
            ctx.db.query("snippetComments").withIndex("by_snippet_id").filter((q) => q.eq(q.field("snippetId"), args.snippetId)).collect(),
            ctx.db.query("stars").withIndex("by_snippet_id").filter((q) => q.eq(q.field("snippetId"), args.snippetId)).collect()
        ])

        for (const comment of comments)
        {
            await ctx.db.delete(comment._id);
        }

        for (const star of stars)
        {
            await ctx.db.delete(star._id);
        }

        await ctx.db.delete(snippet._id);
    }
})

export const starSnippet = mutation({
    args: { snippetId: v.id("snippets") },
    handler: async(ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new ConvexError("Not authenticated");
        }

        const [user, snippet, star] = await Promise.all([
            ctx.db.query("users").withIndex("by_user_id").filter((q) => q.eq(q.field("userId"), identity.subject)).first(),
            ctx.db.query("snippets").filter((q) => q.eq(q.field("_id"), args.snippetId)).first(),
            ctx.db.query("stars").withIndex("by_user_id_and_snippet_id").filter((q) => q.eq(q.field("userId"), identity.subject) && q.eq(q.field("snippetId"), args.snippetId)).first()
        ])

        if (!user) {
            throw new ConvexError("User not found");
        }

        if (!snippet) {
            throw new ConvexError("Snippet not found");
        }

        if (star) {
            await ctx.db.delete(star._id);
        }
        else
        {
            await ctx.db.insert("stars", {
                userId: user._id,
                snippetId: args.snippetId
            })
        }
    }
})

export const getSnippetById = query({
    args: { snippetId: v.id("snippets") },
    handler: async(ctx, args) => {
        const snippet = await ctx.db.get(args.snippetId);

        if (!snippet) {
            throw new Error("Snippet not found");
        }

        return snippet;
    }
})

export const getSnippetComments = query({
    args: { snippetId: v.id("snippets") },
    handler: async(ctx, args) => {
        const comments = await ctx.db.query("snippetComments").withIndex("by_snippet_id").filter((q) => q.eq(q.field("snippetId"), args.snippetId)).order("desc").collect();

        return comments;
    }
})

export const addComment = mutation({
    args: { snippetId: v.id("snippets"), content: v.string() },
    handler: async(ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Not authenticated");
        }

        const [user, snippet] = await Promise.all([
            ctx.db.query("users").withIndex("by_user_id").filter((q) => q.eq(q.field("userId"), identity.subject)).first(),
            ctx.db.get(args.snippetId)
        ])

        if (!user) {
            throw new Error("User not found");
        }

        if (!snippet) {
            throw new Error("Snippet not found");
        }

        const comment = await ctx.db.insert("snippetComments", {
            snippetId: args.snippetId,
            userId: identity.subject,
            username: user.name,
            content: args.content
        })

        return comment;
    }
})

export const deleteComment = mutation({
    args: { commentId: v.id("snippetComments") },
    handler: async(ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Not authenticated");
        }

        const [user, comment] = await Promise.all([
            ctx.db.query("users").withIndex("by_user_id").filter((q) => q.eq(q.field("userId"), identity.subject)).first(),
            ctx.db.get(args.commentId)
        ])

        if (!user) {
            throw new Error("User not found");
        }

        if (!comment) {
            throw new Error("Comment not found");
        }

        if (comment.userId != identity.subject) {
            throw new Error("You cannot delete this comment");
        }

        await ctx.db.delete(args.commentId);
    }
})