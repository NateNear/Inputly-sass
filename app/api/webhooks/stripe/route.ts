import { stripe } from "@/lib/stripe";
import { db } from "@/index";
import { subscriptions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Webhook signature verification failed" }),
      { status: 400 }
    );
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    if (session.metadata?.userId) {
      await db
        .update(subscriptions)
        .set({ 
          plan: session.metadata.plan,
          stripeSubscriptionId: session.subscription as string,
          subscribed: true
        })
        .where(eq(subscriptions.userId, session.metadata.userId));
    }
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}