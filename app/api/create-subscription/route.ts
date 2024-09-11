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
    const { customerId, userId } = await req.json();

    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      trial_period_days: Number(trialPeriod),
      payment_behavior: "default_incomplete",
    });

    const eventId = uuidv4();
    const userData = new UserData()
      .setExternalId(userId || customerId)
      .setClientIpAddress(req.headers.get("x-forwarded-for") || req.ip || "")
      .setClientUserAgent(req.headers.get("user-agent") || "")
      .setFbc(req.headers.get("cookie")?.match(/_fbc=([^;]+)/)?.[1] || '') // Add _fbc to user data
      .setFbp(req.headers.get("cookie")?.match(/_fbp=([^;]+)/)?.[1] || ''); // Add _fbp to user data

    const customData = new CustomData().setCurrency("USD").setValue(10);

    const purchaseEvent = new ServerEvent()
      .setEventName("Purchase")
      .setEventTime(Math.floor(new Date().getTime() / 1000))
      .setUserData(userData)
      .setCustomData(customData)
      .setActionSource("website")
      .setEventId(eventId);

    const eventsData = [purchaseEvent];

    const eventRequest = new EventRequest(accessToken, pixelId)
      //.setTestEventCode("TEST59872") 
      .setEvents(eventsData);

    await eventRequest.execute();

    return NextResponse.json({ subscriptionId: subscription.id, eventId });
  } catch (error: any) {
    console.error("Error creating subscription:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
