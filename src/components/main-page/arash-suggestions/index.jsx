"use client";
import BestSellerSliderItem from "@/components/elements/best-seller-slider-item";
import BestSellerSliderLastItem from "@/components/elements/best-seller-slider-last-item";

import SliderWrapper from "@/components/modules/sliderWrapper";
import { setActiveSearchHeaderItem } from "@/features/filterSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

const ArashSuggestion = ({ data }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const seeAllNewProducts = () => {
    router.push("/search");
  };

  if (!data?.length) return <></>;
  return (
    <SliderWrapper
      data={""}
      sliderTitle="پیشنهاد فروشگاه"
      link="/new-products"
      sliderbg="bg-gray-50"
    >
      {data.length &&
        data?.map((item, i) => (
          <BestSellerSliderItem key={item?._id} data={item} />
        ))}
      {data?.length > 4 ? (
        <BestSellerSliderLastItem
          sliderTitle="پیشنهاد فروشگاه"
          clickHandler={seeAllNewProducts}
        />
      ) : null}
    </SliderWrapper>
  );
};

export default ArashSuggestion;
