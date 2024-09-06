import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
const priceId = process.env.STRIPE_SUBSCRIPTION_PRICE_ID || "";
const trialPeriodAmount = process.env.NEXT_PUBLIC_TRIAL_AMOUNT || 699;
const stripeCurrency = process.env.NEXT_PUBLIC_STRIPE_CURRENCY || "usd";
const trialPeriod = process.env.NEXT_PUBLIC_TRIAL_PERIOD || 7;

export async function POST(req: NextRequest) {
  try {
    const { customerId } = await req.json();
    const invoiceDescription = `calapp.site/${customerId
      .toUpperCase()
      .slice(0, 14)}`;
    // Create a PaymentIntent for a one-time payment and set up for future payments
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(trialPeriodAmount), // $6.99 in cents
      currency: stripeCurrency,
      customer: customerId,
      setup_future_usage: "off_session", // Save the payment method for future use
      description: invoiceDescription,
      // payment_method_types: ["card", "apple_pay"], // Support both card and Apple Pay
    });

    await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      trial_period_days: Number(trialPeriod), // The trial period in days
      payment_behavior: "default_incomplete", // Create subscription but don't complete it until payment method is added
    });

    // Return the client secret to the frontend
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    console.error("Error creating PaymentIntent:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
