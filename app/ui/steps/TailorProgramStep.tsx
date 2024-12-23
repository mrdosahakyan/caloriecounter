"use client";

import { useState } from "react";
import Footer from "../components/stepperLayout/Footer";
import StepperTitle from "../components/stepperLayout/StepperTitle";
import ProgressBar from "../components/ProgressBar";
import TestimonialsCarousel from "../components/carousel/TestimonialsCarousel";
import StepperBodyWrapper from "../components/stepperLayout/StepperBodyWrapper";
import useDidMount from "../hooks/useDidMount";
import mixpanel from "mixpanel-browser";
import { EMixpanelEvents } from "../integrations/mixpanelEvents";

const TailorProgramStep = () => {
  const [completed1, setCompleted1] = useState(false);
  const [completed2, setCompleted2] = useState(false);
  const [completed3, setCompleted3] = useState(false);
  const [completed4, setCompleted4] = useState(false);
  
  useDidMount(() => {
    mixpanel.track(EMixpanelEvents.PAGE_12_OPENED);
  })
  
  return (
    <>
      <StepperBodyWrapper>
        <StepperTitle>Tailoring your program</StepperTitle>
        <div className="flex flex-col justify-around h-full w-full relative ">
          <div className="flex flex-col gap-6 w-full px-4 mt-5">
            <ProgressBar
              label="Analysing profile"
              timeInSeconds={2}
              completed={completed1}
              setCompleted={setCompleted1}
            />
            <ProgressBar
              label="Calculating metabolism"
              timeInSeconds={1}
              completed={completed2}
              setCompleted={setCompleted2}
            />
            <ProgressBar
              label="Generating meal plan"
              timeInSeconds={1}
              completed={completed3}
              setCompleted={setCompleted3}
            />
            <ProgressBar
              label="Checking healthy conditions"
              timeInSeconds={1.5}
              completed={completed4}
              setCompleted={setCompleted4}
            />
          </div>
          <div>
            <TestimonialsCarousel />
          </div>
        </div>
      </StepperBodyWrapper>
      <Footer
        onContinue={() => {
          window.location.href = "/payment";
        }}
        isDisabled={!completed1 || !completed2 || !completed3 || !completed4}
      />
    </>
  );
};

export default TailorProgramStep;
