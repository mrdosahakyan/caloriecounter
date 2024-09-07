"use client";

import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Warning from "../../public/warning.png";
import StepperTitle from "../ui/components/stepperLayout/StepperTitle";

const Success = () => {
  return (
    <div className="flex flex-col items-center justify-between h-svh bg-primaryBgColor p-4">
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
            appear on a customer's <br />
            statement.
          </p>
        </div>
      </div>

      <div className="w-full">
        <Button
          radius="full"
          size="lg"
          onClick={() => {
            window.location.href = "/";
          }}
          className={`bg-buttonPrimaryBgColor text-white w-full`}
        >
          Go to Home Page
        </Button>
      </div>
    </div>
  );
};

export default Success;
