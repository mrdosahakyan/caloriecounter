"use client";

import { FC } from "react";
import { TStepMainTypes } from "./StepTypes";
import Footer from "../components/stepperLayout/Footer";
import Image from "next/image";
import StepperBodyWrapper from "../components/stepperLayout/StepperBodyWrapper";
import AiScanImg from "../../../public/ScanAi.png";
import StepperTitle from "../components/stepperLayout/StepperTitle";
import StepperContentCenterWrapper from "../components/stepperLayout/StepperContentCenterWrapper";
import useDidMount from "../hooks/useDidMount";
import mixpanel from "mixpanel-browser";
import { EMixpanelEvents } from "../integrations/mixpanelEvents";

const AiScanStep: FC<TStepMainTypes> = ({ onConitnue }) => {
  useDidMount(() => {
    mixpanel.track(EMixpanelEvents.PAGE_8_OPENED);
  });
  return (
    <>
      <StepperBodyWrapper>
        <StepperTitle>
          A simple scan gets you everything about your food
        </StepperTitle>
        <StepperContentCenterWrapper>
          <Image src={AiScanImg} alt="" priority />
        </StepperContentCenterWrapper>
      </StepperBodyWrapper>

      <Footer onContinue={onConitnue} />
    </>
  );
};

export default AiScanStep;
