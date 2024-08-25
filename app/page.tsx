"use client";

import { useState } from "react";
import ChoosePlanStep from "./ui/steps/choosePlanStep";
import ChoosePaymentMethodStep from "./ui/steps/choosePaymentMethodStep";

const stripeSecretKey =
  process.env.STRIPE_SECRET_KEY ||
  "sk_test_51PqI3mId23AXDIWwsBfXIomhxvFM3el4YogZnzTM9BRvmFIKpxfZKWW6XIvF7RTdyWSIdM12UVyqX2VjhImy1atd00cUJqtHmQ";

export default function Home() {
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [subscriptionId, setSubscriptionId] = useState<string | null>(null);
  const [priceId, setPriceId] = useState<string | null>(null);

  // const [clientSecret, setClientSecret] = useState<string | null>(null);

  const getContent = () => {
    if (!priceId && !subscriptionId && !customerId) {
      return (
        <ChoosePlanStep
          setCustomerId={setCustomerId}
          setSubscriptionId={setSubscriptionId}
          setPriceId={setPriceId}
        />
      );
    }

    if (!priceId && !subscriptionId && !customerId) {
      return <ChoosePaymentMethodStep />;
    }
  };

  return <main className=" ">{getContent()}</main>;
}
