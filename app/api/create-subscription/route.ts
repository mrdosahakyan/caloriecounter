import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import {
  FacebookAdsApi,
  ServerEvent,
  EventRequest,
  UserData,
  CustomData,
} from "facebook-nodejs-business-sdk";
import { v4 as uuidv4 } from "uuid"; // Import UUID for event_id generation

// Initialize Stripe and Facebook SDK
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
const priceId = process.env.STRIPE_SUBSCRIPTION_PRICE_ID || "";
const trialPeriod = process.env.NEXT_PUBLIC_TRIAL_PERIOD || 7;
const accessToken = process.env.FACEBOOK_ACCESS_TOKEN || ""; // Facebook Access Token
const pixelId = process.env.FACEBOOK_PIXEL_ID || ""; // Facebook Pixel ID
FacebookAdsApi.init(accessToken);

export async function POST(req: NextRequest) {
  try {
    const { customerId } = await req.json();

    // Create a subscription in Stripe
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      trial_period_days: Number(trialPeriod), // The trial period in days
      payment_behavior: "default_incomplete", // Create subscription but don't complete it until payment method is added
    });

    console.log("Subscription successfully created:", subscription.id);

    // Generate a unique event_id for the Purchase event
    const eventId = uuidv4();

    // Set up user data for the Facebook event (use IP and user-agent)
    const userData = new UserData()
      .setClientIpAddress(req.headers.get("x-forwarded-for") || req.ip || "")
      .setClientUserAgent(req.headers.get("user-agent") || "");

    // Create the custom data for the Purchase event
    const customData = new CustomData()
      .setCurrency("USD") // Assuming USD for the subscription currency
      .setValue(10) // Set the value of the subscription (after trial, for example)
      .setContentIds([customerId]); // Use customerId as a placeholder for content ID

    console.log("Sending Purchase event to Facebook:", customData);

    // Set up the Facebook Purchase event
    const purchaseEvent = new ServerEvent()
      .setEventName("Purchase")
      .setEventTime(Math.floor(new Date().getTime() / 1000))
      .setUserData(userData)
      .setCustomData(customData)
      .setActionSource("website")
      .setEventId(eventId); // Event ID for deduplication

    const eventsData = [purchaseEvent];

    // Send the event to Facebook's Conversions API with test_event_code
    const eventRequest = new EventRequest(accessToken, pixelId).setEvents(
      eventsData
    );
    // .setTestEventCode("TEST69282"); // Add the test event code

    const fbResponse = await eventRequest.execute();
    console.log("Facebook Purchase Event Response:", fbResponse);

    // Return the subscription ID to the frontend
    return NextResponse.json({ subscriptionId: subscription.id, eventId });
  } catch (error: any) {
    console.error("Error creating subscription:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
