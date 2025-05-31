"use client";
import BestSellerSliderItem from "@/components/elements/best-seller-slider-item";
import BestSellerSliderLastItem from "@/components/elements/best-seller-slider-last-item";
import CropperSliderItem from "@/components/elements/cropper-slider-item";
import CropperSliderWrapper from "@/components/modules/cropperSliderWrapper";

import SliderWrapper from "@/components/modules/sliderWrapper";

const data = [
  {
    id: "1",
    title: " آب 6 مرحله ای ن",
    price: 1855455,
    isLiked: false,
  },
  {
    id: "2",
    title: "  دستگاه تصفیه آب 6 مرحله ای چفتن",
    price: 1250000,
    isLiked: true,
  },
  {
    id: "3",
    title: " آب 6 مرحله ای  6 مرحله ای چفتن",
    price: 42585665,
    isLiked: false,
  },
  {
    id: "4",
    title:
      " آب 6 مرحله آب 6 مرحله ای  دستگاه تصفیه آب 6 مرحله ای چفتن آب 6 مرحله ای  دستگاه تصفیه آب 6 مرحله ای  ای چفتن",
    price: 34585665,
    isLiked: true,

  },
  {
    id: "5",
    title:
      " آب 6 مرحله آب 6 مرحله ای  دستگاه تصفیه آب 6 مرحله ای چفتن  چفتن",
    price: 5854587,
    isLiked: false,

  },
];
const CropperSlider = () => {
  return (
    <CropperSliderWrapper data={""} sliderTitle="پرفروش ها" link="/best-sellers">
      {/* {data.length && data?.map((item, i) => (
        <BestSellerSliderItem key={item?.id} data={item} />
      ))}
      <BestSellerSliderLastItem sliderTitle={"پرفروش ها"} /> */}
      <CropperSliderItem />
      <CropperSliderItem />
      <CropperSliderItem />
      <CropperSliderItem />
      <CropperSliderItem />
    </CropperSliderWrapper>
  );
};

export default CropperSlider;
