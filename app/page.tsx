"use client";

import { useState } from "react";
import ChoosePlanStep from "./ui/steps/choosePlanStep";
import ChoosePaymentMethodStep from "./ui/steps/choosePaymentMethodStep";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripeSecretKey =
  process.env.STRIPE_SECRET_KEY ||
  "sk_test_51PqI3mId23AXDIWwsBfXIomhxvFM3el4YogZnzTM9BRvmFIKpxfZKWW6XIvF7RTdyWSIdM12UVyqX2VjhImy1atd00cUJqtHmQ";
  const stripePublicKey =
  process.env.STRIPE_PUBLIC_KEY ||
  "pk_test_51PqI3mId23AXDIWwujdYBjtlJWwt58tkToDnhirQEjHZwmkehtnb1vBut5Mp0SakDsc3rSQJxe9JJKfcxfrP6ZYV00PX7TTSGO";

const stripePromise = loadStripe(stripePublicKey);

export default function Home() {
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [subscriptionId, setSubscriptionId] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState("");

  const getContent = () => {
    if (!subscriptionId && !customerId) {
      return (
        <ChoosePlanStep
          setCustomerId={setCustomerId}
          setSubscriptionId={setSubscriptionId}
          setClientSecret={setClientSecret}
        />
      );
    }

    if (clientSecret && subscriptionId && customerId) {
      return (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <ChoosePaymentMethodStep
            customerId={customerId}
            clientSecret={clientSecret}
          />
        </Elements>
      );
    }
  };

  return <main className=" ">{getContent()}</main>;
}
