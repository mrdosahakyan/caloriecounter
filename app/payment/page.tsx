"use client";

import { useEffect, useState, useRef } from "react";
import PaymentStep from "./components/PaymentStep";
import { Elements } from "@stripe/react-stripe-js";
import { usePaymentStore } from "../store/paymentStore";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import PageSpinner from "../ui/components/PageSpinner";

const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || "";

const stripePromise = loadStripe(stripePublicKey);

const PaymentPage = () => {
  const { paymentData, setPaymentData } = usePaymentStore();
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false);

  const createCustomerAndSetupIntent = async () => {
    if (paymentData.clientSecret && paymentData.stripeCustomerId) {
      return;
    }

    try {
      setLoading(true);

      const customerResponse = await axios.post("/api/create-stripe-customer", {
        // Pass customer name, email
      });
      const { customerId } = customerResponse.data;

      setPaymentData({ stripeCustomerId: customerId });

      const setupIntentResponse = await axios.post("/api/create-setup-intent", {
        customerId,
      });

      const { clientSecret } = setupIntentResponse.data;

      setPaymentData({ clientSecret });
    } catch (error) {
      console.error("Error creating customer or Setup Intent:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      createCustomerAndSetupIntent();
    }
  }, []);

  if (loading) {
    return <PageSpinner />;
  }

  if (!paymentData.clientSecret) {
    return (window.location.href = "/error");
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{ clientSecret: paymentData.clientSecret }}
    >
      <PaymentStep />
    </Elements>
  );
};

export default PaymentPage;
