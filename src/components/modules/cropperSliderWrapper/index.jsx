"use client";
import React, { useRef } from "react";
import Slider from "react-slick";
import { MdZoomOutMap } from "react-icons/md";
import BestSellerSliderItem from "@/components/elements/best-seller-slider-item";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import Link from "next/link";
import { CgArrowLeft } from "react-icons/cg";

const CropperSliderWrapper = ({
  children,
  data,
  sliderTitle,
  link,
  sliderbg,
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
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 0,
    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />,
    // rtl: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section
      className={`px-4 py-8 w-full  bg-[url("/images/cropperbg.jpg")]  flex flex-col gap-4 relative`}
    >
      <div className="absolute left-0 right-0 top-0 bottom-0 bg-gray-900 bg-opacity-40"></div>
      <div className="z-[1] w-full flex flex-col md:flex-row md:items-center md:justify-center gap-4">
        <div className="w-full md:w-1/3 flex flex-col justify-center items-center gap-4 p-8">
          <h1 className="font-bold text-2xl text-white">
            لوله مسی بابک مس ایرانیان
          </h1>
          <span className="text-white text-center">
            شما میتوانید لوله های مسی با کیفیت و قیمت مناسب را از فروشگاه ما
            تهیه کنید!
          </span>
          <button
            className="h-fit w-fit px-[1em] py-[0.25em] border-[1px] rounded-full flex 
        justify-center items-center gap-[0.5em] overflow-hidden group hover:translate-y-[0.125em]
         duration-200 backdrop-blur-[12px]"
          >
            <Link href={"/product/id"} className="text-white">مشاهده محصولات</Link>
          </button>
        </div>

        <div className=" w-full md:w-2/3  h-68 px-8 relative">
          <div
            className="absolute  h-16 rounded-full top-1/2 -translate-y-1/2 left-0 right-0
        flex justify-between items-center px-2 "
          >
            <button className="button outline-0  z-[1]" onClick={next}>
              <IoIosArrowDroprightCircle className="w-10 h-10 text-gray-300 opacity-50 hover:opacity-100 transition-all duration-300" />
            </button>
            <button className="button outline-0 z-[1]" onClick={previous}>
              <IoIosArrowDropleftCircle className="w-10 h-10 text-gray-300 opacity-50 hover:opacity-100 transition-all duration-300" />
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
            {/* <div className=" absolute top-1/2 -translate-y-1/2 left-0 right-0"></div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CropperSliderWrapper;
