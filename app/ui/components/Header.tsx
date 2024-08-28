import { Progress } from "@nextui-org/progress";
import { IoIosArrowBack } from "react-icons/io";

interface HeaderProps {
  onBack: () => void;
  hideHeader?: boolean;
  currentStep: number;
  totalSteps: number;
  hideBackButton?: boolean;
}

export default function Header({
  onBack,
  hideHeader = false,
  currentStep,
  totalSteps,
  hideBackButton,
}: HeaderProps) {
  if (hideHeader) return null;

  return (
    <>
      <header className="bg-transparent flex justify-between items-center px-6 py-4 fixed top-0 w-full z-10">
        {!hideBackButton && <IoIosArrowBack size={30} onClick={onBack} />}
        <Progress
          aria-label="Loading..."
          value={Math.floor((currentStep / totalSteps) * 100)}
          className="max-w-md"
        />
      </header>
    </>
  );
}
