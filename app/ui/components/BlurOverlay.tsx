import React, { FC } from "react";

type TBlurOverlayProps = {
  children: React.ReactNode;
};

const BlurOverlay: FC<TBlurOverlayProps> = ({ children }) => {
  return (
    <div
      style={{
        position: "relative",
      }}
    >
      {/* <img
      src={imageSrc}
      alt="Blurred"
      style={{
        height: '100%',
        width: '100%',
        objectFit: 'cover',
      }}
    /> */}
      {children}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "linear-gradient(180deg, rgba(255, 245, 229, 0) 56%, #FFF5E5 94%)",
        }}
      />
    </div>
  );
};

export default BlurOverlay;
