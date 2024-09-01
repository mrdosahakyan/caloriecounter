'use client';

import { Button } from "@nextui-org/react";
import { FiAlertCircle } from "react-icons/fi";

const SomethingWentWrong = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fff9f1] p-4">
      <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg">
        <FiAlertCircle className="text-red-500 text-6xl mb-4" />
        <h1 className="text-2xl text-center font-bold text-gray-800 mb-2">
          Something Went Wrong
        </h1>
        <p className="text-gray-600 text-center mb-6">
          We encountered an unexpected error. Please try again later or return
          to the homepage.
        </p>
        <Button
          radius="full"
          size="lg"
          onClick={() => {
            window.location.href = "/";
          }}
          className={`bg-buttonPrimaryBgColor text-white  `}
        >
          Go to Home Page
        </Button>
      </div>
    </div>
  );
};

export default SomethingWentWrong;
