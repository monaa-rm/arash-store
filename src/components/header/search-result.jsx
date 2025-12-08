"use client";

import { setHeaderSearchValue } from "@/features/filterSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GlobalLoading from "../elements/global-loading";
import Link from "next/link";
import { slugify } from "@/utiles/utils-func";
import { useRouter } from "next/navigation";

const SearchResult = ({ SetShowSearchResult, loading }) => {
  const headerSearchValue =
    useSelector((store) => store.filterSlice.headerSearchValue) || "";
  const searchItems =
    useSelector((store) => store.filterSlice.headerSearchedItems) || "";
  const dispatch = useDispatch();
  const router = useRouter();
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
        
        <i
          className="w-8 min-w-8  h-8 cursor-pointer flex items-center"
          onClick={() => {
            dispatch(setHeaderSearchValue(""));

            SetShowSearchResult(false);
          }}
        >
          <svg className="w-8 h-5 text-zinc-600 hover:text-zinc-700 transition-all duration-300 ease-in-out">
            <use href="/sprite.svg#back_icon" />
          </svg>
        </i>
        <input
          type="text"
          value={headerSearchValue}
          onChange={(e) => {
            dispatch(setHeaderSearchValue(e.target.value));
            router.push(
              {
                pathname: "/search",
                query: e.target.value ? { q: e.target.value } : {},
              },
              undefined,
              { shallow: true }
            );
          }}
          className="outline-none w-full"
        />
        {headerSearchValue && (
          <div onClick={() => dispatch(setHeaderSearchValue(""))} className="">
            <svg className=" text-zinc-600 hover:text-zinc-700 transition-all duration-300 text-xl cursor-pointer w-8 h-8 ">
              <use href="/sprite.svg#close_circle_icon" />
            </svg>
        
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
              href={`/products/${item?._id}/${slugify(item?.title)}`}
              className={`px-4 py-2  lg:h-[50px] line-clamp-1 border-b flex hover:bg-gray-100 transition-all duration-300 items-center gap-2 text-sm`}
              key={item?._id}
            >
              <span className="line-clamp-1">{item?.title}</span>
              {item?.category?.length ? (
                <div className="flex gap-1">
                  <span className="text-gray-400 text-xs">- از دسته</span>
                  {item?.category?.map((cat, i) => (
                    <span
                      className="text-blue-500 line-clamp-1 text-xs"
                      key={cat?._id}
                    >
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
            href={{
              pathname: "/search",
              query: { q: headerSearchValue },
            }}
            className="text-gray-600 text-sm px-4 py-2 hover:text-black transition-all duration-300 ease-in-out"
          >
            دیدن همه موارد...
          </Link>
        </div>
      ) : (
        <div className="px-4 py-2 flex items-center  lg:h-[50px]">
          محصولی یافت نشد
        </div>
      )}
    </div>
  );
};

export default SearchResult;
