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
      return <ChoosePaymentMethodStep clientSecret={clientSecret} />;
    }
  };

  return <main className=" ">{getContent()}</main>;
}
