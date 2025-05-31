"use client";

import SearchCategoryFilter from "@/components/elements/search-category-filter";
import SearchPriceFilter from "@/components/elements/search-price-filter";
import { useEffect } from "react";
import SearchMainBox from "../search-main-box";

const SearchPage = () => {
  useEffect(() => {}, []);
  return (
    <div className="w-full px-2 sm:px-4 lg:px-8 py-8 flex gap-4 relative">
      <div className="w-1/3 min-w-1/3 h-full hidden lg:flex  sticky top-[100px] flex-col gap-4  ">
        <SearchPriceFilter />
        <SearchCategoryFilter />
      </div>
      <SearchMainBox />
    </div>
  );
};

export default SearchPage;
