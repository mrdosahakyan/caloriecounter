"use client";

import { FC } from "react";
import { TStepMainTypes } from "./StepTypes";
import Footer from "../components/stepperLayout/Footer";
import Image from "next/image";
import StepperBodyWrapper from "../components/stepperLayout/StepperBodyWrapper";
import DailyMacros from "../../../public/DailyMacros.png";
import StepperTitle from "../components/stepperLayout/StepperTitle";
import StepperContentEndWrapper from "../components/stepperLayout/StepperContentEndWrapper";

const DailyMacrosStep: FC<TStepMainTypes> = ({ onConitnue }) => {
  return (
    <>
      <StepperBodyWrapper>
        <StepperTitle>Track & learn about your daily macros</StepperTitle>
        <StepperContentEndWrapper justify="center">
          <Image src={DailyMacros} alt="" />
        </StepperContentEndWrapper>
      </StepperBodyWrapper>

      <Footer onContinue={onConitnue} />
    </>
  );
};

export default DailyMacrosStep;
