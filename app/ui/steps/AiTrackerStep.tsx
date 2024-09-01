"use client";

import { FC } from "react";
import { TStepMainTypes } from "./StepTypes";
import Footer from "../components/stepperLayout/Footer";
import Image from "next/image";
import StepperBodyWrapper from "../components/stepperLayout/StepperBodyWrapper";
import AiTracker from "../../../public/AiTracker.svg";
import StepperTitle from "../components/stepperLayout/StepperTitle";
import StepperContentCenterWrapper from "../components/stepperLayout/StepperContentCenterWrapper";

const AiTrackerStep: FC<TStepMainTypes> = ({ onConitnue }) => {
  return (
    <>
      <StepperBodyWrapper>
        <StepperTitle>
          Our high-tech AI tracker makes the weight loss process painless
        </StepperTitle>
        <StepperContentCenterWrapper>
          <Image src={AiTracker} alt="" priority/>
        </StepperContentCenterWrapper>
      </StepperBodyWrapper>

      <Footer onContinue={onConitnue} />
    </>
  );
};

export default AiTrackerStep;
