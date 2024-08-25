// app/api/create-subscription/route.ts

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY ||
    "sk_test_51PqI3mId23AXDIWwsBfXIomhxvFM3el4YogZnzTM9BRvmFIKpxfZKWW6XIvF7RTdyWSIdM12UVyqX2VjhImy1atd00cUJqtHmQ"
);

export async function POST(req: NextRequest) {
  try {
    const { priceId } = await req.json();

    // Create a new Stripe customer
    const customer = await stripe.customers.create();

    // Create a subscription with a trial period
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      trial_period_days: 7, // The trial period in days
      payment_behavior: "default_incomplete", // Create subscription but don't complete it until payment method is added
    });

    // Create a SetupIntent to collect payment method details
    const setupIntent = await stripe.setupIntents.create({
      customer: customer.id,
      payment_method_types: ["card"], // You can add more payment methods if needed
    });

    return NextResponse.json({
      customerId: customer.id,
      subscriptionId: subscription.id,
      clientSecret: setupIntent.client_secret,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
