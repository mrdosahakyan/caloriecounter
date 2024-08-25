"use client";

import { FC } from "react";

export enum EPaymentMethod {
  CARD = "card",
  APPLE_PAY = "apple_pay",
}

type TChoosePaymentMethodProps = {
  selectedPaymentMethod: EPaymentMethod;
  setSelectedPaymentMethod: (paymentMethod: EPaymentMethod) => void;
};

const ChoosePaymentMethod: FC<TChoosePaymentMethodProps> = ({
  selectedPaymentMethod,
  setSelectedPaymentMethod,
}) => {
  return (
    <div className="flex space-x-4">
      <div
        className={`p-4 border rounded-lg cursor-pointer flex items-center justify-center w-1/2 ${
          selectedPaymentMethod === EPaymentMethod.CARD
            ? "border-blue-500 bg-blue-100"
            : "border-gray-300 bg-white"
        }`}
        onClick={() => setSelectedPaymentMethod(EPaymentMethod.CARD)}
      >
        <span className="text-lg font-semibold">Card</span>
      </div>

      <div
        className={`p-4 border rounded-lg cursor-pointer flex items-center justify-center w-1/2 ${
          selectedPaymentMethod === EPaymentMethod.APPLE_PAY
            ? "border-blue-500 bg-blue-100"
            : "border-gray-300 bg-white"
        }`}
        onClick={() => setSelectedPaymentMethod(EPaymentMethod.APPLE_PAY)}
      >
        <span className="text-lg font-semibold">Apple Pay</span>
      </div>
    </div>
  );
};

export default ChoosePaymentMethod;
