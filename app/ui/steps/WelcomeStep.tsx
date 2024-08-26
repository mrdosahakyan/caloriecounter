"use client";

import { FC } from "react";
import { TStepMainTypes } from "./StepTypes";
import Image from "next/image";
import Footer from "../components/Footer";
import WelcomeImage from "../../../public/WelcomeStep.jpg";

const WelcomeStep: FC<TStepMainTypes> = ({ onConitnue }) => {
  return (
    <>
      <div className="px-6 flex flex-col items-center text-center mt-10 pt-10">
        <div>
          <Image alt="Welcome" src={WelcomeImage} width={350} />
        </div>
        <p className="text-xl font-bold mt-6">
          Lets begin with a few questions to create your customized plan
        </p>
      </div>
      <Footer onContinue={onConitnue} text="Get Started" />
    </>
  );
};

export default WelcomeStep;
