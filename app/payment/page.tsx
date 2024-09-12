"use client";

import { useEffect, useState } from "react";
import { usePaymentStore } from "@/app/store/paymentStore";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import ContinueButton from "@/app/ui/components/ContinueButton";
import useDidMount from "@/app/ui/hooks/useDidMount";
import { loadStripe } from "@stripe/stripe-js";
import PageSpinner from "@/app/ui/components/PageSpinner";
import ChoosePaymentMethod, {
  EPaymentMethod,
} from "./components/ChoosePaymentMethod";
import PaymentForm from "./components/PaymentForm";
import PaymentCarousel from "../ui/components/carousel/PaymentCarousel";
import StepperTitle from "../ui/components/stepperLayout/StepperTitle";
import TermsConditions from "./components/TermsContditions";
import UnvisiblePaymentInfo from "./components/UnvisiblePaymentInfo";
import { initializeMixpanel } from "../ui/integrations/mixpanelInit";
import mixpanel from "mixpanel-browser";
import { EMixpanelEvents } from "../ui/integrations/mixpanelEvents";
import useUserId from "../ui/hooks/useUserId";

const stripeCountryCode = process.env.NEXT_PUBLIC_STRIPE_COUNTRY_CODE || "US";
const stripeCurrency = process.env.NEXT_PUBLIC_STRIPE_CURRENCY || "usd";
const trialAmountInCents = process.env.NEXT_PUBLIC_TRIAL_AMOUNT || 699;

const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || "";
const stripePromise = loadStripe(stripePublicKey);

const PaymentStep = () => {
  initializeMixpanel();

  const { paymentData, setPaymentData } = usePaymentStore();
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<EPaymentMethod>(EPaymentMethod.APPLE_PAY);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stripe, setStripe] = useState<any>(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [pageError, setPageError] = useState(false);
  const userId = useUserId();

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
        userId,
      });

      const { clientSecret } = setupIntentResponse.data;

      setPaymentData({ clientSecret });
      return {
        clientSecret,
        customerId,
      };
    } catch (error) {
      console.error("Error creating customer or Setup Intent:", error);
    } finally {
      setLoading(false);
    }
  };

  useDidMount(() => {
    stripePromise
      .then((stripe) => {
        setPageLoading(false);
        setStripe(stripe);
      })
      .catch(() => {
        setPageLoading(false);
        setPageError(true);
      });
      mixpanel.track(EMixpanelEvents.PAGE_13_OPENED)
  });

  const isDisabled = false;

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

    pr.canMakePayment()
      .then((result: any) => {
        setPageLoading(false);
        if (result) {
          setPaymentRequest(pr);
          setIsApplePayAvailable(true);
        }
      })
      .catch(() => {
        setPageLoading(false);
        setIsApplePayAvailable(false);
      });
  };

  const handleApplePay = () => {
    if (!paymentRequest || !stripe) return;

    paymentRequest.on("paymentmethod", async (ev: any) => {
      try {
        const setupPaymentData = await createCustomerAndSetupIntent();
        if (!setupPaymentData) return;

        setLoading(true);

        const { paymentIntent, error: confirmError } =
          await stripe.confirmCardPayment(
            setupPaymentData.clientSecret,
            { payment_method: ev.paymentMethod.id },
            { handleActions: false }
          );

        if (confirmError) {
          ev.complete("fail");
          alert("Payment failed: " + confirmError.message);
        } else {
          ev.complete("success");

          await axios.post("/api/set-default-payment-method", {
            customerId: setupPaymentData.customerId,
            paymentMethodId: ev.paymentMethod.id,
            email: ev.payerEmail,
          });
          await axios.post("/api/create-subscription", {
            customerId: setupPaymentData.customerId,
            customerEmail: ev.payerEmail,
            userId: userId,
          });
          mixpanel.track(EMixpanelEvents.CHECKOUT_COMPLETED, {
            paymentMethod: EPaymentMethod.APPLE_PAY,
          });
          
          if (paymentIntent.status === "requires_action") {
            const { error } = await stripe.confirmCardPayment(
              setupPaymentData.clientSecret
            );

            if (error) {
              alert("Payment failed: " + error.message);
            } else {
              window.location.href = "/success";
            }
          } else {
            window.location.href = "/success";
          }
        }
      } catch (error) {
        console.error("Error handling Apple Pay:", error);
      } finally {
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    initializeApplePay();
  }, [stripe]);

  const handlePaymetMethod = async () => {
    if (!selectedPaymentMethod) return;
    mixpanel.track(EMixpanelEvents.CHECKOUT_STARTED);

    if (selectedPaymentMethod === EPaymentMethod.CARD) {
      const setupPaymentData = await createCustomerAndSetupIntent();
      if (!setupPaymentData) return;
      setShowPaymentForm(true);
      return;
    }

    if (selectedPaymentMethod === EPaymentMethod.APPLE_PAY) {
      if (!isApplePayAvailable) {
        alert("Apple Pay is not available on this device.");
        return;
      }

      paymentRequest.show();
      handleApplePay();
    }
  };

  if (pageLoading) {
    return <PageSpinner />;
  }

  if (pageError) {
    return (window.location.href = "/error");
  }

  if (showPaymentForm && paymentData.clientSecret && stripePromise) {
    return (
      <Elements
        stripe={stripePromise}
        options={{ clientSecret: paymentData.clientSecret }}
      >
        <PaymentForm />;
      </Elements>
    );
  }

  return (
    <>
      <div className="min-h-svh max-h-svh h-svh w-full flex flex-col justify-between py-2 px-3 max-w-md mx-auto">
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
            isLoading={loading}
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
