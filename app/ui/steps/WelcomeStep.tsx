"use client";

import { FC } from "react";
import { TStepMainTypes } from "./StepTypes";
import Image from "next/image";
import Footer from "../components/stepperLayout/Footer";
import ScanAi from "../../../public/ScanAi.png";
import OneMDownloads from "../../../public/1MDownloads.png";
import StepperTitle from "../components/stepperLayout/StepperTitle";
import StepperSubtitle from "../components/stepperLayout/StepperSubTitle";
import BlurOverlay from "../components/BlurOverlay";
import LooseWeight from "../../../public/icons/looseWeight.png";
import GetHealtier from "../../../public/icons/getHealtier.png";
import StayInShape from "../../../public/icons/stayInShape.png";


const WelcomeStep: FC<TStepMainTypes> = ({ onConitnue }) => {
  return (
    <>
      <div className="hidden">
      <Image src={LooseWeight} alt="Loose weight" width={36} height={36} priority />,
      <Image src={GetHealtier} width={36} height={36} priority alt="Get healthier" />,
      <Image src={StayInShape} alt="Stay in shape" width={36} height={36} priority/>
      </div>
      <div
        className={`overflow-y-auto py-2 w-full`}
        style={{
          height: "88%",
        }}
      >
        <div
          className={`flex flex-col gap-1 justify-between px-3 h-full items-center`}
        >
          <StepperTitle className="mt-2">
            AI-powered calorie tracking
          </StepperTitle>
          <StepperSubtitle>
            Lets begin with a few questions to <br /> create your customized
            plan
          </StepperSubtitle>

          <BlurOverlay>
            <Image alt="Welcome" src={ScanAi} priority />
          </BlurOverlay>

          <div>
            <Image
              alt="Welcome"
              src={OneMDownloads}
              priority
              width={145}
              height={80}
            />
          </div>
        </div>
      </div>

      <Footer onContinue={onConitnue} text="Get Started" />
    </>
  );
};

export default WelcomeStep;
