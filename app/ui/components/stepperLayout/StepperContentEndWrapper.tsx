import { ReactNode } from "react";

interface StepperContentEndWrapperProps {
  children: ReactNode;
  className?: string;
}

const StepperContentEndWrapper: React.FC<StepperContentEndWrapperProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={`mb-2 h-full flex flex-col justify-end ${className}`}
    >
      {children}
    </div>
  );
};

export default StepperContentEndWrapper;
