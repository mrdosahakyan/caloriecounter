import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(
    process.env.STRIPE_SECRET_KEY ||
      "sk_test_51PqI3mId23AXDIWwsBfXIomhxvFM3el4YogZnzTM9BRvmFIKpxfZKWW6XIvF7RTdyWSIdM12UVyqX2VjhImy1atd00cUJqtHmQ"
  );
  
export async function POST(req: NextRequest) {
  try {
    const { customerId, paymentMethodId, email = '' } = await req.json();
    
    // // Attach the payment method to the customer
    // await stripe.paymentMethods.attach(paymentMethodId, { customer: customerId });

    // Set it as the default payment method
    console.log(paymentMethodId, ':::paymentMethodId')
    await stripe.customers.update(customerId, {
      email: email,
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
