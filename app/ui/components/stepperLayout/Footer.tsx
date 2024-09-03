import ContinueButton from "../ContinueButton";

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
    <footer className="bg-primaryBgColor w-full px-3 flex justify-center absolute bottom-0">
      <ContinueButton
        isLoading={isLoading}
        onClick={onContinue}
        isDisabled={isDisabled}
        text={text}
      />
    </footer>
  );
}
