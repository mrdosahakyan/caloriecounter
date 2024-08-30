"use client";

import { FC, useState } from "react";
import { useOnboardingStore } from "@/app/store/onboardingStore";
import { TStepMainTypes } from "./StepTypes";
import Footer from "../components/stepperLayout/Footer";
import SelectableCards, { TCardItem } from "../components/SelectableCard";
import LooseWeight from "../../../public/icons/looseWeight.svg";
import StayInShape from "../../../public/icons/stayInShape.svg";
import GetHealtier from "../../../public/icons/getHealtier.svg";
import StepperTitle from "../components/stepperLayout/StepperTitle";
import Image from "next/image";
import StepperBodyWrapper from "../components/stepperLayout/StepperBodyWrapper";
import StepperContentEndWrapper from "../components/stepperLayout/StepperContentEndWrapper";

const primaryGoalOptions: TCardItem[] = [
  {
    id: "loseWeight",
    title: "Lose weight",
    icon: <Image src={LooseWeight} alt="Loose weight" />,
  },
  {
    id: "getHealtier",
    title: "Get healthier",
    icon: <Image src={GetHealtier} alt="Get healthier" />,
  },
  {
    id: "stayInShape",
    title: "Stay in shape",
    icon: <Image src={StayInShape} alt="Stay in shape" />,
  },
];

const PrimaryGoalStep: FC<TStepMainTypes> = ({ onConitnue }) => {
  const { setOnboardingData, onboardingData } = useOnboardingStore();
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(
    onboardingData.goal || null
  );

  const handleChoosePlan = () => {
    if (!selectedGoalId) return;
    setOnboardingData({ goal: selectedGoalId });
    onConitnue();
  };

  return (
    <>
      <StepperBodyWrapper>
        <div>
          <StepperTitle>What is your primary goal?</StepperTitle>
        </div>
        <StepperContentEndWrapper className="w-full">
          <SelectableCards
            defaultValue={onboardingData.goal}
            items={primaryGoalOptions}
            onSelect={(id) => {
              setSelectedGoalId(id);
            }}
          />
        </StepperContentEndWrapper>
      </StepperBodyWrapper>

      <Footer isDisabled={!selectedGoalId} onContinue={handleChoosePlan} />
    </>
  );
};

export default PrimaryGoalStep;
