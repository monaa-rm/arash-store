"use client";
import RandomProductItem from "@/components/elements/random-product-item";
import Image from "next/image";
import Slider from "react-slick";

const data = [
  {
    id: "1",
    title: " برد چیست و چه دارد",
    imageSrc: "/sample/3.jpg",
  },
  {
    id: "2",
    title: " گازی و اسپلیت چیست و چه کاربردی ",
    imageSrc: "/sample/3.jpg",
  },
  {
    id: "3",
    title: " برد کولرو چه کاربردی دارد",
    imageSrc: "/sample/4.jpg",
  },
  {
    id: "4",
    title: "  چیست کاربردی دارد",
    imageSrc: "/sample/5.jpg",
  },
  {
    id: "5",
    title: " برد کولر گازی و اسپلیت چیست و چه کاربردی دارد",
    imageSrc: "/sample/6.jpg",
  },
  {
    id: "6",
    title: " چه کاربردی دارد",
    imageSrc: "/sample/8.jpg",
  },
  {
    id: "7",
    title: "گازی و اسپلیتد",
    imageSrc: "/sample/7.jpg",
  },
  {
    id: "8",
    title: "خازن",
    imageSrc: "/sample/9.jpg",
  },
  {
    id: "9",
    title: " برد کولرد",
    imageSrc: "/sample/5.jpg",
  },
];
const RandomProducts = () => {
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
              key={item.id}
              imageSrc={item.imageSrc}
              title={item.title}
            />
          ))}
      </Slider>
    </div>
  );
};

export default RandomProducts;
