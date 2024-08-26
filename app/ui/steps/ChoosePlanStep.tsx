"use client";

import { FC, useState } from "react";
import Plans from "../components/payment/Plans";
import axios from "axios";
import { useOnboardingStore } from "@/app/store/onboardingStore";
import { TStepMainTypes } from "./StepTypes";
import Footer from "../components/Footer";

type TChoosePlanProps = TStepMainTypes;

const ChoosePlanStep: FC<TChoosePlanProps> = ({ onConitnue }) => {
  const { setOnboardingData } = useOnboardingStore();
  const [selectedPlanId, setSelectedPlanId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChoosePlan = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.post("/api/create-subscription", {
        priceId: selectedPlanId,
      });
      setOnboardingData({
        stripeCustomerId: data.customerId,
        subscriptionId: data.subscriptionId,
        clientSecret: data.clientSecret,
      });
      onConitnue();
    } catch (error) {
      console.error("Error creating subscription:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Plans
        selectedPlan={selectedPlanId}
        setSelectedPlan={setSelectedPlanId}
      />
      <br />
      <Footer
        isLoading={isLoading}
        isDisabled={!selectedPlanId}
        onContinue={handleChoosePlan}
      />
    </>
  );
};

export default ChoosePlanStep;
