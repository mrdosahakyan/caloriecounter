"use client";

import { FC } from "react";

const priceId1Month =
  process.env.PRICE_1_MONTH || "price_1PrBPGId23AXDIWwXW08PqsV";
const priceId3Month =
  process.env.PRICE_3_MONTH || "price_1PrBQpId23AXDIWwJAY1RgDV";
const priceIdYear = process.env.PRICE_YEAR || "price_1PrBQpId23AXDIWwpWAhsO7b";

export interface IPlan {
  priceId: string;
  period: number;
  measurement: string;
  pricePerMonth: string;
  priceForPeriod: string;
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
  },
];

type TPlansProps = {
  selectedPlan: string;
  setSelectedPlan: (plan: string) => void;
};

const Plans: FC<TPlansProps> = ({ selectedPlan, setSelectedPlan }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {plans.map((plan) => (
        <div
          key={plan.priceId}
          className={`p-4 border rounded-lg cursor-pointer ${
            selectedPlan === plan.priceId
              ? "border-blue-500 bg-blue-100"
              : "border-gray-300 bg-white"
          }`}
          onClick={() => setSelectedPlan(plan.priceId)}
        >
          <div className="text-center">
            <div className="mb-2">
              <h1 className="text-xl font-bold">{plan.period}</h1>
              <h3 className="text-xl font-bold">{plan.measurement}</h3>
              <h4 className="text-gray-600">{plan.pricePerMonth}/mo.</h4>
            </div>
            <div>
              <h3 className="text-lg font-semibold">
                {plan.priceForPeriod} total
              </h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Plans;
