"use client";
import BestSellerSliderItem from "@/components/elements/best-seller-slider-item";
import BestSellerSliderLastItem from "@/components/elements/best-seller-slider-last-item";

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
    {
      id: "6",
      title:
        " آب 6 مرحله چفتن",
      price: 5000000,
      isLiked: true,
    },
];
const SimiliarProducts = () => {
  if (data.length == 0) return null;
  return (
    <div className="w-full px-4 border rounded-xl">
        <SliderWrapper
          dataLength={data?.length}
          rmInfinite={true}
          sliderTitle="محصولات مشابه"
          link="/best-sellers"
        >
          {data.length &&
            data?.map((item, i) => (
              <BestSellerSliderItem
                hideBreef={true}
                key={item?.id}
                data={item}
              />
            ))}
        </SliderWrapper>
    </div>
  );
};

export default SimiliarProducts;
