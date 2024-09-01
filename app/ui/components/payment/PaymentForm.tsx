import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { usePaymentStore } from "@/app/store/paymentStore";
import { Button } from "@nextui-org/react";

const PaymentForm = () => {
  const { paymentData } = usePaymentStore();

  const { clientSecret, stripeCustomerId: customerId } = paymentData;

  const stripe = useStripe();

  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isDisabled = isProcessing || !stripe;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements || !clientSecret) {
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    await axios.post("/api/set-default-payment-method", {
      customerId: customerId,
      paymentMethodId: paymentIntent?.payment_method,
    });

    if (error) {
      console.log(error);
      setErrorMessage(error.message ?? "An unexpected error occurred.");
    } else {
      window.location.href = "/success";
      setErrorMessage(null);
    }
    setIsProcessing(false);
  };

  return (
    <div className="min-h-svh max-h-svh h-svh w-full flex flex-col justify-between py-2 px-3">
      <div className="flex-1 flex flex-col w-full justify-around">
        <form onSubmit={handleSubmit} className=" ">
          <div className="p-4">
            <PaymentElement
              options={{
                paymentMethodOrder: ["card"],
              }}
            />
            {errorMessage && <div className="text-red-600">{errorMessage}</div>}
          </div>
        </form>
      </div>
      <div className="h-fit mt-2">
        <Button
          // isLoading={isLoading}
          radius="full"
          size="lg"
          onClick={handleSubmit}
          fullWidth
          className={`bg-[#021533] text-white ${
            isDisabled ? "opacity-50 cursor-not-allowed" : ""
          } mt-2`}
          disabled={isDisabled}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default PaymentForm;
