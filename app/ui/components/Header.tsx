import { Progress } from "@nextui-org/react";
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
    <header className="bg-transparent flex justify-start items-center px-3 py-4 fixed top-0 w-full z-10 h-[64px]">
      {!hideBackButton && (
        <IoIosArrowBack size={30} className="text-[#021533]" onClick={onBack} />
      )}
      <div className="flex-1 flex justify-center">
        <Progress
          aria-label="Loading..."
          value={Math.floor((currentStep / totalSteps) * 100)}
          className="w-[130px]"
          style={{
            height: "5px",
            backgroundColor: "#F4EDE3",
          }}
          classNames={{
            indicator: "bg-[#FEB816]",
          }}
        />
      </div>
    </header>
  );
}
