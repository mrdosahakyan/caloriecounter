"use client";

import { FC } from "react";
import { TStepMainTypes } from "./StepTypes";
import Footer from "../components/stepperLayout/Footer";
import Image from "next/image";
import StepperBodyWrapper from "../components/stepperLayout/StepperBodyWrapper";
import FoodChoise from "../../../public/FoodChoise.png";
import StepperTitle from "../components/stepperLayout/StepperTitle";
import StepperContentCenterWrapper from "../components/stepperLayout/StepperContentCenterWrapper";
import useDidMount from "../hooks/useDidMount";
import mixpanel from "mixpanel-browser";
import { EMixpanelEvents } from "../integrations/mixpanelEvents";

const FoodChoiseStep: FC<TStepMainTypes> = ({ onConitnue }) => {
  useDidMount(() => {
    mixpanel.track(EMixpanelEvents.PAGE_10_OPENED);
  })
  return (
    <>
      <StepperBodyWrapper>
        <StepperTitle>Learn to make better food choices</StepperTitle>
        <StepperContentCenterWrapper>
          <Image src={FoodChoise} alt="" priority />
        </StepperContentCenterWrapper>
      </StepperBodyWrapper>

      <Footer onContinue={onConitnue} />
    </>
  );
};

export default FoodChoiseStep;
