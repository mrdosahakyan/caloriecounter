"use client";

import { FC, useState } from "react";
import { TStepMainTypes } from "./StepTypes";
import Footer from "../components/stepperLayout/Footer";
import StepperBodyWrapper from "../components/stepperLayout/StepperBodyWrapper";
import StepperTitle from "../components/stepperLayout/StepperTitle";
import PaymentCarousel from "../components/carousel/PaymentCarousel";
import ChoosePaymentMethod, {
  EPaymentMethod,
} from "../components/payment/ChoosePaymentMethod";

const PaymentStep: FC<TStepMainTypes> = ({ onConitnue }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<EPaymentMethod>(EPaymentMethod.APPLE_PAY);

  return (
    <>
      <div className={`h-full overflow-y-auto my-2 py-2 mb-[64px]`}>
        <div
          className={`flex flex-col justify-start px-3 h-full items-center `}
        >
          <div className="flex flex-col justify-around content-center h-full w-full">
            <PaymentCarousel />

            <div className="mt-5">
              <StepperTitle className="mb-2">
                Get unlimited access to your plan!
              </StepperTitle>
              <p className="font-roboto text-[14px] font-normal text-center text-[#000000]">
                Unlimited access for just $6.99 Try for one week. Cancel anytime
              </p>
            </div>
            <ChoosePaymentMethod
              selectedPaymentMethod={selectedPaymentMethod}
              setSelectedPaymentMethod={setSelectedPaymentMethod}
            />
          </div>
        </div>
      </div>

      <Footer onContinue={onConitnue} isDisabled />
    </>
  );
};

export default PaymentStep;
