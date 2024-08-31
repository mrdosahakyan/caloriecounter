"use client";

import {  useEffect, useState } from "react";
import ChoosePlanStep from "./ui/steps/ChoosePlanStep";
import ChoosePaymentMethodStep from "./ui/steps/ChoosePaymentMethodStep";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Header from "./ui/components/stepperLayout/Header";
import WelcomeStep from "./ui/steps/WelcomeStep";
import { useOnboardingStore } from "./store/onboardingStore";
import PrimaryGoalStep from "./ui/steps/PrimaryGoalStep";
import GenderStep from "./ui/steps/GenderStep";
import BirthyearStep from "./ui/steps/BirthyearStep";
import HeightWeightStep from "./ui/steps/HeightWeightStep";
import ActivityLevelStep from "./ui/steps/ActivityLevelStep";
import ExperienceStep from "./ui/steps/ExperienceStep";
import AiScanStep from "./ui/steps/AiScanStep";
import FoodChoiseStep from "./ui/steps/FoodChoiseStep";
import TailorProgramStep from "./ui/steps/TailorProgramStep";
import PaymentStep from "./ui/steps/PaymentStep";
import AiTrackerStep from "./ui/steps/AiTrackerStep";
import DailyMacrosStep from "./ui/steps/DailyMacrosStep";

const stripePublicKey =
  process.env.STRIPE_PUBLIC_KEY ||
  "pk_test_51PqI3mId23AXDIWwujdYBjtlJWwt58tkToDnhirQEjHZwmkehtnb1vBut5Mp0SakDsc3rSQJxe9JJKfcxfrP6ZYV00PX7TTSGO";

const stripePromise = loadStripe(stripePublicKey);

export default function Home() {

  // useEffect(() => {
  //   // Disable scroll when the component mounts (picker is active)
  //   document.body.classList.add('no-scroll');
  
  //   // Re-enable scroll when the component unmounts (picker is closed)
  //   return () => {
  //     document.body.classList.remove('no-scroll');
  //   };
  // }, []);
 
  const { onboardingData } = useOnboardingStore();

  const [step, setStep] = useState(0);
  const totalSteps = 11;

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleContinue = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const getCurrentStep = () => {
    if (step === 0) return <WelcomeStep onConitnue={handleContinue} />;
    if (step === 1) return <PrimaryGoalStep onConitnue={handleContinue} />;
    if (step === 2) return <GenderStep onConitnue={handleContinue} />;
    if (step === 3) return <BirthyearStep onConitnue={handleContinue} />;
    if (step === 4) return <HeightWeightStep onConitnue={handleContinue} />;
    if (step === 5) return <ActivityLevelStep onConitnue={handleContinue} />;
    if (step === 6) return <ExperienceStep onConitnue={handleContinue} />;
    if (step === 7) return <AiScanStep onConitnue={handleContinue} />;
    if (step === 8) return <AiTrackerStep onConitnue={handleContinue} />;
    if (step === 9) return <FoodChoiseStep onConitnue={handleContinue} />;
    if (step === 10) return <DailyMacrosStep onConitnue={handleContinue} />;
    if (step === 11) return <TailorProgramStep />;

    // if (step === 12) return <PaymentStep onConitnue={handleContinue} />;
    // if (step === 10) return <ChoosePlanStep onConitnue={handleContinue} />;
    // if (
    //   step === 11 &&
    //   onboardingData.clientSecret &&
    //   onboardingData.stripeCustomerId
    // )
    //   return (
    //     <Elements
    //       stripe={stripePromise}
    //       options={{ clientSecret: onboardingData.clientSecret }}
    //     >
    //       <ChoosePaymentMethodStep />
    //     </Elements>
    //   );
  };
  
  const stepsNotInSteper = [0, 11];
  const hideHeader = stepsNotInSteper.includes(step);

  // useEffect(() => {
  //   function setDynamicHeight() {
  //     const vh = window.innerHeight * 0.01;
  //     document.documentElement.style.setProperty('--vh', `${vh}px`);
  
  //     const element = document.querySelector('.dynamic-height') as HTMLElement;
  //     if (element) {
  //       const dynamicHeight = hideHeader
  //         ? `calc(var(--vh, 1vh) * 100)`
  //         : `calc(var(--vh, 1vh) * 100 - 64px)`;
  //       element.style.height = dynamicHeight;
  //     }
  //   }
  
  //   window.addEventListener('resize', setDynamicHeight);
  //   setDynamicHeight(); // Set the initial height
  
  //   return () => window.removeEventListener('resize', setDynamicHeight);
  // }, [hideHeader]);


  return (
    <main className="bg-transparent flex flex-col h-svh">
      <Header
        currentStep={step}
        onBack={handleBack}
        totalSteps={totalSteps}
        stepsNotInSteper={stepsNotInSteper}
        hideBackButton={step === 1}
      />

      <div
         className={` ${
          hideHeader ? "h-svh" : "h-[calc(100svh-64px)]"
        } bg-transparent flex flex-col`}
      >
        <div className="flex flex-col h-full">{getCurrentStep()}</div>
      </div>
    </main>
  );
}
