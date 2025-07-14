"use client";
import BestSellerSliderItem from "@/components/elements/best-seller-slider-item";
import BestSellerSliderLastItem from "@/components/elements/best-seller-slider-last-item";

import SliderWrapper from "@/components/modules/sliderWrapper";

const SimiliarProducts = ({ similiarProducts }) => {


  if (similiarProducts.length == 0) return null;
  return (
    <div className="w-full px-4 border rounded-xl">
      <SliderWrapper
        dataLength={similiarProducts?.length}
        rmInfinite={true}
        sliderTitle="محصولات مشابه"
        link="/best-sellers"
      >
        {similiarProducts.length &&
          similiarProducts?.map((item, i) => (
            <BestSellerSliderItem hideBreef={true} key={item?._id} data={item} />
          ))}
      </SliderWrapper>
    </div>
  );
};

export default SimiliarProducts;
