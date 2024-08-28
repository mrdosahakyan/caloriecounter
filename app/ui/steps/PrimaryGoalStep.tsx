"use client";

import { FC, useState } from "react";
import { useOnboardingStore } from "@/app/store/onboardingStore";
import { TStepMainTypes } from "./StepTypes";
import Footer from "../components/Footer";
import SelectableCards, { TCardItem } from "../components/SelectableCard";
import LooseWeight from "../../../public/icons/looseWeight.svg";
import StayInShape from "../../../public/icons/stayInShape.svg";
import GetHealtier from "../../../public/icons/getHealtier.svg";
import StepperTitle from "../components/StepperTitle";
import Image from "next/image";
import StepperBodyWrapper from "../components/StepperBodyWrapper";

type TPrimaryGoalStepProps = TStepMainTypes;

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

const PrimaryGoalStep: FC<TPrimaryGoalStepProps> = ({ onConitnue }) => {
  const { setOnboardingData } = useOnboardingStore();
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);

  const handleChoosePlan = () => {
    if (!selectedGoalId) return;
    setOnboardingData({ goal: selectedGoalId });
    onConitnue();
  };

  return (
    <>
      <StepperBodyWrapper>
        <div>
          <StepperTitle>
            What is your <br /> primary goal?
          </StepperTitle>
        </div>
        <div>
          <SelectableCards
            items={primaryGoalOptions}
            onSelect={(id) => {
              setSelectedGoalId(id);
            }}
          />
        </div>
      </StepperBodyWrapper>

      <Footer isDisabled={!selectedGoalId} onContinue={handleChoosePlan} />
    </>
  );
};

export default PrimaryGoalStep;
