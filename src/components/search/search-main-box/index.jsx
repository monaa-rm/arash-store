"use client";
import SearchMainBoxHeader from "@/components/elements/search-mainBox-header";
import SearchBoxItems from "../search-box-items";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ProductBoxItems from "@/components/products/product-box-items";

const SearchMainBox = ({currentPage, setCurrentPage}) => {
  const path = usePathname();

  return (
    <main
      className={`w-full pb-8  ${
        path == "/products" ? "mt-8" : "mt-0"
      }  lg:rounded-[8px] lg:border`}
    >
      <h1
        className={`font-bold text-xl flex ${
          path == "/products" ? "block" : "hidden"
        } items-center gap-2 pb-4 absolute right-8  top-3`}
      >
        <svg className=" w-5 h-5 ">
          <use href="/sprite.svg#products_icon" />
        </svg>
        محصولات
      </h1>
      <section className="w-full">
        <SearchMainBoxHeader setCurrentPage={setCurrentPage} />{" "}
        {path == "/products" ? (
          <ProductBoxItems
            currentPage={+currentPage}
            setCurrentPage={setCurrentPage}
          />
        ) : (
          <SearchBoxItems
            currentPage={+currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </section>
    </main>
  );
};

export default SearchMainBox;
