import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TestimonialCard from "../TestimonialCard";

const testimonials = [
  {
    text: "I've achieved my goal with this app!",
    author: "Aix077",
    rating: 5,
  },
  {
    text: "The AI tracking is incredibly accurate!",
    author: "FitGuy23",
    rating: 5,
  },
  {
    text: "Obsessed with the delicious recipes!",
    author: "Healdie87",
    rating: 4,
  },
  {
    text: "AI makes calorie counting effortless.",
    author: "WChaser55",
    rating: 5,
  },
  {
    text: "The recipe library keeps me motivated!",
    author: "CookNF12",
    rating: 3,
  },
  {
    text: "Reaching goals is easy with AI tracking.",
    author: "ActLife99",
    rating: 4,
  },
  {
    text: "So many great recipes to choose from!",
    author: "MealPn21",
    rating: 5,
  },
];

const TestimonialsCarousel = () => {
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
    <div className="w-100">
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            author={testimonial.author}
            stars={testimonial.rating}
            text={testimonial.text}
            key={index}
          />
        ))}
      </Slider>
    </div>
  );
};

export default TestimonialsCarousel;
