"use client";

import { FC, useState } from "react";
import { useOnboardingStore } from "@/app/store/onboardingStore";
import { TStepMainTypes } from "./StepTypes";
import Footer from "../components/stepperLayout/Footer";
import SelectableCards, { TCardItem } from "../components/SelectableCard";
import Female from "../../../public/icons/female.svg";
import Male from "../../../public/icons/male.svg";
import NonBinary from "../../../public/icons/nonBinaryGender.svg";
import StepperTitle from "../components/stepperLayout/StepperTitle";
import Image from "next/image";
import StepperBodyWrapper from "../components/stepperLayout/StepperBodyWrapper";
import StepperSubtitle from "../components/stepperLayout/StepperSubTitle";
import StepperContentEndWrapper from "../components/stepperLayout/StepperContentEndWrapper";

const genderGoalOptions: TCardItem[] = [
  {
    id: "male",
    title: "Male",
    icon: <Image src={Male} alt="male" />,
  },
  {
    id: "female",
    title: "Female",
    icon: <Image src={Female} alt="Female" />,
  },
  {
    id: "nonBinary",
    title: "Non-binary",
    icon: <Image src={NonBinary} alt="Non-binary" />,
  },
];

const GenderStep: FC<TStepMainTypes> = ({ onConitnue }) => {
  const { setOnboardingData, onboardingData } = useOnboardingStore();
  const [selectedGender, setSelectedGender] = useState<string | null>(
    onboardingData.gender || null
  );

  const handleChooseGender = () => {
    if (!selectedGender) return;
    setOnboardingData({ gender: selectedGender });
    onConitnue();
  };

  return (
    <>
      <StepperBodyWrapper>
        <div>
          <StepperTitle>What’s Your gender?</StepperTitle>
          <StepperSubtitle className="mt-2">
            We ask for your gender to provide you with nutrition recommendations
            that will best benefit your body type
          </StepperSubtitle>
        </div>
        <StepperContentEndWrapper className="w-full">
          <SelectableCards
            defaultValue={onboardingData.gender}
            items={genderGoalOptions}
            onSelect={(id) => {
              setSelectedGender(id);
            }}
          />
        </StepperContentEndWrapper>
      </StepperBodyWrapper>

      <Footer isDisabled={!selectedGender} onContinue={handleChooseGender} />
    </>
  );
};

export default GenderStep;
