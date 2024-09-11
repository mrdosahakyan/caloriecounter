// api/create-stripe-customer

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export async function POST(req: NextRequest) {
  try {
    const { email = "", name = "" } = await req.json();

    const customer = await stripe.customers.create({
      email,
      name,
    });

    return NextResponse.json({ customerId: customer.id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
