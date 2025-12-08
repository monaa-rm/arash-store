"use client";
import SearchCategoryFilter from "@/components/elements/search-category-filter";
import SearchPriceFilter from "@/components/elements/search-price-filter";
import SearchMainBox from "@/components/search/search-main-box";
import {
  setHeaderSearchValue,
  setHighestPrice,
  setSearchPrice,
} from "@/features/filterSlice";
import { setMenuActiveItem } from "@/features/globalSlice";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const ProductsPage = ({ highestPrice }) => {
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(searchParams.get("page") || 1);
  // const [currentPage, setCurrentPage] = useState(searchParams.get("page") || 1);
  const path = usePathname();
  const router = useRouter();
 useEffect(() => {
  function handleparams() {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", currentPage);
    // router.push(`/products?${params.toString()}`, { scroll: false });
     const currentUrl = `/products?${searchParams.toString()}`;
  const newUrl = `/products?${params.toString()}`;

  if (currentUrl !== newUrl) {
    router.push(newUrl, { scroll: false });
  }
  }

    handleparams();
}, [currentPage]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setMenuActiveItem("/products"));
  }, []);
  useEffect(() => {
    if (highestPrice && highestPrice > 0) {
      dispatch(setHighestPrice(highestPrice));
      dispatch(setSearchPrice([0, highestPrice]));
      dispatch(setHeaderSearchValue(""));
    }
    console.log(highestPrice);
  }, [highestPrice]);

  return (
    <div className="w-full px-2 sm:px-4 lg:px-8 py-4 flex gap-4 relative">
      <aside className="w-1/3 min-w-1/3 h-full hidden lg:flex  sticky top-[132px] flex-col gap-6  ">
        {highestPrice && highestPrice > 0 ? <SearchPriceFilter /> : <></>}
        <SearchCategoryFilter
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </aside>
      <SearchMainBox
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default ProductsPage;
