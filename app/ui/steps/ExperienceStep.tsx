"use client";

import { FC, useState } from "react";
import { useOnboardingStore } from "@/app/store/onboardingStore";
import { TStepMainTypes } from "./StepTypes";
import Footer from "../components/stepperLayout/Footer";
import SelectableCards, { TCardItem } from "../components/SelectableCard";
import Beginner from "../../../public/icons/beginner.svg";
import Intermedite from "../../../public/icons/intermediate.svg";
import Master from "../../../public/icons/master.svg";
import PercentUSer from "../../../public/75PercentUser.png";
import StepperTitle from "../components/stepperLayout/StepperTitle";
import Image from "next/image";
import StepperBodyWrapper from "../components/stepperLayout/StepperBodyWrapper";

type TExperienceStepProps = TStepMainTypes;

const experienceOptions: TCardItem[] = [
  {
    id: "beginner",
    title: "Beginner",
    description: "I'm new to weight loss and need to learn a lot",
    icon: <Image width={36} src={Beginner} alt="Level1" />,
  },
  {
    id: "intermidiate",
    title: "Intermidiate",
    description: "I have some experience but Still need some guidance",
    icon: <Image width={36} src={Intermedite} alt="Level2" />,
  },
  {
    id: "master",
    title: "Master",
    description: "I have rich experience",
    icon: <Image width={36} src={Master} alt="Level3" />,
  },
];

const ExperienceStep: FC<TExperienceStepProps> = ({ onConitnue }) => {
  const { setOnboardingData, onboardingData } = useOnboardingStore();
  const [selectedExperience, setSelectedExperience] = useState<string | null>(
    onboardingData.experienceLevel || null
  );

  const handleChooseExperience = () => {
    if (!selectedExperience) return;
    setOnboardingData({ experienceLevel: selectedExperience });
    onConitnue();
  };

  return (
    <>
      <StepperBodyWrapper>
        <div>
          <StepperTitle>
            How familiar are you with the topic of weight loss?
          </StepperTitle>
        </div>

        {selectedExperience === "beginner" && (
          <Image
            style={{
              maxHeight: "135px",
              margin: "8px",
            }}
            width={360}
            src={PercentUSer}
            alt=""
          />
        )}
        <SelectableCards
          defaultValue={onboardingData.experienceLevel}
          items={experienceOptions}
          onSelect={(id) => {
            setSelectedExperience(id);
          }}
        />
      </StepperBodyWrapper>

      <Footer
        isDisabled={!selectedExperience}
        onContinue={handleChooseExperience}
      />
    </>
  );
};

export default ExperienceStep;
