import { Progress } from "@nextui-org/react";
import { IoIosArrowBack } from "react-icons/io";

interface HeaderProps {
  onBack: () => void;
  stepsNotInSteper: number[];
  currentStep: number;
  totalSteps: number;
  hideBackButton?: boolean;
}

export default function Header({
  onBack,
  stepsNotInSteper = [],
  currentStep,
  totalSteps,
  hideBackButton,
}: HeaderProps) {
  if (stepsNotInSteper.includes(currentStep)) return null;

  return (
    <header className="bg-primaryBgColor absolute top-0 flex justify-start items-center px-3 w-full h-[64px] max-w-md mx-auto">
      <div
        className={`flex items-center ${
          hideBackButton ? "visibility-hidden" : ""
        }`}
      >
        <IoIosArrowBack
          size={30}
          className="text-primaryTextColor"
          style={{ visibility: hideBackButton ? "hidden" : "visible" }}
          onClick={onBack}
        />
      </div>
      <div className="flex-1 flex justify-center">
        <Progress
          aria-label="Loading..."
          value={Math.floor(
            (currentStep / (totalSteps - stepsNotInSteper.length + 2)) * 100
          )}
          className="w-[130px]"
          style={{
            height: "5px",
            backgroundColor: "#F4EDE3",
            marginRight: "18px",
          }}
          classNames={{
            indicator: "bg-[#FEB816]",
          }}
        />
      </div>
    </header>
  );
}
