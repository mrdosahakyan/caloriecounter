import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useOnboardingStore } from "@/app/store/onboardingStore";
import Footer from "../Footer";

const PaymentForm = () => {
  const { onboardingData } = useOnboardingStore();

  const { clientSecret, stripeCustomerId: customerId } = onboardingData;

  const stripe = useStripe();

  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements || !clientSecret) {
      return;
    }

    setIsProcessing(true);

    // attach payment method to customer or subscription I don`t know

    const { error } = await stripe.confirmSetup({
      elements,
      redirect: "if_required",
    });

    const { setupIntent } = await stripe.retrieveSetupIntent(clientSecret);

    await axios.post("/api/set-default-payment-method", {
      customerId: customerId,
      paymentMethodId: setupIntent?.payment_method,
    });

    window.location.href = "/success";

    if (error) {
      console.log(error);
      setErrorMessage(error.message ?? "An unexpected error occurred.");
    } else {
      setErrorMessage(null);
    }
    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="px-6">
        <PaymentElement
          options={{
            paymentMethodOrder: ["card"],
          }}
        />
        {errorMessage && <div className="text-red-600">{errorMessage}</div>}
      </div>

      <Footer
        onContinue={() => handleSubmit}
        isDisabled={!stripe || isProcessing}
      />
    </form>
  );
};

export default PaymentForm;
