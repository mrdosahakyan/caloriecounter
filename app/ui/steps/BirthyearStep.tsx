"use client";

import { FC, useState } from "react";
import { useOnboardingStore } from "@/app/store/onboardingStore";
import { TStepMainTypes } from "./StepTypes";
import Footer from "../components/stepperLayout/Footer";
import StepperTitle from "../components/stepperLayout/StepperTitle";
import StepperBodyWrapper from "../components/stepperLayout/StepperBodyWrapper";
import StepperSubtitle from "../components/stepperLayout/StepperSubTitle";
import YearsPicker from "../components/mobilePicker/YearsPicker";

type TBirthyearStepProps = TStepMainTypes;
 

const BirthyearStep: FC<TBirthyearStepProps> = ({ onConitnue }) => {
  const { setOnboardingData } = useOnboardingStore();
  const [selectedBirthyear, setSelectedBirthyear] = useState<string | null>(
    null
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
        <div className="mb-10 pb-10">
          <YearsPicker defaultValue="1999" onYearChange={(year) => setSelectedBirthyear(year)} />
        </div>
      </StepperBodyWrapper>

      <Footer isDisabled={!selectedBirthyear} onContinue={handleChooseYear} />
    </>
  );
};

export default BirthyearStep;
