import { ReactNode } from "react";

interface StepperBodyWrapperProps {
  children: ReactNode;
  className?: string;
  justify?: "between" | "start";
}

const StepperBodyWrapper: React.FC<StepperBodyWrapperProps> = ({
  children,
  className,
  justify = "between",
}) => {
  return (
    <div className={`h-full overflow-y-auto my-2 py-2 mt-[64px]`}>
      <div
        className={`flex flex-col justify-${justify} px-3 h-full items-center ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default StepperBodyWrapper;
