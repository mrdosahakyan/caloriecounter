"use client";

import { FC, useState } from "react";
import { useOnboardingStore } from "@/app/store/onboardingStore";
import { TStepMainTypes } from "./StepTypes";
import Footer from "../components/stepperLayout/Footer";
import SelectableCards, { TCardItem } from "../components/SelectableCard";
import LooseWeight from "../../../public/icons/looseWeight.png";
import StayInShape from "../../../public/icons/stayInShape.png";
import GetHealtier from "../../../public/icons/getHealtier.png";
import StepperTitle from "../components/stepperLayout/StepperTitle";
import Image from "next/image";
import StepperBodyWrapper from "../components/stepperLayout/StepperBodyWrapper";
import PercentUSer from "../../../public/75PercentUser.png";
import Female from "../../../public/icons/female.png";
import Male from "../../../public/icons/male.png";
import NonBinary from "../../../public/icons/nonBinaryGender.png";

const primaryGoalOptions: TCardItem[] = [
  {
    id: "loseWeight",
    title: "Lose weight",
    icon: (
      <Image
        src={LooseWeight}
        alt="Loose weight"
        width={36}
        height={36}
        priority
      />
    ),
  },
  {
    id: "getHealtier",
    title: "Get healthier",
    icon: (
      <Image
        src={GetHealtier}
        alt="Get healthier"
        width={36}
        height={36}
        priority
      />
    ),
  },
  {
    id: "stayInShape",
    title: "Stay in shape",
    icon: (
      <Image
        src={StayInShape}
        alt="Stay in shape"
        width={36}
        height={36}
        priority
      />
    ),
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
      <div className="hidden">
        <Image
          src={NonBinary}
          alt="Non-binary"
          width={36}
          height={36}
          priority
        />
        <Image src={Female} alt="Female" width={36} height={36} priority />
        <Image src={Male} alt="male" width={36} height={36} priority />
        <Image src={PercentUSer} alt="" priority />
      </div>
      <StepperBodyWrapper>
        <StepperTitle>What is your primary goal?</StepperTitle>

        <SelectableCards
          defaultValue={onboardingData.goal}
          items={primaryGoalOptions}
          onSelect={(id) => {
            setSelectedGoalId(id);
          }}
        />
      </StepperBodyWrapper>

      <Footer isDisabled={!selectedGoalId} onContinue={handleChoosePlan} />
    </>
  );
};

export default PrimaryGoalStep;
