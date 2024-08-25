"use client";

import { FC, useEffect, useState } from "react";
import ChoosePaymentMethod, {
  EPaymentMethod,
} from "../../payment/ChoosePaymentMethod";
import ContinueButton from "../../components/ContinueButton";
import { useStripe } from "@stripe/react-stripe-js";
import PaymentForm from "../../payment/PaymentForm";
import axios from "axios";

type TChoosePaymentMethodProps = {
  clientSecret: string;
  customerId: string;
};

const stripeCountryCode = process.env.STRIPE_COUNTRY_CODE || "PL";
const stripeCurrency = process.env.STRIPE_CURRENCY || "pln";

const ChoosePaymentMethodStep: FC<TChoosePaymentMethodProps> = ({
  clientSecret,
  customerId,
}) => {
  const stripe = useStripe();

  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<EPaymentMethod>(EPaymentMethod.CARD);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const [paymentRequest, setPaymentRequest] = useState<any>(null);
  const [isApplePayAvailable, setIsApplePayAvailable] =
    useState<boolean>(false);

  const initializeApplePay = () => {
    if (!stripe) return;
    const pr = stripe.paymentRequest({
      country: stripeCountryCode,
      currency: stripeCurrency,
      total: {
        label: "Total",
        amount: 0, // No immediate charge, since this is for a subscription with a trial period
      },
      requestPayerName: false,
      requestPayerEmail: true,
      requestShipping: false,
      // applePay: {
      //   recurringPaymentRequest: {
      //     managementURL: 'https://4c99-178-160-251-193.ngrok-free.app/',
      //     paymentDescription: 'Monthly subscription',
      //     regularBilling: {
      //       amount: 0,
      //       label: 'Monthly subscription',
      //     },
      //   }
      // }
    });

    pr.canMakePayment().then((result) => {
      if (result) {
        setPaymentRequest(pr);
        setIsApplePayAvailable(true);
      }
    });
  };

  useEffect(() => {
    initializeApplePay();
  }, [stripe]);

  const handleApplePay = () => {
    if (!paymentRequest || !stripe) return;

    paymentRequest.on("paymentmethod", async (ev: any) => {
      const { error: confirmError } = await stripe.confirmSetup({
        clientSecret: clientSecret,
        // confirmParams: {
        //   return_url: window.location.href, // Optional
        // },
        redirect: "if_required", // Ensures a redirect if necessary
      });

      if (confirmError) {
        ev.complete("fail");
        console.error(confirmError.message);
      } else {
        ev.complete("success");
        console.log("Payment successful with Apple Pay");

        // Attach the payment method to the customer or subscription
        await axios.post("/api/set-default-payment-method", {
          customerId,
          paymentMethodId: ev.paymentMethod.id,
        });
        // window.location.href = "/success";
      }
    });

    paymentRequest.show(); // This triggers the Apple Pay window
  };

  const handlePaymetMethod = async () => {
    if (!selectedPaymentMethod) return;

    if (selectedPaymentMethod === EPaymentMethod.CARD) {
      setShowPaymentForm(true);
    }
    if (selectedPaymentMethod === EPaymentMethod.APPLE_PAY) {
      handleApplePay();
    }
  };

  if (showPaymentForm) {
    return (
      // <Elements stripe={stripePromise} options={{ clientSecret }}>
      <PaymentForm clientSecret={clientSecret} customerId={customerId} />
      // </Elements>
    );
  }

  return (
    <>
      <ChoosePaymentMethod
        selectedPaymentMethod={selectedPaymentMethod}
        setSelectedPaymentMethod={setSelectedPaymentMethod}
      />
      <br />
      <ContinueButton
        onClick={handlePaymetMethod}
        isDisabled={
          !selectedPaymentMethod ||
          (!isApplePayAvailable &&
            selectedPaymentMethod === EPaymentMethod.APPLE_PAY)
        }
        text="Continue"
      />
      <br />
      {!isApplePayAvailable &&
        selectedPaymentMethod === EPaymentMethod.APPLE_PAY && (
          <p
            style={{
              color: "red",
            }}
          >
            Apple pay is not available
          </p>
        )}
    </>
  );
};

export default ChoosePaymentMethodStep;
