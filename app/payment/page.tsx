"use client";

import { FC, useState } from "react";
import ChoosePaymentMethod, {
  EPaymentMethod,
} from "../ui/components/payment/ChoosePaymentMethod";
import PaymentCarousel from "../ui/components/carousel/PaymentCarousel";
import StepperTitle from "../ui/components/stepperLayout/StepperTitle";
import Footer from "../ui/components/stepperLayout/Footer";
import { Button } from "@nextui-org/react";

const supportEmail = process.env.SUPPORT_EMAIL || "support@example.com";
const moneyBackPolicyLink = process.env.MONEY_BACK_POLICY_LINK || "#";
const termsOfServiceLink = process.env.TERMS_OF_SERVICE_LINK || "#";
const privacyPolicyLink = process.env.PRIVACY_POLICY_LINK || "#";

const Payment = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<EPaymentMethod>(EPaymentMethod.APPLE_PAY);
  const isDisabled = false;
  return (
    <>
      <div className="full-height w-full flex flex-col justify-between py-2 px-3">
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
        <div className="font-roboto text-[11px] font-normal leading-[16.5px] tracking-[0.0044em] text-center bg-[#FFF5E5] py-2">
          By proceeding, you acknowledge and agree to our
          {" "}
          <a href={termsOfServiceLink} className="underline">
            Terms of Service
          </a>{" "}
          &
          {" "}
          <a href={privacyPolicyLink} className="underline">
            Privacy Policy
          </a>
          .
        </div>
        <div className="font-roboto text-[11px] font-normal leading-[16.5px] tracking-[0.0044em] text-justify bg-[#FFF5E5] py-2">
          Your plan will be available immediately after registration. Today you
          will be charged 6,99$ for 7-days trial, then 29,99$ after trial for
          your 1-month plan. You can cancel anytime before then and will not be
          charged the next payment. No hidden payments. AI Tracker will
          automatically charge your card every billing period so you don&apos;t lose
          access to your account. No refunds or credits except if you don&apos;t get
          any results and follow our{" "}
          <a href={moneyBackPolicyLink} className=" underline">
            money-back policy
          </a>
          . To cancel, simply let us know:{" "}
          <a href="mailto:support@example.com" className=" underline">
            {supportEmail}
          </a>
          .
        </div>
      </div>
    </>
  );
};

export default Payment;
