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
import nodemailer from "nodemailer";
import fs from "fs/promises";
import path from "path";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
const priceId = process.env.STRIPE_SUBSCRIPTION_PRICE_ID || "";
const trialPeriod = process.env.NEXT_PUBLIC_TRIAL_PERIOD || 7;
const accessToken = process.env.FACEBOOK_ACCESS_TOKEN || "";
const pixelId = process.env.FACEBOOK_PIXEL_ID || "";

FacebookAdsApi.init(accessToken);

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(req: NextRequest) {
  try {
    const { customerId, customerEmail, userId } = await req.json();

    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      trial_period_days: Number(trialPeriod),
      payment_behavior: "default_incomplete",
    });

    const emailFilePath = path.join(process.cwd(), "docs", "refundEmail.html");

    let emailBody;
    try {
      emailBody = await fs.readFile(emailFilePath, "utf8");
    } catch (error) {
      console.error("Error reading email template file:", error);
      emailBody = null;
    }

    const plainTextBody = `We are updating the app and have temporarily suspended new purchases.
We apologize for the inconvenience. Your payment will be refunded in 5-10 business days.`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: customerEmail,
      subject: process.env.EMAIL_SUBJECT || "Your payment will be refunded",
      text: plainTextBody,
      ...(emailBody && { html: emailBody }),
    };

    console.log("Sending email to:", customerEmail);

    try {
      transporter.sendMail(mailOptions, (error, info) => {
        console.log("transporter.sendMail result", error, info);
        
        if (error) {
          console.error("❌ Error:", error.message);
        } else {
          console.log("✅ Email sent:", info.response);
        }
      });
      
    } catch (error) {
      console.error("Error sending email:", error);
    }

    const eventId = uuidv4();
    const userData = new UserData()
      .setExternalId(userId || customerId)
      .setClientIpAddress(req.headers.get("x-forwarded-for") || req.ip || "")
      .setClientUserAgent(req.headers.get("user-agent") || "")
      .setFbc(req.headers.get("cookie")?.match(/_fbc=([^;]+)/)?.[1] || "")
      .setFbp(req.headers.get("cookie")?.match(/_fbp=([^;]+)/)?.[1] || "");

    const customData = new CustomData().setCurrency("USD").setValue(10);

    const purchaseEvent = new ServerEvent()
      .setEventName("Purchase")
      .setEventTime(Math.floor(new Date().getTime() / 1000))
      .setUserData(userData)
      .setCustomData(customData)
      .setActionSource("website")
      .setEventId(eventId);

    const eventsData = [purchaseEvent];

    const eventRequest = new EventRequest(accessToken, pixelId).setEvents(
      eventsData
    );

    await eventRequest.execute();

    return NextResponse.json({ subscriptionId: subscription.id, eventId });
  } catch (error: any) {
    console.error("Error creating subscription:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
