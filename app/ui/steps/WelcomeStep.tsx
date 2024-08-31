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
      <div
        className={`overflow-y-auto py-2 w-full`}
        style={{
          height: "88%",
        }}
      >
        <div
          className={`flex flex-col justify-between px-3 h-full items-center`}
        >
          <StepperTitle className="mt-2">
            AI-powered calorie tracking
          </StepperTitle>
          <StepperSubtitle>
            Lets begin with a few questions to <br /> create your customized
            plan
          </StepperSubtitle>

          <BlurOverlay>
            <Image alt="Welcome" src={ScanAi} height={350} />
          </BlurOverlay>

          <div className="mt-1">
            <Image alt="Welcome" src={OneMDownloads} />
          </div>
        </div>
      </div>

      <Footer onContinue={onConitnue} text="Get Started" />
    </>
  );
};

export default WelcomeStep;
