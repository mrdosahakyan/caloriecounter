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
import AiTracker from "../../../public/AiTracker.png";
import Image from "next/image";
import useDidMount from "../hooks/useDidMount";
import mixpanel from "mixpanel-browser";
import { EMixpanelEvents } from "../integrations/mixpanelEvents";

type TBirthyearStepProps = TStepMainTypes;

const BirthyearStep: FC<TBirthyearStepProps> = ({ onConitnue }) => {
  const { setOnboardingData, onboardingData } = useOnboardingStore();
  const [selectedBirthyear, setSelectedBirthyear] = useState<string | null>(
    onboardingData.birthYear || null
  );
  useDidMount(() => {
    mixpanel.track(EMixpanelEvents.PAGE_4_OPENED);
  });

  const handleChooseYear = () => {
    if (!selectedBirthyear) return;
    setOnboardingData({ birthYear: selectedBirthyear });
    onConitnue();
  };

  return (
    <>
    <div style={{
      display: 'none'
    }}>
      <Image src={AiTracker} alt="" priority/>
    </div>
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
