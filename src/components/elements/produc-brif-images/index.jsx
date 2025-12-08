"use client";

import Image from "next/image";
import Slider from "react-slick";

const ProductBrifImages = ({ images , title}) => {
  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    rtl: true,
    accessibility: false, // لازم نیست aria تولید کنه
    beforeChange: () => {
      if (document.activeElement) {
        document.activeElement.blur();
      }
    },
  };
return (
    <div className="w-full h-full  overflow-hidden flex justify-center items-center">
      <div className="w-56 h-64 ">
        {images?.length && images?.length > 1 ? (
          <>
            <Slider {...settings}>
              {images?.map((image, i) => (
                <div key={i} className=" w-56 h-56 relative ">
                  <Image
                    src={image?.file}
                    alt={`${title}- نمای ${i}`}
                    fill
                    sizes="256px"
                    className="object-fill rounded-[16px]"
                  />
                </div>
              ))}
            </Slider>
          </>
        ) : (
          <div className=" w-56 h-56 relative ">
            <Image
              src={images[0]?.file}
              alt={images[0]?.file}
              fill
              sizes="256px"
              className="object-fill rounded-[16px]"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductBrifImages;
