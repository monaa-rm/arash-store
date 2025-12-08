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
    autoplaySpeed: 10000,
    speed: 1000,
    pauseOnHover: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="w-full">
      <Slider {...settings}>
        {welcomeImages.map((img, i) => (
          <div key={i} className="w-full  overflow-hidden">
            <Image
              alt={"بنر فروشگاه آرش - تجهیزات کولر و یخچال"}
              width={1920}
              height={600}
              className="object-fill w-full h-auto"
              priority={true}
              quality={100}
              src={img.file}
              sizes="(max-width : 768px) 100vw,(max-width : 1200px) 100vw , 1920px"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};
export default WelcomeSlider;
