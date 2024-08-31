"use client";

import { FC, useState } from "react";
import { useOnboardingStore } from "@/app/store/onboardingStore";
import { TStepMainTypes } from "./StepTypes";
import Footer from "../components/stepperLayout/Footer";
import StepperTitle from "../components/stepperLayout/StepperTitle";
import StepperBodyWrapper from "../components/stepperLayout/StepperBodyWrapper";
import StepperSubtitle from "../components/stepperLayout/StepperSubTitle";
import YearsPicker from "../components/mobilePicker/YearsPicker";
import StepperContentCenterWrapper from "../components/stepperLayout/StepperContentCenterWrapper";

type TBirthyearStepProps = TStepMainTypes;

const BirthyearStep: FC<TBirthyearStepProps> = ({ onConitnue }) => {
  const { setOnboardingData, onboardingData } = useOnboardingStore();
  const [selectedBirthyear, setSelectedBirthyear] = useState<string | null>(
    onboardingData.birthYear || null
  );

  const handleChooseYear = () => {
    if (!selectedBirthyear) return;
    setOnboardingData({ birthYear: selectedBirthyear });
    onConitnue();
  };

  return (
    <>
      <StepperBodyWrapper>
        <div>
          <StepperTitle>When is your birthyear?</StepperTitle>
          <StepperSubtitle className="mt-2">
            Please enter your birth year to improve your experience!
          </StepperSubtitle>
        </div>
        <StepperContentCenterWrapper>
          <YearsPicker
            defaultValue={onboardingData.birthYear}
            onYearChange={(year) => setSelectedBirthyear(year)}
          />
        </StepperContentCenterWrapper>
      </StepperBodyWrapper>

      <Footer isDisabled={!selectedBirthyear} onContinue={handleChooseYear} />
    </>
  );
};

export default BirthyearStep;
