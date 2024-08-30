"use client";

import { FC, useState } from "react";
import { useOnboardingStore } from "@/app/store/onboardingStore";
import { TStepMainTypes } from "./StepTypes";
import Footer from "../components/stepperLayout/Footer";
import SelectableCards, { TCardItem } from "../components/SelectableCard";
import Level1 from "../../../public/icons/level1.svg";
import Level2 from "../../../public/icons/level2.svg";
import Level3 from "../../../public/icons/level3.svg";
import Level4 from "../../../public/icons/level4.svg";
import StepperTitle from "../components/stepperLayout/StepperTitle";
import Image from "next/image";
import StepperBodyWrapper from "../components/stepperLayout/StepperBodyWrapper";
import StepperContentEndWrapper from "../components/stepperLayout/StepperContentEndWrapper";

const activityLevelOptions: TCardItem[] = [
  {
    id: "sedentary",
    title: "Sedentary",
    description: "I spend most of my day sitting",
    icon: <Image src={Level1} alt="Level1" />,
  },
  {
    id: "lightlyActive",
    title: "Lightly active",
    description: "I have made doing exercises a lasting habit",
    icon: <Image src={Level2} alt="Level2" />,
  },
  {
    id: " moderatelyActive",
    title: "Moderately active",
    description: "I work on my feet and move around throughout the day",
    icon: <Image src={Level3} alt="Level3" />,
  },
  {
    id: "veryActive",
    title: "Very active",
    description: "I spend most of my day doing physical activities",
    icon: <Image src={Level4} alt="Level4" />,
  },
];

const ActivityLevelStep: FC<TStepMainTypes> = ({ onConitnue }) => {
  const { setOnboardingData, onboardingData } = useOnboardingStore();
  const [selectedActivityLevel, setSelectedActivityLevel] = useState<
    string | null
  >(onboardingData.activityLevel || null);

  const handleChooseAktivityLevel = () => {
    if (!selectedActivityLevel) return;
    setOnboardingData({ activityLevel: selectedActivityLevel });
    onConitnue();
  };

  return (
    <>
      <StepperBodyWrapper>
        <div>
          <StepperTitle>What is your activity level?</StepperTitle>
        </div>
        <StepperContentEndWrapper >
          <SelectableCards
            defaultValue={onboardingData.activityLevel}
            items={activityLevelOptions}
            onSelect={(id) => {
              setSelectedActivityLevel(id);
            }}
          />
        </StepperContentEndWrapper>
      </StepperBodyWrapper>

      <Footer
        isDisabled={!selectedActivityLevel}
        onContinue={handleChooseAktivityLevel}
      />
    </>
  );
};

export default ActivityLevelStep;
