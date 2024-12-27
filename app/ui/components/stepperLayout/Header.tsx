import { Button, Progress } from "@nextui-org/react";
import { IoIosArrowBack } from "react-icons/io";

interface HeaderProps {
  onBack: () => void;
  onSkip: () => void;
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
  onSkip,
}: HeaderProps) {
  if (stepsNotInSteper.includes(currentStep)) return null;

  return (
    <header className="bg-primaryBgColor absolute top-0 flex justify-between items-center px-3 w-full h-[64px] max-w-md mx-auto">
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
      <div className=" flex justify-center">
        <Progress
          aria-label="Loading..."
          value={Math.floor(
            (currentStep / (totalSteps - stepsNotInSteper.length + 2)) * 100
          )}
          className="w-[130px]"
          style={{
            height: "5px",
            backgroundColor: "#F4EDE3",
            // marginRight: "18px",
          }}
          classNames={{
            indicator: "bg-[#FEB816]",
          }}
        />
      </div>
      <div>
        <Button
          onClick={onSkip}
          variant="light"
          color="primary"
          size="md"
          className="p-0 min-w-0 font-semibold pr-2"
        >
          Skip
        </Button>
      </div>
    </header>
  );
}
