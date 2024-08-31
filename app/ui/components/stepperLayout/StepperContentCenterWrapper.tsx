import { ReactNode } from "react";

interface StepperContentCenterWrapperProps {
  children: ReactNode;
  className?: string;
}

const StepperContentCenterWrapper: React.FC<
  StepperContentCenterWrapperProps
> = ({ children, className }) => {
  return (
    <div
      className={`flex h-full flex-col w-full justify-center items-center py-1 ${className}`}
    >
      {children}
    </div>
  );
};

export default StepperContentCenterWrapper;
