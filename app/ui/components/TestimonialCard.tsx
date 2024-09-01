import React from 'react';

interface TestimonialCardProps {
  stars: number;
  text: string;
  author: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ stars, text, author }) => {
  return (
    <div
      className="bg-[#FFFEFF] rounded-[20px] py-[20px] px-[40px] shadow-md text-center max-w-sm mx-auto h-[150px] mx-4"
      style={{ boxShadow: "0px 4px 40px 0px #EBEBEB0D" }}
    >
      <div className="flex justify-center mb-2">
        {[...Array(stars)].map((_, i) => (
          <span key={i} className="text-yellow-500 text-[18px]">★</span>
        ))}
      </div>
      <p className="text-[16px] font-semibold text-primaryTextColor mb-4">{text}</p>
      <p className="text-[15px] font-medium text-[#434F62]">{author}</p>
    </div>
  );
};

export default TestimonialCard;
