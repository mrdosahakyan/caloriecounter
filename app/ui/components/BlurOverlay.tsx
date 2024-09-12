import React, { FC } from "react";

type TBlurOverlayProps = {
  children: React.ReactNode;
  height?: number;
  width?: number;
};

const BlurOverlay: FC<TBlurOverlayProps> = ({ children, height, width }) => {
  return (
    <div
      style={{
        position: "relative",
        height: height || "108%",
        width: width || "100%",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: "-3px",
          background:
            "linear-gradient(180deg, rgba(255, 245, 229, 0) 81%, #FFF5E5 91%)",
        }}
      />
    </div>
  );
};

export default BlurOverlay;
