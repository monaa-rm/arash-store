"use client";
import BestSellerSliderItem from "@/components/elements/best-seller-slider-item";
import BestSellerSliderLastItem from "@/components/elements/best-seller-slider-last-item";

import SliderWrapper from "@/components/modules/sliderWrapper";
import { setActiveSearchHeaderItem } from "@/features/filterSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

const BestSellers = ({ data }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const seeAllMuchSell = () => {
    dispatch(setActiveSearchHeaderItem("new"));
    router.push("/search");
  };
  if (!data?.length) return <></>;
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
