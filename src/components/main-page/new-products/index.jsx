"use client";
import BestSellerSliderItem from "@/components/elements/best-seller-slider-item";
import BestSellerSliderLastItem from "@/components/elements/best-seller-slider-last-item";

import SliderWrapper from "@/components/modules/sliderWrapper";
import { setActiveSearchHeaderItem } from "@/features/filterSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

const NewProducts = ({ newproducts }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const seeAllNewProducts = () => {
    dispatch(
      setActiveSearchHeaderItem("new")
    );
    router.push("/search")
  };

  if (!newproducts.length) return null;
  return (
    <SliderWrapper data={""} sliderTitle="محصولات جدید" link="/new-products">
      <BestSellerSliderLastItem sliderTitle="محصولات جدید" clickHandler={seeAllNewProducts} />
      {newproducts?.length &&
        newproducts?.map((item, i) => (
          <BestSellerSliderItem key={i} data={item} hideBreef={false} />
        ))}
    </SliderWrapper>
  );
};

export default NewProducts;
