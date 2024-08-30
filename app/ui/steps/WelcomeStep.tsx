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

const WelcomeStep: FC<TStepMainTypes> = ({ onConitnue }) => {
  return (
    <>
      <div className="px-6 py-4 flex flex-col items-center text-center gap-y-2">
        <StepperTitle>AI-powered calorie tracking</StepperTitle>
        <StepperSubtitle>
          Lets begin with a few questions to <br /> create your customized plan
        </StepperSubtitle>

        <BlurOverlay>
          <Image
            alt="Welcome"
            src={ScanAi}
            style={{
              height: 350,
              width: "100%",
              objectFit: "cover",
            }}
          />
        </BlurOverlay>

        <div>
          <Image alt="Welcome" src={OneMDownloads} />
        </div>
      </div>
      <Footer onContinue={onConitnue} text="Get Started" />
    </>
  );
};

export default WelcomeStep;
