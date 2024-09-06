"use client";

import { useEffect, useState } from "react";
import ChoosePaymentMethod, { EPaymentMethod } from "./ChoosePaymentMethod";
import PaymentCarousel from "../../ui/components/carousel/PaymentCarousel";
import StepperTitle from "../../ui/components/stepperLayout/StepperTitle"; 
import UnvisiblePaymentInfo from "./UnvisiblePaymentInfo";
import TermsConditions from "./TermsContditions";
import { usePaymentStore } from "@/app/store/paymentStore"; 
import { useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import ContinueButton from "@/app/ui/components/ContinueButton";
import PaymentForm from "./PaymentForm";
import { addScriptDefault } from "meta-pixel";

const fbq = addScriptDefault();

const stripeCountryCode = process.env.NEXT_PUBLIC_STRIPE_COUNTRY_CODE || "US";
const stripeCurrency = process.env.NEXT_PUBLIC_STRIPE_CURRENCY || "usd";
const trialAmountInCents = process.env.NEXT_PUBLIC_TRIAL_AMOUNT || 699;

const PaymentStep = () => {
  const stripe = useStripe();
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<EPaymentMethod>(EPaymentMethod.APPLE_PAY);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const isDisabled = false;
  const {
    paymentData: { clientSecret, stripeCustomerId },
  } = usePaymentStore();

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
        amount: Number(trialAmountInCents),
      },
      requestPayerName: false,
      requestPayerEmail: true,
      requestShipping: false,
    });

    pr.canMakePayment().then((result) => {
      console.log(result, "result");
      if (result) {
        setPaymentRequest(pr);
        setIsApplePayAvailable(true);
      }
    });
  };

  const handleApplePay = () => {
    if (!paymentRequest || !stripe) return;

    paymentRequest.on("paymentmethod", async (ev: any) => {
      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(
          clientSecret,
          { payment_method: ev.paymentMethod.id },
          { handleActions: false }
        );

      if (confirmError) {
        ev.complete("fail");
        alert("Payment failed: " + confirmError.message);
      } else {
        ev.complete("success");
        await axios.post("/api/set-default-payment-method", {
          customerId: stripeCustomerId,
          paymentMethodId: ev.paymentMethod.id,
          email: ev.payerEmail,
        });
        window.location.href = "/success";

        if (paymentIntent.status === "requires_action") {
          // Let Stripe.js handle the rest of the payment flow.
          const { error } = await stripe.confirmCardPayment(clientSecret);
          if (error) {
            alert("Payment failed: " + error.message);
          } else {
            // The payment has succeeded -- show a success message to your customer.
            window.location.href = "/success";
          }
        } else {
          // The payment has succeeded -- show a success message to your customer.
          window.location.href = "/success";
        }
      }
    });

    paymentRequest.show(); // This triggers the Apple Pay window
  };

  useEffect(() => {
    initializeApplePay();
  }, [stripe]);

  const handlePaymetMethod = () => {
    fbq('track', 'InitiateCheckout', {
      currency: 'USD',
      value: 10,
      num_items: 1,
      content_ids: [stripeCustomerId],
    })
    if (!selectedPaymentMethod) return;

    if (selectedPaymentMethod === EPaymentMethod.CARD) {
      setShowPaymentForm(true);
    }
    if (selectedPaymentMethod === EPaymentMethod.APPLE_PAY) {
      if (!isApplePayAvailable) {
        console.log("Apple Pay is not available");
        return;
      }
      handleApplePay();
    }
  };

  if (showPaymentForm && clientSecret) {
    return <PaymentForm />;
  }

  return (
    <>
      <div className="min-h-svh max-h-svh h-svh w-full flex flex-col justify-between py-2 px-3">
        <div className="flex-1 flex flex-col w-full justify-around">
          <PaymentCarousel />
          <div className="mt-5">
            <StepperTitle className="mb-2">
              Get unlimited access to your plan!
            </StepperTitle>
            <p className="font-roboto text-[14px] font-normal text-center text-[#000000]">
              Unlimited access for just $6.99 Try for one week. Cancel anytime
            </p>
          </div>
        </div>
        <div className="h-fit mt-2">
          <ChoosePaymentMethod
            selectedPaymentMethod={selectedPaymentMethod}
            setSelectedPaymentMethod={setSelectedPaymentMethod}
          />
          <ContinueButton
            onClick={handlePaymetMethod}
            isDisabled={isDisabled}
          />

          <TermsConditions />
        </div>
      </div>
      <div className="bg-primaryBgColor px-3">
        <UnvisiblePaymentInfo />
      </div>
    </>
  );
};

export default PaymentStep;
