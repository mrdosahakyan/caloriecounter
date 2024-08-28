import { ReactNode } from "react";

interface StepperBodyWrapperProps {
    children: ReactNode;
    className?: string;
  }

  
const StepperBodyWrapper: React.FC<StepperBodyWrapperProps> = ({ children, className }) => {
  return (
    <div className="flex flex-col justify-between px-3 h-[78vh] ">
      {children}
    </div>
  );
};

export default StepperBodyWrapper;
