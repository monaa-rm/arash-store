"use client";
import SearchCategoryFilter from "@/components/elements/search-category-filter";
import SearchPriceFilter from "@/components/elements/search-price-filter";
import SearchMainBox from "../search-main-box";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setHighestPrice, setSearchPrice } from "@/features/filterSlice";
import { useSearchParams } from "next/navigation";

const SearchPage = ({ highestPrice }) => {
    const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(searchParams.get("page") || 1);

  const dispatch = useDispatch();
  useEffect(() => {
    if (highestPrice && highestPrice > 0) {
      dispatch(setHighestPrice(highestPrice));
      dispatch(setSearchPrice([0, highestPrice]));
    }
    console.log(highestPrice);
  }, [highestPrice]);
  return (
    <div className="w-full px-2 sm:px-4 lg:px-8 py-8 flex gap-4 relative">
      <div className="w-1/3 min-w-1/3 h-full hidden lg:flex  sticky top-[100px] flex-col gap-6  ">
        {highestPrice && highestPrice > 0 ? <SearchPriceFilter /> : <></>}
        <SearchCategoryFilter
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
      <SearchMainBox />
    </div>
  );
};

export default SearchPage;
