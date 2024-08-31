import { Button } from "@nextui-org/react";

interface FooterProps {
  onContinue?: () => void;
  isDisabled?: boolean;
  isLoading?: boolean;
  text?: string;
}

export default function Footer({
  onContinue,
  isDisabled,
  isLoading,
  text = "Continue",
}: FooterProps) {
  return (
    <footer className="bg-[#FFF5E5] fixed bottom-0 w-full px-3 py-2 flex justify-center">
      <Button
        isLoading={isLoading}
        radius="full"
        size="lg"
        onClick={onContinue}
        fullWidth
        className={`bg-[#021533] text-white ${
          isDisabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isDisabled}
      >
        {text}
      </Button>
    </footer>
  );
}
