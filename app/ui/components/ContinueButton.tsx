"use client";
import React from "react";
import { Button } from "@nextui-org/react";

type ContinueButtonProps = {
  isDisabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
  text?: string;
};

const ContinueButton: React.FC<ContinueButtonProps> = ({
  isDisabled,
  onClick,
  text = "Continue",
  isLoading,
}) => {
  return (
    <Button
      isDisabled={isDisabled}
      fullWidth
      isLoading={isLoading}
      radius="full"
      size="lg"
      onClick={onClick}
      className={`bg-buttonPrimaryBgColor text-white ${
        isDisabled ? "opacity-50 cursor-not-allowed" : ""
      } mt-2 mb-4 font-inter h-[60px]`}
    >
      {text}
    </Button>
  );
};

export default ContinueButton;
