"use client";
import { GiTeePipe } from "react-icons/gi";
import { MdAcUnit } from "react-icons/md";
import { TbAirConditioning } from "react-icons/tb";
import { TbFridge } from "react-icons/tb";

import MainCategoryItem from "./main-category-item";

const MainCategorySection = () => {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-4 p-2 font-[vazirbold]">
      <MainCategoryItem
        title="لوله ها"
        icon={<GiTeePipe />}
        cat={{ name: "لوله", link: "pipes" }}
      />
      <MainCategoryItem
        title="گاز های فریونی"
        icon={<MdAcUnit />}
        cat={{ name: "گاز فریونی", link: "refrigerant-gas" }}
      />
      <MainCategoryItem
        title="تجهیزات کولر"
        icon={<TbAirConditioning />}
        cat={{ name: "تجهیزات کولر", link: "air-conditioner-accessories" }}
      />
      <MainCategoryItem
        title="تجهیزات یخچال"
        icon={<TbFridge />}
        cat={{ name: "تجهیزات یخچال", link: "refrigerator-accessories" }}
      />
    </div>
  );
};

export default MainCategorySection;
