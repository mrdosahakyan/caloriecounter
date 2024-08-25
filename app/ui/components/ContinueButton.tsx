'use client';

import React from "react";

type ContinueButtonProps = {
  isDisabled: boolean;
  onClick: () => void;
};

const ContinueButton: React.FC<ContinueButtonProps> = ({
  isDisabled,
  onClick,
}) => {
  return (
    <button
      className="w-full py-3 px-6 bg-blue-900 text-white text-center rounded-full hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
      disabled={isDisabled}
      onClick={onClick}
    >
      Continue
    </button>
  );
};

export default ContinueButton;
