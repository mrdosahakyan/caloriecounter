"use client";

import { FC } from "react";
import { TStepMainTypes } from "./StepTypes";
import Footer from "../components/stepperLayout/Footer";
import Image from "next/image";
import StepperBodyWrapper from "../components/stepperLayout/StepperBodyWrapper";
import DailyMacros from "../../../public/DailyMacros.png";
import StepperTitle from "../components/stepperLayout/StepperTitle";
import StepperContentCenterWrapper from "../components/stepperLayout/StepperContentCenterWrapper";
import useDidMount from "../hooks/useDidMount";
import mixpanel from "mixpanel-browser";
import { EMixpanelEvents } from "../integrations/mixpanelEvents";

const DailyMacrosStep: FC<TStepMainTypes> = ({ onConitnue }) => {
  useDidMount(() => {
    mixpanel.track(EMixpanelEvents.PAGE_11_OPENED);
  })
  return (
    <>
      <StepperBodyWrapper>
        <StepperTitle>Track & learn about your daily macros</StepperTitle>
        <StepperContentCenterWrapper>
          <Image src={DailyMacros} alt="" priority />
        </StepperContentCenterWrapper>
      </StepperBodyWrapper>

      <Footer onContinue={onConitnue} />
    </>
  );
};

export default DailyMacrosStep;
