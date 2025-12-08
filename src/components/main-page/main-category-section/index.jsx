"use client";

import MainCategoryItem from "./main-category-item";

const MainCategorySection = () => {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-4 p-2 font-[vazirbold]">
      <MainCategoryItem
        title="لوله ها"
        icon="pipes_icon"
        cat={{ name: "لوله", link: "lule" }}
      />
      <MainCategoryItem
        title="گاز های فریونی"
        icon={"gas_ferioni_icon"}
        cat={{ name: "گاز فریونی", link: "gaz-ferioni" }}
      />

      <MainCategoryItem
        title="تجهیزات کولر"
        icon="cooler_icon"
        cat={{ name: "تجهیزات کولر", link: "tajhizate-kooler" }}
      />
      <MainCategoryItem
        title="تجهیزات یخچال"
        icon="fridge_icon"
        cat={{ name: "تجهیزات یخچال", link: "tajhizate-yakhchal" }}
      />
    </div>
  );
};

export default MainCategorySection;
