"use client";

import { FC, useState } from "react";
import { useOnboardingStore } from "@/app/store/onboardingStore";
import { TStepMainTypes } from "./StepTypes";
import Footer from "../components/stepperLayout/Footer";
import SelectableCards, { TCardItem } from "../components/SelectableCard";
import Female from "../../../public/icons/female.png";
import Male from "../../../public/icons/male.png";
import NonBinary from "../../../public/icons/nonBinaryGender.png";
import StepperTitle from "../components/stepperLayout/StepperTitle";
import Image from "next/image";
import StepperBodyWrapper from "../components/stepperLayout/StepperBodyWrapper";
import StepperSubtitle from "../components/stepperLayout/StepperSubTitle";
import FoodChoise from "../../../public/FoodChoise.png";
import useDidMount from "../hooks/useDidMount";
import mixpanel from "mixpanel-browser";
import { EMixpanelEvents } from "../integrations/mixpanelEvents";

const genderGoalOptions: TCardItem[] = [
  {
    id: "male",
    title: "Male",
    icon: <Image src={Male} alt="male" width={36} height={36} priority />,
  },
  {
    id: "female",
    title: "Female",
    icon: <Image src={Female} alt="Female" width={36} height={36} priority/>,
  },
  {
    id: "nonBinary",
    title: "Non-binary",
    icon: <Image src={NonBinary} alt="Non-binary" width={36} height={36} priority/>,
  },
];

const GenderStep: FC<TStepMainTypes> = ({ onConitnue }) => {
  const { setOnboardingData, onboardingData } = useOnboardingStore();
  const [selectedGender, setSelectedGender] = useState<string | null>(
    onboardingData.gender || null
  );
  useDidMount(() => {
    mixpanel.track(EMixpanelEvents.PAGE_3_OPENED);
  });

  const handleChooseGender = () => {
    if (!selectedGender) return;
    setOnboardingData({ gender: selectedGender });
    onConitnue();
  };

  return (
    <>
      <div
        style={{
          display: "none",
        }}
      >
        <Image src={FoodChoise} alt="" priority />
      </div>
      <StepperBodyWrapper>
        <div>
          <StepperTitle>What’s Your gender?</StepperTitle>
          <StepperSubtitle className="mt-2">
            We ask for your gender to provide you with nutrition recommendations
            that will best benefit your body type
          </StepperSubtitle>
        </div>

        <SelectableCards
          defaultValue={onboardingData.gender}
          items={genderGoalOptions}
          onSelect={(id) => {
            setSelectedGender(id);
          }}
        />
      </StepperBodyWrapper>

      <Footer isDisabled={!selectedGender} onContinue={handleChooseGender} />
    </>
  );
};

export default GenderStep;
