"use client";

import { Dispatch, FC, SetStateAction, useState } from "react";
import Plans from "../../payment/Plans";
import ContinueButton from "../../components/ContinueButton";

type TChoosePlanStepProps = {
  setCustomerId: Dispatch<SetStateAction<string | null>>;
  setSubscriptionId: Dispatch<SetStateAction<string | null>>;
  setPriceId: Dispatch<SetStateAction<string | null>>;
};

const ChoosePlanStep: FC<TChoosePlanStepProps> = ({
  setCustomerId,
  setPriceId,
  setSubscriptionId,
}) => {
  const [selectedPlanId, setSelectedPlanId] = useState("");

  const handleChoosePlan = () => {
    console.log("Selected Plan ID: ", selectedPlanId);

    // Call the API to create a subscription ans stripe customer

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
