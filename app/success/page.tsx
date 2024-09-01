"use client";

import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Button } from "@nextui-org/react";

const Success = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fff9f1] p-4">
      <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg">
        <FaCheckCircle size={64} className="text-green-500 mb-4" />

        <h1 className="text-2xl text-center font-bold text-gray-800 mb-2">
          Payment Successful
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Thank you for your purchase! Your transaction has been completed
          successfully.
        </p>
        <Button
          radius="full"
          size="lg"
          onClick={() => {
            window.location.href = "/";
          }}
          className={`bg-buttonPrimaryBgColor text-white`}
        >
          Go to Home Page
        </Button>
      </div>
    </div>
  );
};

export default Success;
