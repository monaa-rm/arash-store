"use client";

import Image from "next/image";
import Slider from "react-slick";

const ProductSingleItemImage = ({ imageSrc,alt }) => {
  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 10000,
    speed: 1000,
    pauseOnHover: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="w-full  md:w-[350px]  md:min-w-[350px] lg:[520px] lg:min-w-[520px] h-full flex justify-center items-center md:justify-start">
<div className="w-[300px] h-[300px]  lg:w-[470px] lg:h-[470px] xl:w-[460px] xl:h-[460px]  rounded-xl overflow-hidden productSlider  ">
<Slider {...settings}>
        {imageSrc?.map((src, i) => (
          <div
            key={i}
            className="relative w-[300px] h-[300px]  lg:w-[470px] lg:h-[470px] xl:w-[460px] xl:h-[460px]
   rounded-xl overflow-hidden "
          >
            <Image
              alt={alt}
              src={src?.file}
              fill
              className="object-cover  rounded-xl"
            />
          </div>
        ))}
      </Slider>
</div>
    </div>
  );
};

export default ProductSingleItemImage;
