"use client";

import { FC } from "react";
import { TStepMainTypes } from "./StepTypes";
import Footer from "../components/stepperLayout/Footer";
import StepperBodyWrapper from "../components/stepperLayout/StepperBodyWrapper";
import StepperTitle from "../components/stepperLayout/StepperTitle";
import ProgressBar from "../components/ProgressBar";
import TestimonialsCarousel from "../components/TestimonialsCarousel";

const TailorProgramStep: FC<TStepMainTypes> = ({ onConitnue }) => {
  return (
    <>
      <StepperBodyWrapper justify="start" className="mt-[64px]">
        <StepperTitle>Tailoring your program</StepperTitle>
        <div className="flex flex-col justify-around h-full">
          <div className="flex flex-col gap-6 w-full px-4 mt-5">
            <ProgressBar label="Analysing profile" timeInSeconds={4} />
            <ProgressBar label="Calculating metabolism" timeInSeconds={2} />
            <ProgressBar label="Generating meal plan" timeInSeconds={2} />
            <ProgressBar
              label="Checking healthy conditions"
              timeInSeconds={3}
            />
          </div>
          <div>
            <TestimonialsCarousel />
          </div>
        </div>
      </StepperBodyWrapper>

      <Footer onContinue={onConitnue} />
    </>
  );
};

export default TailorProgramStep;
