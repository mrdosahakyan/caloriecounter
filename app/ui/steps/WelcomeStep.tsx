"use client";

import { FC } from "react";
import { TStepMainTypes } from "./StepTypes";
import Image from "next/image";
import Footer from "../components/stepperLayout/Footer";
import ScanAi from "../../../public/ScanAi.svg";
import OneMDownloads from "../../../public/1MDownloads.svg";
import StepperTitle from "../components/stepperLayout/StepperTitle";
import StepperSubtitle from "../components/stepperLayout/StepperSubTitle";
import BlurOverlay from "../components/BlurOverlay";
import StepperBodyWrapper from "../components/stepperLayout/StepperBodyWrapper";

const WelcomeStep: FC<TStepMainTypes> = ({ onConitnue }) => {
  return (
    <>
      <StepperBodyWrapper className="gap-y-3">
        <StepperTitle className="mt-6">
          AI-powered calorie tracking
        </StepperTitle>
        <StepperSubtitle>
          Lets begin with a few questions to <br /> create your customized plan
        </StepperSubtitle>

        <BlurOverlay>
          <Image alt="Welcome" src={ScanAi} height={350} />
        </BlurOverlay>

        <div className="mt-1">
          <Image alt="Welcome" src={OneMDownloads} />
        </div>
      </StepperBodyWrapper>
      <Footer onContinue={onConitnue} text="Get Started" />
    </>
  );
};

export default WelcomeStep;
