import { ReactNode } from "react";

interface StepperContentEndWrapperProps {
  children: ReactNode;
  className?: string;
  justify?: "end" | "start" | "center";
}

const StepperContentEndWrapper: React.FC<StepperContentEndWrapperProps> = ({
  children,
  className,
  justify = "end",
}) => {
  return (
    <div
      className={`mb-2 mt-2 h-full flex flex-col ${className}`}
      style={{
        justifyContent: justify,
      }}
    >
      {children}
    </div>
  );
};

export default StepperContentEndWrapper;
