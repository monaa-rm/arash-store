"use client";
import RandomProductItem from "@/components/elements/random-product-item";
import Slider from "react-slick";

const RandomProducts = ({ data }) => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 4000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 760,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
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
    <div className="w-full px-4">
      <Slider {...settings}>
        {data &&
          data?.map((item) => (
            <RandomProductItem
              key={item?._id}
              imageSrc={item?.imageSrc}
              title={item?.title}
            />
          ))}
      </Slider>
    </div>
  );
};

export default RandomProducts;
