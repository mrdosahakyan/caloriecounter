"use client";

import { FC } from "react";
import { TStepMainTypes } from "./StepTypes";
import Footer from "../components/stepperLayout/Footer";
import StepperBodyWrapper from "../components/stepperLayout/StepperBodyWrapper";
import AiScanImg from "../../../public/ScanAi.png";
import StepperTitle from "../components/stepperLayout/StepperTitle";
import StepperContentCenterWrapper from "../components/stepperLayout/StepperContentCenterWrapper";
import useDidMount from "../hooks/useDidMount";
import { EMixpanelEvents } from "../integrations/mixpanelEvents";
import ScanningImage from "../components/ScanningImage";
import mixpanel from "mixpanel-browser";
import { useFoodScan } from "../hooks/useScanFood";
import FoodScanResult from "../components/FoodScanResult";
import { useOnboardingStore } from "@/app/store/onboardingStore";
import { Button } from "@nextui-org/react";
import { CameraIcon } from "../components/Icons";

const AiScanStep: FC<TStepMainTypes> = ({ onConitnue }) => {
  useDidMount(() => {
    mixpanel.track(EMixpanelEvents.PAGE_8_OPENED);
  });
  const { setOnboardingData } = useOnboardingStore();
  const { handlePhotoScan, selectedPhoto, scanState, canAttemptScan } =
    useFoodScan();
  const { isLoading, result, error } = scanState;

  const handleAttachPhoto = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files?.[0]) {
      handlePhotoScan(event.target.files[0]);
    }
  };

  const onTakePhotoClick = () => {
    document.getElementById("attachPhotoInput")?.click();
  };

  const onContinueNextStep = () => {
    setOnboardingData({
      scannedImageResponse: result,
    });
    if (result && result.isFood) {
      setOnboardingData({
        scannedImageBase64: selectedPhoto,
      });
    } else {
      setOnboardingData({
        scannedImageBase64: null,
      });
    }
    onConitnue();
  };

  const allowContinue = !canAttemptScan || !!(result && result.isFood);

  return (
    <>
      <StepperBodyWrapper>
        <StepperTitle>
          A simple scan gets you everything about your food
        </StepperTitle>
        <StepperContentCenterWrapper>
          <ScanningImage
            scanResult={
              selectedPhoto ? (
                <FoodScanResult
                  result={result}
                  error={error}
                  isReachedMaxAttempts={!canAttemptScan}
                />
              ) : null
            }
            src={selectedPhoto || AiScanImg}
            isScanning={isLoading}
          />
        </StepperContentCenterWrapper>
      </StepperBodyWrapper>
      <input
        type="file"
        id="attachPhotoInput"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleAttachPhoto}
      />
      <Footer
        onContinue={allowContinue ? onContinueNextStep : onTakePhotoClick}
        additionalButton={
          canAttemptScan && allowContinue && (
            <Button
              onClick={onTakePhotoClick}
              variant="light"
              color="warning"
              size="lg"
              className="h-8"
              endContent={<CameraIcon />}
            >
              Take More Photo
            </Button>
          )
        }
        text={allowContinue ? "Continue" : "Take a Photo"}
        endContent={!allowContinue && <CameraIcon />}
      />
    </>
  );
};

export default AiScanStep;
