"use client";

import { FC } from "react";
import { TStepMainTypes } from "./StepTypes";
import Footer from "../components/stepperLayout/Footer";
import StepperBodyWrapper from "../components/stepperLayout/StepperBodyWrapper";
import StepperTitle from "../components/stepperLayout/StepperTitle";
import PaymentCarousel from "../components/carousel/PaymentCarousel";

const PaymentStep: FC<TStepMainTypes> = ({ onConitnue }) => {
  return (
    <>
      <StepperBodyWrapper justify="start" className="mt-2">
        <div className="flex flex-col justify-around content-center h-full w-full">
          <PaymentCarousel />

          <div>
            <StepperTitle className="mb-2">
              Get unlimited access to your plan!
            </StepperTitle>
            <p className="font-roboto text-[14px] font-normal text-center text-[#000000]">
              Unlimited access for just $6.99 Try for one week. Cancel anytime
            </p>
          </div>
        </div>
      </StepperBodyWrapper>

      <Footer onContinue={onConitnue} isDisabled />
    </>
  );
};

export default PaymentStep;
