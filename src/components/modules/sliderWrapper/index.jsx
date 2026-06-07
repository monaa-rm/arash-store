"use client";
import React, { useRef } from "react";
import Slider from "react-slick";


const SliderWrapper = ({
  children,
  sliderTitle,
  sliderbg,
  rmInfinite,
}) => {
  let sliderRef = useRef(null);
  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };
  var settings = {
    dots: false,
    arrows: false,
    infinite: rmInfinite ? false : true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 4 ,
    rtl: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className={`p-4 w-full  ${sliderbg} flex flex-col gap-4`}>
      <h2 className="font-bold text-2xl">{sliderTitle}</h2>

      <div className=" w-full  h-72 px-8 relative">
        <div
          className="absolute  h-16 rounded-full top-1/2 -translate-y-1/2 left-0 right-0
        flex justify-between items-center "
        >
         <button className="button outline-0 sm:w-10 sm:h-10  z-[1]" onClick={next}>
              <svg className="w-8 h-8 sm:w-10 sm:h-10  text-gray-300 opacity-50 hover:opacity-100 transition-all rotate-180 duration-300">
                <use href="/sprite.svg#slider_arrow_left" />
              </svg>
            </button> 
            <button className="button outline-0 sm:w-10 sm:h-10 z-[1]" onClick={previous}>
              <svg className="w-8 h-8 sm:w-10 sm:h-10  text-gray-300 opacity-50 hover:opacity-100 transition-all duration-300">
                <use href="/sprite.svg#slider_arrow_left" />
              </svg>
            </button>
          
        </div>
        <div className=" w-full h-full">
          <Slider
            ref={(slider) => {
              sliderRef = slider;
            }}
            {...settings}
          >
            {children}
          </Slider>
          <div className=" absolute top-1/2 -translate-y-1/2 left-0 right-0"></div>
        </div>
      </div>
    </section>
  );
};

export default SliderWrapper;
