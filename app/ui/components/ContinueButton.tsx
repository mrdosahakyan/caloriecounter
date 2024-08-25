'use client';

import React from "react";

type ContinueButtonProps = {
  isDisabled: boolean;
  onClick: () => void;
  text?: string;
};

const ContinueButton: React.FC<ContinueButtonProps> = ({
  isDisabled,
  onClick,
  text = 'Continue',
}) => {
  return (
    <button
      className="w-full py-3 px-6 bg-blue-900 text-white text-center rounded-full hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
      disabled={isDisabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default ContinueButton;
