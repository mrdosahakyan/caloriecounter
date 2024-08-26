"use client";

import { FC, useState } from "react";
import Plans, { priceId3Month } from "../components/payment/Plans";
import axios from "axios";
import { useOnboardingStore } from "@/app/store/onboardingStore";
import { TStepMainTypes } from "./StepTypes";
import Footer from "../components/Footer";

type TChoosePlanProps = TStepMainTypes;

const ChoosePlanStep: FC<TChoosePlanProps> = ({ onConitnue }) => {
  const { setOnboardingData } = useOnboardingStore();
  const [selectedPlanId, setSelectedPlanId] = useState(priceId3Month);
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "80vh",
        justifyContent: "flex-end",
      }}
    >
      <div className="flex flex-col items-center text-center px-4">
        <h1 className="text-2xl font-bold text-[#021534] mb-2">
          Get unlimited access to your weight loss plan!
        </h1>
        <p className="text-lg font-bold text-[#FF6B00] mb-6">
          Reach 70.2 kg goal on Sep 9
        </p>

        <Plans
          selectedPlan={selectedPlanId}
          setSelectedPlan={setSelectedPlanId}
        />

        <p className="text-sm font-bold text-[#021534] mt-4">
          ✓ No Payment Now!
        </p>

        <Footer
          isLoading={isLoading}
          isDisabled={!selectedPlanId}
          onContinue={handleChoosePlan}
        />
      </div>
    </div>
  );
};

export default ChoosePlanStep;
