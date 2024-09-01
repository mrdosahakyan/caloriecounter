import React, { ReactNode } from "react";

interface StepperTitleProps {
  children: ReactNode;
  className?: string;
}

const StepperTitle: React.FC<StepperTitleProps> = ({ children, className }) => {
  return (
    <h1
      className={`font-inter text-[25px] font-bold text-center leading-[33px] text-primaryTextColor ${className}`}
    >
      {children}
    </h1>
  );
};

export default StepperTitle;
