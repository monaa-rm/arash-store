"use client";

import Image from "next/image";
import Slider from "react-slick";

const ProductBrifImages = ({ images }) => {
  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    // speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    rtl: true,
  };
  console.log("imagesss", images);
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
                    alt={image?.file}
                    fill
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
              className="object-fill rounded-[16px]"
            />
          </div>
        )}

      </div>
    </div>
  );
};

export default ProductBrifImages;
