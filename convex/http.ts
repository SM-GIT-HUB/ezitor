import { httpRouter } from "convex/server"
import { httpAction } from "./_generated/server"
import { WebhookEvent } from "@clerk/nextjs/server"
import { Webhook } from "svix"
import { api, internal } from "./_generated/api"

const http = httpRouter();

http.route({
    path: '/clerk-webhook',
    method: "POST",
    handler: httpAction(async(ctx, req) => {
        const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

        if (!webhookSecret) {
            throw new Error("Missing clerk_webhook_secret env: http.ts, line 15");
        }

        const svix_id = req.headers.get("svix-id");
        const svix_signature = req.headers.get("svix-signature");
        const svix_timestamp = req.headers.get("svix-timestamp");

        if (!svix_id || !svix_signature || !svix_timestamp) {
            return new Response("Error occured -- no svix headers", {
                status: 400
            })
        }

        const payload = await req.json();
        const body = JSON.stringify(payload);

        const wh = new Webhook(webhookSecret);
        let evt: WebhookEvent;

        try {
            evt = wh.verify(body, {
                "svix-id" : svix_id,
                "svix-timestamp": svix_timestamp,
                "svix-signature" : svix_signature
            }) as WebhookEvent;
        }
        catch(err) {
            console.log("Error veifying webhook: ", err);
            return new Response("Error occured", { status: 400 });
        }

        const eventType = evt.type;

        if (eventType == "user.created")
        {
            const { id, email_addresses, first_name, last_name } = evt.data;
            const email = email_addresses[0].email_address;
            const name = `${first_name || ""} ${last_name || ""}`.trim();

            try {
                await ctx.runMutation(api.users.syncUser, { userId: id, email, name });
            }
            catch(err) {
                console.log("Error creating user: http.ts, line 59", err);
                return new Response("Error creating user", { status: 500 });
            }
        }

        return new Response("Webhook processed successfully", { status: 200 });
    })
})

http.route({
    path: "/lemon-squeezy-webhook",
    method: "POST",
    handler: httpAction(async(ctx, req) => {
        const payloadString = await req.text();
        const signature = req.headers.get("X-Signature");

        if (!signature) {
            return new Response("Missing X-Signature header", { status: 400 });
        }

        try {
            const payload = await ctx.runAction(internal.lemonSqueezy.verifyWebhook, { payload: payloadString, signature });

            if (payload.meta.event_name == "order_created")
            {
                const { data } = payload;

                const { success } = await ctx.runMutation(api.users.upgradeToPro, {
                    email: data.attributes.user_email.toString(),
                    lemonSqueezyCustomerId: data.attributes.customer_id.toString(),
                    lemonSqueezyOrderId: data.id.toString(),
                    amount: data.attributes.total.toString()
                })

                if (success) {
                    //we can send an email
                }
            }
            
            return new Response("Webhook processed successfully", { status: 200 });
        }
        catch(err: any) {
            console.log("webhook error: ", err.message);
            return new Response("Error processing webhook", { status: 500 });
        }
    })
})


export default http