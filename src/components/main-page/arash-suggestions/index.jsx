"use client";
import BestSellerSliderItem from "@/components/elements/best-seller-slider-item";
import BestSellerSliderLastItem from "@/components/elements/best-seller-slider-last-item";

import SliderWrapper from "@/components/modules/sliderWrapper";
import SliderSkeleton from "@/components/skeleton/slider-skeleton";
import { setActiveSearchHeaderItem } from "@/features/filterSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const ArashSuggestion = ({ data }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();
  const seeAllNewProducts = () => {
    dispatch(setActiveSearchHeaderItem("suggested"));
    router.push("/search");
  };
  useEffect(() => {
    setLoading(false);
  }, []);
  if (!data?.length) return <></>;
  if (loading) return <SliderSkeleton sliderTitle="پیشنهاد فروشگاه" />;

  return (
    <SliderWrapper
      data={""}
      sliderTitle="پیشنهاد فروشگاه"
      link="/new-products"
      sliderbg="bg-gray-50"
      rmInfinite={data?.length > 4 ? true : false}
    >
      {data?.length > 4 ? (
        <BestSellerSliderLastItem
          sliderTitle="پیشنهاد فروشگاه"
          clickHandler={seeAllNewProducts}
        />
      ) : null}
      {data.length &&
        data?.map((item, i) => (
          <BestSellerSliderItem key={item?._id} data={item} loading={loading} />
        ))}
    </SliderWrapper>
  );
};

export default ArashSuggestion;
