"use client";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";

const WelcomeSlider = ({ welcomeImages }) => {
  var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed:10000 ,
    speed: 1000,
    pauseOnHover: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="w-full h-[150px] sm:h-[400px] ">
      <Slider {...settings}>
        {welcomeImages.map((img, i) => (
          <div key={i} className="w-full h-[150px] sm:h-[400px] relative">
            <Image alt={img} fill className="object-cover" src={img} />
          </div>
        ))}
      </Slider>
    </div>
  );
};
export default WelcomeSlider;
