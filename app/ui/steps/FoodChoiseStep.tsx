"use client";

import { FC } from "react";
import { TStepMainTypes } from "./StepTypes";
import Footer from "../components/stepperLayout/Footer";
import Image from "next/image";
import StepperBodyWrapper from "../components/stepperLayout/StepperBodyWrapper";
import FoodChoise from "../../../public/FoodChoise.svg";
import StepperTitle from "../components/stepperLayout/StepperTitle";

const FoodChoiseStep: FC<TStepMainTypes> = ({ onConitnue }) => {
  return (
    <>
      <StepperBodyWrapper >
        <StepperTitle>Learn to make better food choices</StepperTitle>
        <div className="mb-6">
          <Image src={FoodChoise} alt="" />
        </div>
      </StepperBodyWrapper>

      <Footer onContinue={onConitnue} />
    </>
  );
};

export default FoodChoiseStep;
