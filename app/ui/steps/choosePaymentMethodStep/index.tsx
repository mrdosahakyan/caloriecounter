"use client";

import { FC, useState } from "react";
import ChoosePaymentMethod, {
  EPaymentMethod,
} from "../../payment/ChoosePaymentMethod";
import ContinueButton from "../../components/ContinueButton";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../../payment/PaymentForm";
import { loadStripe } from "@stripe/stripe-js";

type TChoosePaymentMethodProps = {
  clientSecret: string;
};

const stripePublicKey =
  process.env.STRIPE_PUBLIC_KEY ||
  "pk_test_51PqI3mId23AXDIWwujdYBjtlJWwt58tkToDnhirQEjHZwmkehtnb1vBut5Mp0SakDsc3rSQJxe9JJKfcxfrP6ZYV00PX7TTSGO";

const stripePromise = loadStripe(stripePublicKey);

const ChoosePaymentMethodStep: FC<TChoosePaymentMethodProps> = ({
  clientSecret,
}) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<EPaymentMethod>(EPaymentMethod.CARD);

  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const handlePaymetMethod = async () => {
    if (!selectedPaymentMethod) return;

    if (selectedPaymentMethod === EPaymentMethod.CARD) {
      setShowPaymentForm(true);
    }
    if (selectedPaymentMethod === EPaymentMethod.APPLE_PAY) {
      console.log("Payment method selected is Apple Pay");
    }
  };

  if (showPaymentForm) {
    return (
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <PaymentForm />
      </Elements>
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
        isDisabled={!selectedPaymentMethod}
      />
    </>
  );
};

export default ChoosePaymentMethodStep;
