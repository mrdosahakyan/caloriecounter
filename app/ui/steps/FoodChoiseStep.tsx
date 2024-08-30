"use client";

import { FC } from "react";
import { TStepMainTypes } from "./StepTypes";
import Footer from "../components/stepperLayout/Footer";
import Image from "next/image";
import StepperBodyWrapper from "../components/stepperLayout/StepperBodyWrapper";
import FoodChoise from "../../../public/FoodChoise.svg";
import StepperTitle from "../components/stepperLayout/StepperTitle";
import StepperContentEndWrapper from "../components/stepperLayout/StepperContentEndWrapper";

const FoodChoiseStep: FC<TStepMainTypes> = ({ onConitnue }) => {
  return (
    <>
      <StepperBodyWrapper>
        <StepperTitle>Learn to make better food choices</StepperTitle>
        <StepperContentEndWrapper justify="center">
          <Image src={FoodChoise} alt="" />
        </StepperContentEndWrapper>
      </StepperBodyWrapper>

      <Footer onContinue={onConitnue} />
    </>
  );
};

export default FoodChoiseStep;
