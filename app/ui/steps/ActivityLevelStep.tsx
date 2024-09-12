"use client";

import { FC, useState } from "react";
import { useOnboardingStore } from "@/app/store/onboardingStore";
import { TStepMainTypes } from "./StepTypes";
import Footer from "../components/stepperLayout/Footer";
import SelectableCards, { TCardItem } from "../components/SelectableCard";
import Level1 from "../../../public/icons/level1.png";
import Level2 from "../../../public/icons/level2.png";
import Level3 from "../../../public/icons/level3.png";
import Level4 from "../../../public/icons/level4.png";
import StepperTitle from "../components/stepperLayout/StepperTitle";
import Image from "next/image";
import StepperBodyWrapper from "../components/stepperLayout/StepperBodyWrapper";
import Beginner from "../../../public/icons/beginner.png";
import Intermedite from "../../../public/icons/intermediate.png";
import Master from "../../../public/icons/master.png";
import useDidMount from "../hooks/useDidMount";
import mixpanel from "mixpanel-browser";
import { EMixpanelEvents } from "../integrations/mixpanelEvents";

const activityLevelOptions: TCardItem[] = [
  {
    id: "sedentary",
    title: "Sedentary",
    description: "I spend most of my day sitting",
    icon: <Image src={Level1} alt="Level1" width={28} priority />,
  },
  {
    id: "lightlyActive",
    title: "Lightly active",
    description: "I have made doing exercises a lasting habit",
    icon: <Image src={Level2} alt="Level2" width={28} priority/>,
  },
  {
    id: " moderatelyActive",
    title: "Moderately active",
    description: "I work on my feet and move around throughout the day",
    icon: <Image src={Level3} alt="Level3" width={28} priority/>,
  },
  {
    id: "veryActive",
    title: "Very active",
    description: "I spend most of my day doing physical activities",
    icon: <Image src={Level4} alt="Level4" width={28} priority/>,
  },
];

const ActivityLevelStep: FC<TStepMainTypes> = ({ onConitnue }) => {
  const { setOnboardingData, onboardingData } = useOnboardingStore();
  const [selectedActivityLevel, setSelectedActivityLevel] = useState<
    string | null
  >(onboardingData.activityLevel || null);

  const handleChooseAktivityLevel = () => {
    if (!selectedActivityLevel) return;
    setOnboardingData({ activityLevel: selectedActivityLevel });
    onConitnue();
  };

  useDidMount(() => {
    mixpanel.track(EMixpanelEvents.PAGE_6_OPENED);
  });

  return (
    <>
      <div className="hidden">
        <Image width={36} src={Beginner} alt="Level1" priority />
        <Image width={36} src={Intermedite} alt="Level2" priority />
        <Image width={36} src={Master} alt="Level3" priority />
      </div>
      <StepperBodyWrapper>
        <div>
          <StepperTitle>What is your activity level?</StepperTitle>
        </div>
        <SelectableCards
          defaultValue={onboardingData.activityLevel}
          items={activityLevelOptions}
          onSelect={(id) => {
            setSelectedActivityLevel(id);
          }}
        />
      </StepperBodyWrapper>

      <Footer
        isDisabled={!selectedActivityLevel}
        onContinue={handleChooseAktivityLevel}
      />
    </>
  );
};

export default ActivityLevelStep;
