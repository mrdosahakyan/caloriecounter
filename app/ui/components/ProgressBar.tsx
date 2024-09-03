import React, { useEffect, useState } from "react";
import { Progress } from "@nextui-org/react";
import { IoIosCheckmarkCircle } from "react-icons/io";

interface ProgressBarProps {
  label: string;
  timeInSeconds: number;
  completed: boolean;
  setCompleted: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  label,
  timeInSeconds,
  completed,
  setCompleted,
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const intervalDuration = 20; // Update every 20ms for smoother progress
    const increment = 100 / (timeInSeconds * (1000 / intervalDuration));

    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(interval);
          setCompleted(true);
          return 100;
        }
        return Math.min(oldProgress + increment, 100);
      });
    }, intervalDuration);

    return () => clearInterval(interval);
  }, [timeInSeconds, setCompleted]);

  return (
    <div className="flex flex-col w-full align-center">
      <div className="flex w-full justify-between">
        <div
          className={`text-[16px] font-semibold mb-2 ${
            // completed ? "text-primaryTextColor" : "text-[#434F62] opacity-50"
            "text-primaryTextColor"
          }`}
        >
          {label}
        </div>
        <div>
          {completed && <IoIosCheckmarkCircle size={18} color="green" />}
        </div>
      </div>
      <div>
        <Progress
          value={progress}
          style={{
            height: "10px",
            backgroundColor: "#FFF5E5",
          }}
          classNames={{
            // indicator: completed ? "bg-[#FFAF02]" : "bg-[#FFE9B0]",
            indicator: "bg-[#FFAF02]",
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
