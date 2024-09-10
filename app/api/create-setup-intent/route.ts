import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import {
  FacebookAdsApi,
  ServerEvent,
  EventRequest,
  UserData,
  CustomData,
} from "facebook-nodejs-business-sdk";
import { v4 as uuidv4 } from "uuid"; // Import UUID package

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
const trialPeriodAmount = process.env.NEXT_PUBLIC_TRIAL_AMOUNT || 699;
const stripeCurrency = process.env.NEXT_PUBLIC_STRIPE_CURRENCY || "usd";

// Facebook Conversions API Setup
const accessToken = process.env.FACEBOOK_ACCESS_TOKEN || ""; // Your Facebook Access Token
const pixelId = process.env.FACEBOOK_PIXEL_ID || ""; // Your Facebook Pixel ID
FacebookAdsApi.init(accessToken);

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    let { customerId, userId } = await req.json();

    // Check if customerId is provided
    if (!customerId) {
      throw new Error("customerId is required.");
    }

    customerId = customerId.replace("CUS_", "");
    const invoiceDescription = `caltrack.info-${customerId
      .toUpperCase()
      .slice(0, 8)}`;

    // Create a PaymentIntent for a one-time payment and set up for future payments
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(trialPeriodAmount), // $6.99 in cents
      currency: stripeCurrency,
      customer: customerId,
      setup_future_usage: "off_session", // Save the payment method for future use
      description: invoiceDescription,
    });

    // Generate a unique event_id for deduplication
    const eventId = uuidv4(); // Generate a unique event ID (UUID)

    // Collect user data (only IP and User-Agent) for the Facebook Conversions API
    const userData = new UserData()
      .setExternalId(userId || customerId)
      .setClientIpAddress(req.headers.get("x-forwarded-for") || req.ip || "")
      .setClientUserAgent(req.headers.get("user-agent") || "")
      .setFbc(req.headers.get("cookie")?.match(/_fbc=([^;]+)/)?.[1] || '') // Add _fbc to user data
      .setFbp(req.headers.get("cookie")?.match(/_fbp=([^;]+)/)?.[1] || ''); // Add _fbp to user data

    // Construct CustomData with the appropriate methods
    const customData = new CustomData()
      .setCurrency(stripeCurrency)
      .setValue(Number(trialPeriodAmount) / 100);

    const event = new ServerEvent()
      .setEventName("InitiateCheckout")
      .setEventTime(Math.floor(new Date().getTime() / 1000))
      .setUserData(userData)
      .setCustomData(customData)
      .setActionSource("website")
      .setEventId(eventId);

    const eventsData = [event];

    const eventRequest = new EventRequest(accessToken, pixelId).setEvents(
      eventsData
    );

    const fbResponse = await eventRequest.execute();
    console.log("InitiateCheckout API response:", fbResponse);

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      eventId,
    });
  } catch (error: any) {
    console.error("Error creating PaymentIntent:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
