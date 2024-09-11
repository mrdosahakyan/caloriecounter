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
import mixpanel from "mixpanel-browser";
import useDidMount from "../hooks/useDidMount";
import { EMixpanelEvents } from "../integrations/mixpanelEvents";

const WelcomeStep: FC<TStepMainTypes> = ({ onConitnue }) => {
  useDidMount(() => {
    mixpanel.track(EMixpanelEvents.PAGE_1_OPENED);
  });
  return (
    <>
      <div className="hidden">
        <Image
          src={LooseWeight}
          alt="Loose weight"
          width={36}
          height={36}
          priority
        />
        ,
        <Image
          src={GetHealtier}
          width={36}
          height={36}
          priority
          alt="Get healthier"
        />
        ,
        <Image
          src={StayInShape}
          alt="Stay in shape"
          width={36}
          height={36}
          priority
        />
      </div>
      <div
        className={`overflow-y-auto my-3 w-full`}
        style={{
          height: "85%",
        }}
      >
        <div
          className={`flex flex-col gap-1 justify-center px-3 h-full items-center`}
        >
          <div className="mb-[70px]">
            <Image alt="Welcome" src={OneMDownloads} priority />
          </div>
          <StepperTitle>
            Let’s begin with a few questions to create your customized plan
          </StepperTitle>
        </div>
      </div>

      <Footer onContinue={onConitnue} text="Get Started" />
    </>
  );
};

export default WelcomeStep;
