"use client";
import SearchMainBoxHeader from "@/components/elements/search-mainBox-header";
import SearchBoxItems from "../search-box-items";
import { useState } from "react";
import { usePathname } from "next/navigation";
import ProductBoxItems from "@/components/products/product-box-items";

const SearchMainBox = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const path = usePathname();
  return (
    <div className="w-full pb-8   lg:rounded-[8px] lg:border">
      <SearchMainBoxHeader setCurrentPage={setCurrentPage} />
      {path == "/products" ? (
        <ProductBoxItems
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      ) : (
        <SearchBoxItems
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default SearchMainBox;
