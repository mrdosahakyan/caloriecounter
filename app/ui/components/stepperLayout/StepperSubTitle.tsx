import React, { ReactNode } from 'react';

interface StepperSubtitleProps {
  children: ReactNode;
  className?: string;
}

const StepperSubtitle: React.FC<StepperSubtitleProps> = ({ children, className }) => {
  return (
    <h2 className={`font-inter text-[15px] font-normal text-center text-[#434F62] ${className}`}>
      {children}
    </h2>
  );
};

export default StepperSubtitle;
