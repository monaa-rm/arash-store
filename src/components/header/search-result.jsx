"use client";

import { setHeaderSearchValue } from "@/features/filterSlice";
import { useEffect } from "react";
import { GrFormNextLink } from "react-icons/gr";
import { IoMdCloseCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import GlobalLoading from "../elements/global-loading";
import Link from "next/link";

const SearchResult = ({
  SetShowSearchResult,
  loading,
}) => {
  const headerSearchValue =
    useSelector((store) => store.filterSlice.headerSearchValue) || "";
  const searchItems =
    useSelector((store) => store.filterSlice.headerSearchedItems) || "";
  const dispatch = useDispatch();
  useEffect(() => {
    const handleClick = (event) => {
      if (!event.target.closest("#searchResult")) {
        SetShowSearchResult(false);
        dispatch(setHeaderSearchValue(""));
      }
    };

    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, []);
  return (
    <div
      id="searchResult"
      className={`w-full overflow-y-auto   lg:h-[500px] bg-white rounded-[10px] border border-zinc-300 fixed lg:absolute top-0 left-0 right-0 bottom-0 lg:top-[120%] z-10`}
    >
      <div className="w-full lg:hidden flex justify-between gap-3 items-center border-b border-zinc-300 p-2">
        <GrFormNextLink
          className="w-8 min-w-9 h-8 cursor-pointer"
          onClick={() => {
            dispatch(setHeaderSearchValue(""));
            SetShowSearchResult(false);
          }}
        />
        <input
          type="text"
          value={headerSearchValue}
          onChange={(e) => dispatch(setHeaderSearchValue(e.target.value))}
          className="outline-none w-full"
        />
        {headerSearchValue && (
          <div className="">
            <IoMdCloseCircle
              className="text-zinc-700 hover:text-zinc-800 transition-all duration-300 text-xl cursor-pointer w-8 h-8 "
              onClick={() => dispatch(setHeaderSearchValue(""))}
            />
          </div>
        )}
      </div>
      {loading ? (
        <GlobalLoading />
      ) : searchItems?.length ? (
        <div className="flex flex-col">
          {searchItems?.map((item) => (
            <Link
              onClick={() => {
                SetShowSearchResult(false);
                dispatch(setHeaderSearchValue(""));
              }}
              href={`/products/${item?._id}`}
              className={`px-4 py-2  lg:h-[50px] line-clamp-1 border-b flex  items-center gap-2 text-sm`}
              key={item?._id}
            >
              <span className="line-clamp-1">{item?.title}</span>
              {item?.category?.length ? (
                <div className="flex gap-2">
                  <span>از دسته</span>
                  {item?.category?.map((cat, i) => (
                    <span className="text-blue-500 line-clamp-1" key={cat?._id}>
                      {cat?.name} {i !== item?.category?.length - 1 && "،"}
                    </span>
                  ))}
                </div>
              ) : null}
            </Link>
          ))}
          <Link
            onClick={() => {
              SetShowSearchResult(false);
            }}
            href={`/search`}
            className="text-gray-600 text-sm px-4 py-2 hover:text-black transition-all duration-300 ease-in-out"
          >
            دیدن همه موارد...
          </Link>
        </div>
      ) : (
        <div className="px-4 py-2 flex items-center  lg:h-[50px]">محصولی یافت نشد</div>
      )}
    </div>
  );
};

export default SearchResult;
