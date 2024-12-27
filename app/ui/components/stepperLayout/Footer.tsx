import ContinueButton from "../ContinueButton";
import { ReactNode } from "react";

interface FooterProps {
  onContinue?: () => void;
  isDisabled?: boolean;
  isLoading?: boolean;
  text?: string;
  endContent?: ReactNode;
  additionalButton?: ReactNode;
}

export default function Footer({
  onContinue,
  isDisabled,
  isLoading,
  text = "Continue",
  endContent,
  additionalButton,
}: FooterProps) {
  return (
    <footer className="bg-primaryBgColor w-full px-3 flex justify-center absolute bottom-0 max-w-md mx-auto">
      <div className="flex flex-col w-full">
        {additionalButton && additionalButton}
        <ContinueButton
          isLoading={isLoading}
          onClick={onContinue}
          isDisabled={isDisabled}
          text={text}
          endContent={endContent}
        />
      </div>
    </footer>
  );
}
