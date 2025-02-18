import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { usePaymentStore } from "@/app/store/paymentStore";
import ContinueButton from "@/app/ui/components/ContinueButton";
import { TextField } from "@mui/material";
import mixpanel from "mixpanel-browser";
import { EMixpanelEvents } from "@/app/ui/integrations/mixpanelEvents";
import { EPaymentMethod } from "./ChoosePaymentMethod";
import useUserId from "@/app/ui/hooks/useUserId";

const PaymentForm = () => {
  const { paymentData } = usePaymentStore();
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const { clientSecret, stripeCustomerId: customerId } = paymentData;

  const stripe = useStripe();
  const elements = useElements();
  const userId = useUserId();

  const [isProcessing, setIsProcessing] = useState(false);
  const [stripeErrorMessage, setStripeErrorMessage] = useState<string | null>(
    null
  );
  const isDisabled = isProcessing || !stripe;

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    if (!email) {
      setEmailError("Please enter your email.");
      return;
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    } else {
      setEmailError(null);
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (paymentIntent?.payment_method) {
      try {
        await axios.post("/api/set-default-payment-method", {
          customerId: customerId,
          paymentMethodId: paymentIntent.payment_method,
          email: email,
        });
        await axios.post("/api/create-subscription", {
          customerId: customerId,
          customerEmail: email,
          userId: userId,
        });
        mixpanel.track(EMixpanelEvents.CHECKOUT_COMPLETED, {
          paymentMethod: EPaymentMethod.CARD,
        });
        window.location.href = "/success";
      } catch (error: any) {
        setStripeErrorMessage(error.message || "An unexpected error occurred.");
      }
    }

    if (error) {
      console.log(error);
      setStripeErrorMessage(error.message ?? "An unexpected error occurred.");
    } else {
      setStripeErrorMessage(null);
    }
    setIsProcessing(false);
  };

  return (
    <div className="min-h-svh max-h-svh h-svh w-full flex flex-col justify-between py-2 px-3 max-w-md mx-auto">
      <div className="flex-1 flex flex-col w-full justify-around">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-4">
            <label>Email*</label>
            <TextField
              fullWidth
              required
              type="email"
              placeholder="Enter your email"
              value={email}
              variant="outlined"
              size="small"
              onChange={(e) => setEmail(e.target.value)}
              error={Boolean(emailError)}
              helperText={emailError}
              inputProps={{
                style: {
                  backgroundColor: "white",
                },
              }}
              style={{
                marginBottom: "1rem",
              }}
            />
            <PaymentElement
              options={{
                paymentMethodOrder: ["card"],
              }}
            />
            {stripeErrorMessage && (
              <div className="text-red-600">{stripeErrorMessage}</div>
            )}
          </div>
        </form>
      </div>
      <div className="h-fit mt-2">
        <ContinueButton
          //@ts-ignore
          onClick={handleSubmit}
          isDisabled={isDisabled}
          isLoading={isProcessing}
        />
      </div>
    </div>
  );
};

export default PaymentForm;
