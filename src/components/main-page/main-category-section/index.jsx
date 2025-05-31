import React from "react";
import { GiTeePipe } from "react-icons/gi";
import { MdAcUnit } from "react-icons/md";
import { TbAirConditioning } from "react-icons/tb";
import { TbFridge } from "react-icons/tb";

import MainCategoryItem from "./main-category-item";

const MainCategorySection = () => {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-4 p-2 font-[vazirbold]">
      <MainCategoryItem title="لوله ها" icon={<GiTeePipe />} />
      <MainCategoryItem title="گاز های فریونی" icon={<MdAcUnit />} />
      <MainCategoryItem title="تجهیزات کولر" icon={<TbAirConditioning />} />
      <MainCategoryItem title="تجهیزات یخچال" icon={<TbFridge />} />
    </div>
  );
};

export default MainCategorySection;
