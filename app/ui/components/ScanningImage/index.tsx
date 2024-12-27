import React, { FC, ReactNode } from "react";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import "./ScanningImage.css";

interface ScanningImageProps {
  src: string | StaticImport;
  isScanning?: boolean;
  scanResult: ReactNode | null;
}

const ScanningImage: FC<ScanningImageProps> = ({
  src,
  isScanning,
  scanResult,
}) => {
  return (
    <div className="relative w-full">
      <Image
        src={src}
        alt="food scan"
        width={400}
        height={465}
        priority
        className={`transition-all duration-300`}
      />
      {isScanning && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center scanning-overlay" />
      )}
      {!isScanning && scanResult && (
        <div className="absolute inset-0 flex items-center justify-center">
          {scanResult}
        </div>
      )}
    </div>
  );
};

export default ScanningImage;
