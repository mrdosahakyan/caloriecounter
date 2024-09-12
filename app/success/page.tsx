"use client";

import React from "react";
import Image from "next/image";
import Warning from "../../public/warning.png";
import StepperTitle from "../ui/components/stepperLayout/StepperTitle";
import ContinueButton from "../ui/components/ContinueButton";
import mixpanel from "mixpanel-browser";
import useDidMount from "../ui/hooks/useDidMount";
import { EMixpanelEvents } from "../ui/integrations/mixpanelEvents";
import { initializeMixpanel } from "../ui/integrations/mixpanelInit";

initializeMixpanel();

const Success = () => {
  useDidMount(() => {
    mixpanel.track(EMixpanelEvents.PAGE_14_OPENED);
  });
  return (
    <div className="flex flex-col items-center justify-between h-svh bg-primaryBgColor p-4 pb-0 max-w-md mx-auto">
      <div className="h-full flex flex-col items-center justify-around">
        <div>
          <Image
            src={Warning}
            alt="warning"
            width={100}
            height={100}
            priority
          />
        </div>

        <div>
          <StepperTitle>Your payment will be refunded</StepperTitle>
        </div>
        <div>
          <p className="font-inter text-[20px] font-normal text-center text-[#09162E] mb-6 ">
            We are updating the app and have temporarily suspended new
            purchases. We apologize for the inconvenience.
          </p>
          <p className="font-inter text-[20px] font-normal text-center text-[#09162E] ">
            Refunds takes 5-10 days to <br />
            appear on a customer&apos;s <br />
            statement.
          </p>
        </div>
      </div>

      <div className="w-full">
        <ContinueButton
          onClick={() => {
            window.location.href = "/";
          }}
          text="Go to Home Page"
        />
      </div>
    </div>
  );
};

export default Success;
