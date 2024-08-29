"use client";

import { FC } from "react";
import { TStepMainTypes } from "./StepTypes";
import Footer from "../components/stepperLayout/Footer";
import Image from "next/image";
import StepperBodyWrapper from "../components/stepperLayout/StepperBodyWrapper";
import AiScanImg from "../../../public/ScanAi.svg";
import StepperTitle from "../components/stepperLayout/StepperTitle";

const AiScanStep: FC<TStepMainTypes> = ({ onConitnue }) => {
  return (
    <>
      <StepperBodyWrapper>
        <StepperTitle>
          A simple scan gets you everything about your food
        </StepperTitle>
        <Image src={AiScanImg} alt="" />
      </StepperBodyWrapper>

      <Footer onContinue={onConitnue} />
    </>
  );
};

export default AiScanStep;
