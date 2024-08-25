import { FC, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import ContinueButton from "../components/ContinueButton";

type PaymentFormProps = {
  clientSecret?: string;
};

const PaymentForm: FC<PaymentFormProps> = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: window.location.href, // Optional: Use this if you want to redirect after payment
      },
    });

    if (error) {
      setErrorMessage(error.message ?? "An unexpected error occurred.");
    } else {
      setErrorMessage(null);
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement
        options={{
          paymentMethodOrder: ["card"],
        }}
      />
      {errorMessage && <div className="text-red-600">{errorMessage}</div>}
      <ContinueButton
        // @ts-ignore
        onClick={handleSubmit}
        isDisabled={!stripe || isProcessing}
      >
        {isProcessing ? "Processing..." : "Continue"}
      </ContinueButton>
    </form>
  );
};

export default PaymentForm;
