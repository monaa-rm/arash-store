"use client";

import Image from "next/image";
import Slider from "react-slick";

const ProductBrifImages = ({ images }) => {
  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    // rtl: true,
  };

  return (
    <div className="w-full h-full rounded-md overflow-hidden flex justify-center items-center">
      <div className="w-56 h-64 ll">
        <Slider {...settings}>
          {images.map((image, i) => (
            <div key={i} className=" w-56 h-56 relative ">
              <Image
                src={image}
                alt="image"
                fill
                className="object-fill rounded-lg"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProductBrifImages;
