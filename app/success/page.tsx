import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const Success = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fff9f1] p-6">
      <div className="bg-[#fff9f1] rounded-lg shadow-md p-8 text-center max-w-md">
        <FaCheckCircle size={64} className="text-green-500 mb-4 mx-auto" />

        <h1 className="text-3xl font-bold text-[#021534] mb-4">
          Payment Successful
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Thank you for your purchase! Your transaction has been completed
          successfully.
        </p>
      </div>
    </div>
  );
};

export default Success;
