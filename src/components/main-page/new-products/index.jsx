"use client";
import BestSellerSliderItem from "@/components/elements/best-seller-slider-item";
import BestSellerSliderLastItem from "@/components/elements/best-seller-slider-last-item";

import SliderWrapper from "@/components/modules/sliderWrapper";
import SliderSkeleton from "@/components/skeleton/slider-skeleton";
import { setActiveSearchHeaderItem } from "@/features/filterSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const NewProducts = ({ newproducts }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();
  const seeAllNewProducts = () => {
    dispatch(setActiveSearchHeaderItem("new"));
    router.push("/search");
  };
  useEffect(() => {
    setLoading(false);
  }, []);
  if (!newproducts.length) return <></>;
  if (loading) return <SliderSkeleton sliderTitle="محصولات جدید" />;

  return (
    <SliderWrapper data={""} sliderTitle="محصولات جدید" link="/new-products">
      {newproducts?.length &&
        newproducts?.map((item, i) => (
          <BestSellerSliderItem key={i} data={item} hideBreef={false} />
        ))}
      {newproducts?.length > 4 ? (
        <BestSellerSliderLastItem
          sliderTitle="محصولات جدید"
          clickHandler={seeAllNewProducts}
        />
      ) : null}
    </SliderWrapper>
  );
};

export default NewProducts;
