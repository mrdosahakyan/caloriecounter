import { Button, Progress } from "@nextui-org/react";

interface HeaderProps {
  onBack: () => void;
  hideHeader?: boolean;
  currentStep: number;
  totalSteps: number;
}

export default function Header({
  onBack,
  hideHeader = false,
  currentStep,
  totalSteps,
}: HeaderProps) {
  if (hideHeader) return null;

  return (
    <div>
      <Button isIconOnly variant="faded" onClick={onBack}>
        ArrowLeft
      </Button>
      <Progress
        value={(currentStep / totalSteps) * 100}
        className="w-1/2"
        color="primary"
      />
    </div>
  );
}
