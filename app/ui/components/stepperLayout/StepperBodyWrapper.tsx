import { ReactNode } from "react";

interface StepperBodyWrapperProps {
  children: ReactNode;
  className?: string;
  justify?: "between" | "start" ;
}

const StepperBodyWrapper: React.FC<StepperBodyWrapperProps> = ({
  children,
  className,
  justify = "between",
}) => {
  return (
    <div
      className={`flex flex-col justify-${justify} px-3 h-[78vh] items-center ${className}`}
    >
      {children}
    </div>
  );
};

export default StepperBodyWrapper;
