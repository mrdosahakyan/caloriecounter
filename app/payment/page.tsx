"use client";

import { useState } from "react";
import ChoosePaymentMethod, {
  EPaymentMethod,
} from "../ui/components/payment/ChoosePaymentMethod";
import PaymentCarousel from "../ui/components/carousel/PaymentCarousel";
import StepperTitle from "../ui/components/stepperLayout/StepperTitle";
import { Button } from "@nextui-org/react";
import UnvisiblePaymentInfo from "../ui/components/payment/UnvisiblePaymentInfo";

const PaymentPage = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<EPaymentMethod>(EPaymentMethod.APPLE_PAY);
  const isDisabled = true;
  return (
    <>
      <div className="min-h-svh h-svh w-full flex flex-col justify-between py-2 px-3">
        <div className="flex-1 flex flex-col w-full justify-around">
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
        <div className="h-fit">
          <ChoosePaymentMethod
            selectedPaymentMethod={selectedPaymentMethod}
            setSelectedPaymentMethod={setSelectedPaymentMethod}
          />
          <Button
            // isLoading={isLoading}
            radius="full"
            size="lg"
            // onClick={onContinue}
            fullWidth
            className={`bg-[#021533] text-white ${
              isDisabled ? "opacity-50 cursor-not-allowed" : ""
            } mt-2`}
            disabled={isDisabled}
          >
            Continue
          </Button>
        </div>
      </div>
      <div className="bg-[#FFF5E5] px-3">
        <UnvisiblePaymentInfo />
      </div>
    </>
  );
};

export default PaymentPage;
