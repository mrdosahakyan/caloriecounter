import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import {
  FacebookAdsApi,
  ServerEvent,
  EventRequest,
  UserData,
  CustomData,
} from "facebook-nodejs-business-sdk";
import { v4 as uuidv4 } from "uuid";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
const trialPeriodAmount = process.env.NEXT_PUBLIC_TRIAL_AMOUNT || 699;
const stripeCurrency = process.env.NEXT_PUBLIC_STRIPE_CURRENCY || "usd";

const accessToken = process.env.FACEBOOK_ACCESS_TOKEN || "";
const pixelId = process.env.FACEBOOK_PIXEL_ID || "";
FacebookAdsApi.init(accessToken);

export async function POST(req: NextRequest) {
  try {
    let { customerId, userId } = await req.json();

    if (!customerId) {
      throw new Error("customerId is required.");
    }

    const invoiceSuffix = `${customerId
      .toUpperCase()
      .replace("CUS_", "")
      .toUpperCase()
      .slice(0, 10)}`;

    //const invoiceDescription = `caltrack.info${invoiceSuffix}`;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(trialPeriodAmount),
      currency: stripeCurrency,
      customer: customerId,
      setup_future_usage: "off_session",
      //description: invoiceDescription,
      //statement_descriptor: invoiceDescription,
      statement_descriptor_suffix: invoiceSuffix,
    });

    const eventId = uuidv4();

    const userData = new UserData()
      .setExternalId(userId || customerId)
      .setClientIpAddress(req.headers.get("x-forwarded-for") || req.ip || "")
      .setClientUserAgent(req.headers.get("user-agent") || "")
      .setFbc(req.headers.get("cookie")?.match(/_fbc=([^;]+)/)?.[1] || "")
      .setFbp(req.headers.get("cookie")?.match(/_fbp=([^;]+)/)?.[1] || "");

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

    await eventRequest.execute();

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      eventId,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
