"use client";

import { FC, useState } from "react";
import { IHeightWeight, useOnboardingStore } from "@/app/store/onboardingStore";
import { TStepMainTypes } from "./StepTypes";
import Footer from "../components/stepperLayout/Footer";
import StepperTitle from "../components/stepperLayout/StepperTitle";
import StepperBodyWrapper from "../components/stepperLayout/StepperBodyWrapper";
import StepperSubtitle from "../components/stepperLayout/StepperSubTitle";
import HeightWeightPicker from "../components/mobilePicker/HeightWeightPicker";
import StepperContentCenterWrapper from "../components/stepperLayout/StepperContentCenterWrapper";

type THeightWeightStepProps = TStepMainTypes;

const HeightWeightStep: FC<THeightWeightStepProps> = ({ onConitnue }) => {
  const { setOnboardingData, onboardingData } = useOnboardingStore();
  const [selectedHeightWeight, setSelectedHeightWeight] =
    useState<IHeightWeight | null>(onboardingData.heightWeight || null);

  const handleChooseHeightWeight = () => {
    if (!selectedHeightWeight) return;
    setOnboardingData({ heightWeight: selectedHeightWeight });
    onConitnue();
  };

  return (
    <>
      <StepperBodyWrapper justify="start">
        <div>
          <StepperTitle>Height & weight</StepperTitle>
          <StepperSubtitle className="mt-2">
            This will be used to calibrate your <br /> custom plan.
          </StepperSubtitle>
        </div>
        <StepperContentCenterWrapper>
          <HeightWeightPicker
            defaultValue={onboardingData.heightWeight}
            onChange={(value) => {
              setSelectedHeightWeight(value);
            }}
          />
        </StepperContentCenterWrapper>
      </StepperBodyWrapper>

      <Footer
        isDisabled={
          !selectedHeightWeight?.height || !selectedHeightWeight?.weight
        }
        onContinue={handleChooseHeightWeight}
      />
    </>
  );
};

export default HeightWeightStep;
