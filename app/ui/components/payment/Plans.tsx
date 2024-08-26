"use client";

import { FC } from "react";

const priceId1Month =
  process.env.PRICE_1_MONTH || "price_1PrBPGId23AXDIWwXW08PqsV";
export const priceId3Month =
  process.env.PRICE_3_MONTH || "price_1PrBQpId23AXDIWwJAY1RgDV";
const priceIdYear = process.env.PRICE_YEAR || "price_1PrBQpId23AXDIWwpWAhsO7b";

export interface IPlan {
  priceId: string;
  period: number;
  measurement: string;
  pricePerMonth: string;
  priceForPeriod: string;
  isPopular?: boolean;
}

const plans: IPlan[] = [
  {
    priceId: priceId1Month,
    period: 1,
    measurement: "month",
    pricePerMonth: "9.99",
    priceForPeriod: "9.99",
  },
  {
    priceId: priceId3Month,
    period: 3,
    measurement: "months",
    pricePerMonth: "8.99",
    priceForPeriod: "26.97",
  },
  {
    priceId: priceIdYear,
    period: 12,
    measurement: "months",
    pricePerMonth: "7.99",
    priceForPeriod: "95.88",
    isPopular: true,
  },
];

type TPlansProps = {
  selectedPlan: string;
  setSelectedPlan: (plan: string) => void;
};

const Plans: FC<TPlansProps> = ({ selectedPlan, setSelectedPlan }) => {
  return (
    <div className="flex flex-wrap justify-center items-center space-x-2 sm:space-x-4 max-w-full px-2 sm:px-4">
      {plans.map((plan) => (
        <div
          key={plan.priceId}
          className={`relative p-4 border rounded-lg cursor-pointer text-center w-full sm:w-1/3 max-w-[calc(33.333%-0.5rem)] sm:max-w-none 
          ${
            selectedPlan === plan.priceId
              ? "border-[#eb591a] border-2"
              : "border-gray-300"
          } bg-white `}
          onClick={() => setSelectedPlan(plan.priceId)}
        >
          {plan.isPopular && (
            <div className="absolute top-0 right-0 bg-[#ffe2ab] text-xs font-bold py-1 px-2 rounded-bl-lg">
              Popular
            </div>
          )}
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-[#021534]">{plan.period}</h1>
            <h3 className="text-lg font-bold text-[#021534]">
              {plan.measurement}
            </h3>
          </div>
          <div className="mb-2">
            <h4 className="text-gray-600">{`PLN${plan.pricePerMonth}/mo.`}</h4>
            <h4 className="text-gray-600">{plan.priceForPeriod}</h4>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Plans;
