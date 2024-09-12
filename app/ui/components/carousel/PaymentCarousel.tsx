import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BlurOverlay from "../BlurOverlay";
import Image from "next/image";
import FoodChoise from "../../../../public/FoodChoise.png";
import ScanAi from "../../../../public/ScanAi.png";
import AiTracker from "../../../../public/AiTracker.png";
import DailyMacros from "../../../../public/DailyMacros.png";

export const imageHeight = 250;

const PaymentCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    dotsClass: "slick-dots slick-thumb",
  };

  return (
    <div className="w-100 h-full flex-grow">
      <Slider
        centerPadding="10px"
        adaptiveHeight={false}
        swipeToSlide
        className="payment-carousel"
        {...settings}
      >
        <BlurOverlay>
          <Image
            src={ScanAi}
            alt=""
            style={{
              objectFit: "cover",
              height: "100%",
              width: "unset",
            }}
            height={imageHeight}
            priority
          />
        </BlurOverlay>

        <BlurOverlay>
          <Image
            src={DailyMacros}
            alt=""
            style={{
              objectFit: "cover",
              height: "100%",
              width: "unset",
            }}
            height={imageHeight}
            priority
          />
        </BlurOverlay>

        <BlurOverlay>
          <Image
            src={FoodChoise}
            alt=""
            style={{
              objectFit: "cover",
              height: "100%",
              width: "unset",
            }}
            height={imageHeight}
            priority
          />
        </BlurOverlay>

        <BlurOverlay>
          <Image
            src={AiTracker}
            alt=""
            style={{
              objectFit: "cover",
              height: "100%",
              width: "unset",
            }}
            height={imageHeight}
            priority
          />
        </BlurOverlay>
      </Slider>
    </div>
  );
};

export default PaymentCarousel;
