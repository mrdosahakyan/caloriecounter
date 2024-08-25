"use client";

import { Dispatch, FC, SetStateAction, useState } from "react";
import Plans from "../../payment/Plans";
import ContinueButton from "../../components/ContinueButton";
import axios from "axios";

type TChoosePlanStepProps = {
  setCustomerId: Dispatch<SetStateAction<string | null>>;
  setSubscriptionId: Dispatch<SetStateAction<string | null>>;
  setClientSecret: Dispatch<SetStateAction<string>>;
};

const ChoosePlanStep: FC<TChoosePlanStepProps> = ({
  setCustomerId,
  setClientSecret,
  setSubscriptionId,
}) => {
  const [selectedPlanId, setSelectedPlanId] = useState("");

  
    const handleChoosePlan = async () => {
      try {
        const { data } = await axios.post("/api/create-subscription", {
          priceId: selectedPlanId,
        });

        setCustomerId(data.customerId);
        setSubscriptionId(data.subscriptionId);
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("Error creating subscription:", error);
      }
    };
   

  return (
    <>
      <Plans
        selectedPlan={selectedPlanId}
        setSelectedPlan={setSelectedPlanId}
      />
      <br />
      <ContinueButton isDisabled={!selectedPlanId} onClick={handleChoosePlan} />
    </>
  );
};

export default ChoosePlanStep;
