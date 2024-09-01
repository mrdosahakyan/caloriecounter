"use client";

import { useState } from "react";
import Header from "./ui/components/stepperLayout/Header";
import WelcomeStep from "./ui/steps/WelcomeStep";
import PrimaryGoalStep from "./ui/steps/PrimaryGoalStep";
import GenderStep from "./ui/steps/GenderStep";
import BirthyearStep from "./ui/steps/BirthyearStep";
import HeightWeightStep from "./ui/steps/HeightWeightStep";
import ActivityLevelStep from "./ui/steps/ActivityLevelStep";
import ExperienceStep from "./ui/steps/ExperienceStep";
import AiScanStep from "./ui/steps/AiScanStep";
import FoodChoiseStep from "./ui/steps/FoodChoiseStep";
import TailorProgramStep from "./ui/steps/TailorProgramStep";
import AiTrackerStep from "./ui/steps/AiTrackerStep";
import DailyMacrosStep from "./ui/steps/DailyMacrosStep";

export default function Home() {
  const [step, setStep] = useState(0);
  const totalSteps = 11;

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleContinue = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const getCurrentStep = () => {
    if (step === 0) return <WelcomeStep onConitnue={handleContinue} />;
    if (step === 1) return <PrimaryGoalStep onConitnue={handleContinue} />;
    if (step === 2) return <GenderStep onConitnue={handleContinue} />;
    if (step === 3) return <BirthyearStep onConitnue={handleContinue} />;
    if (step === 4) return <HeightWeightStep onConitnue={handleContinue} />;
    if (step === 5) return <ActivityLevelStep onConitnue={handleContinue} />;
    if (step === 6) return <ExperienceStep onConitnue={handleContinue} />;
    if (step === 7) return <AiScanStep onConitnue={handleContinue} />;
    if (step === 8) return <AiTrackerStep onConitnue={handleContinue} />;
    if (step === 9) return <FoodChoiseStep onConitnue={handleContinue} />;
    if (step === 10) return <DailyMacrosStep onConitnue={handleContinue} />;
    if (step === 11) return <TailorProgramStep />;
  };

  const stepsNotInSteper = [0, 11];
  const hideHeader = stepsNotInSteper.includes(step);

  return (
    <main className="bg-transparent flex flex-col h-svh">
      <Header
        currentStep={step}
        onBack={handleBack}
        totalSteps={totalSteps}
        stepsNotInSteper={stepsNotInSteper}
        hideBackButton={step === 1}
      />

      <div
        className={` ${
          hideHeader ? "h-svh" : "h-[calc(100svh-64px)]"
        } bg-transparent flex flex-col`}
      >
        <div className="flex flex-col h-full">{getCurrentStep()}</div>
      </div>
    </main>
  );
}
