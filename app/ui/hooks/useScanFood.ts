"use client";

import { FoodScanResponse } from "@/app/lib/schemas/foodScanSchema";
import { useOnboardingStore } from "@/app/store/onboardingStore";
import axios from "axios";
import { useState, useEffect } from "react";
import imageCompression from "browser-image-compression";

const MAX_ATTEMPTS = 3;

export interface ScanState {
  isLoading: boolean;
  error: string | null;
  result: FoodScanResponse | null;
}

export function useFoodScan() {
  const { onboardingData, setOnboardingData } = useOnboardingStore();
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(
    onboardingData.scannedImageBase64
  );
  const { imageScanAttempts, scannedImageResponse } = onboardingData;
  const [scanState, setScanState] = useState<ScanState>({
    isLoading: false,
    error: null,
    result: scannedImageResponse,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAttempts = localStorage.getItem("foodScanAttempts");
      setOnboardingData({
        imageScanAttempts: storedAttempts ? parseInt(storedAttempts, 10) : 0,
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("foodScanAttempts", imageScanAttempts.toString());
    }
  }, [imageScanAttempts]);

  const handlePhotoScan = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setScanState({
        isLoading: false,
        error: "Please select an image file",
        result: null,
      });
      return;
    }

    try {
      setScanState((prev) => ({ ...prev, isLoading: true, error: null }));
      const options = {
        maxWidthOrHeight: 800,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(file, options);
      const resizedBase64Image = await imageCompression.getDataUrlFromFile(
        compressedFile
      );

      setSelectedPhoto(resizedBase64Image);

      const response = await axios.post("/api/analyze-food", {
        image: resizedBase64Image,
      });

      setScanState({
        isLoading: false,
        error: null,
        result: response.data,
      });

      setOnboardingData({
        imageScanAttempts: imageScanAttempts + 1,
      });

      //   if (!response.isFood && attempts >= MAX_ATTEMPTS - 1) {
      //     showError("Maximum attempts reached. Please proceed to the next step.");
      //   } else if (!response.isFood) {
      //     showError("No food detected in the image. Please try again.");
      //   }
    } catch (error) {
      setScanState((prev) => ({
        ...prev,
        isLoading: false,
        error: "Failed to analyze image",
      }));
    }
  };

  const canAttemptScan = imageScanAttempts < MAX_ATTEMPTS;

  return {
    selectedPhoto,
    scanState,
    handlePhotoScan,
    canAttemptScan,
  };
}
