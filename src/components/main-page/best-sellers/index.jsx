"use client";
import BestSellerSliderItem from "@/components/elements/best-seller-slider-item";
import BestSellerSliderLastItem from "@/components/elements/best-seller-slider-last-item";

import SliderWrapper from "@/components/modules/sliderWrapper";
import SliderSkeleton from "@/components/skeleton/slider-skeleton";
import { setActiveSearchHeaderItem } from "@/features/filterSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const BestSellers = ({ data }) => {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const router = useRouter();
  const seeAllMuchSell = () => {
    dispatch(setActiveSearchHeaderItem("new"));
    router.push("/search");
  };
  useEffect(() => {
    setLoading(false);
  }, []);
  if (!data?.length) return <></>;
  if (loading) return <SliderSkeleton sliderTitle="پرفروش ها" />;

  return (
    <SliderWrapper data={""} sliderTitle="پرفروش ها" link="/best-sellers">
      {data.length &&
        data?.map((item, i) => (
          <BestSellerSliderItem key={item?._id} data={item} />
        ))}
      {data?.length > 4 ? (
        <BestSellerSliderLastItem
          sliderTitle={"پرفروش ها"}
          clickHandler={seeAllMuchSell}
        />
      ) : null}
    </SliderWrapper>
  );
};

export default BestSellers;
