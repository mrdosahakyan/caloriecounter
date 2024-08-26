import { Progress } from "@nextui-org/progress";
import { IoIosArrowBack } from "react-icons/io";

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
    <>
      <div>
        <IoIosArrowBack size={30} onClick={onBack} />
        <Progress
          aria-label="Loading..."
          value={Math.floor((currentStep / totalSteps) * 100)}
          className="max-w-md"
        />
      </div>
    </>
  );
}
