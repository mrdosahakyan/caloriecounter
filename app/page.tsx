"use client";

import { useState } from "react";
import ChoosePlanStep from "./ui/steps/ChoosePlanStep";
import ChoosePaymentMethodStep from "./ui/steps/ChoosePaymentMethodStep";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Header from "./ui/components/Header";
import WelcomeStep from "./ui/steps/WelcomeStep";
import { useOnboardingStore } from "./store/onboardingStore";
import PrimaryGoalStep from "./ui/steps/PrimaryGoalStep";

const stripePublicKey =
  process.env.STRIPE_PUBLIC_KEY ||
  "pk_test_51PqI3mId23AXDIWwujdYBjtlJWwt58tkToDnhirQEjHZwmkehtnb1vBut5Mp0SakDsc3rSQJxe9JJKfcxfrP6ZYV00PX7TTSGO";

const stripePromise = loadStripe(stripePublicKey);

export default function Home() {
  const { onboardingData } = useOnboardingStore();

  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleContinue = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const getCurrentStep = () => {
    if (step === 1) return <WelcomeStep onConitnue={handleContinue} />;
    if (step === 2) return <PrimaryGoalStep onConitnue={handleContinue} />;
    if (step === 3) return <ChoosePlanStep onConitnue={handleContinue} />;
    if (
      step === 4 &&
      onboardingData.clientSecret &&
      onboardingData.stripeCustomerId
    )
      return (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret: onboardingData.clientSecret }}
        >
          <ChoosePaymentMethodStep />
        </Elements>
      );
  };

  const hideHeader = step === 1 || step === 4;

  return (
    <main className="bg-transparent flex flex-col min-h-screen">
      <Header
        currentStep={step}
        onBack={handleBack}
        totalSteps={totalSteps}
        hideHeader={hideHeader}
      />

      <div
        className={`flex-grow overflow-y-auto ${
          hideHeader ? "" : "mt-[64px]"
        }  mb-[64px]`}
      >
        {getCurrentStep()}
      </div>
    </main>
  );
}
