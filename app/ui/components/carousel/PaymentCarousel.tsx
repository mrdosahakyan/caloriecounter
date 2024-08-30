import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BlurOverlay from "../BlurOverlay";
import Image from "next/image";
import FoodChoise from "../../../../public/FoodChoise.svg";
import ScanAi from "../../../../public/ScanAi.svg";
import AiTracker from "../../../../public/AiTracker.svg";
import DailyMacros from "../../../../public/DailyMacros.png";

const PaymentCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    dotsClass: "slick-dots slick-thumb",
  };

  const imageHeight = 300;

  return (
    <div className="w-100">
      <Slider centerPadding="10px" centerMode {...settings}>
        <BlurOverlay height={imageHeight}>
          <Image
            src={FoodChoise}
            alt=""
            style={{
              objectFit: "cover",
            }}
          />
        </BlurOverlay>

        <BlurOverlay height={imageHeight}>
          <Image
            src={ScanAi}
            alt=""
            style={{
              objectFit: "cover",
            }}
          />
        </BlurOverlay>
        <BlurOverlay height={imageHeight}>
          <Image
            src={AiTracker}
            alt=""
            style={{
              objectFit: "cover",
            }}
          />
        </BlurOverlay>
        <BlurOverlay height={imageHeight}>
          <Image
            src={DailyMacros}
            alt=""
          style={{
              objectFit: "cover",
            }}
          />
        </BlurOverlay>
      </Slider>
    </div>
  );
};

export default PaymentCarousel;
