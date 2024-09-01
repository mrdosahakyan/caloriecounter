// api/create-stripe-customer

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export async function POST(req: NextRequest) {
  try {
    const { email = "", name = "" } = await req.json();

    // Create a new customer in Stripe
    const customer = await stripe.customers.create({
      email,
      name,
    });

    // Return the customer ID to the client
    return NextResponse.json({ customerId: customer.id });
  } catch (error: any) {
    // Handle errors properly
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
