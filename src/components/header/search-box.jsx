"use client";
import { useState } from "react";
import SearchResult from "./search-result";
import { useDispatch, useSelector } from "react-redux";
import {
  setHeaderSearchedItems,
  setHeaderSearchValue,
} from "@/features/filterSlice";
import { usePathname, useRouter } from "next/navigation";

const SearchBox = () => {
  const [showSearchResult, SetShowSearchResult] = useState(false);
  const [loading, setLoading] = useState([]);
  const [message, setMessage] = useState([]);
  const path = usePathname();
  const router = useRouter();
  const headerSearchValue =
    useSelector((store) => store.filterSlice.headerSearchValue) || "";
  const dispatch = useDispatch();

  const searchHandler = async (e) => {
    dispatch(setHeaderSearchValue(e.target.value));

    if (e?.target?.value?.length > 2) {
      setLoading(true);
      dispatch(setHeaderSearchedItems([]));
      if (!path?.startsWith("/search")) {
        SetShowSearchResult(true);
        try {
          const res = await fetch(
            `/api/header-search?searchvalue=${headerSearchValue || ""}`
          );
          const data = await res.json();
          console.log(data);
          if (res.ok) {
            dispatch(setHeaderSearchedItems(data?.data));
          } else {
            setMessage("خطایی رخ داد");
          }
        } catch (error) {
          setMessage("خطایی رخ داد");
        } finally {
          setLoading(false);
        }
      }
    }
  };
  return (
    <form className="w-full lg:w-auto lg:relative group">
      <div
        className={`w-full sm:w-[400px] h-10 border border-zinc-300 rounded-[10px] focus-within:border  focus-within:border-blue-500
     transition-all duration-300 ease-in-out px-2 flex items-center justify-start`}
      >
        <div className="h-full w-8 min-w-8 pl-2 flex justify-center items-center cursor-pointer relative">
          <svg className="h-8 w-8 text-zinc-500 text-xl group-focus-within:text-blue-700 transition-all duration-300">
            <use href="/sprite.svg#search_mark" />
          </svg>
        </div>
        <input
          type="search"
          value={headerSearchValue}
          placeholder="جستجو..."
          onChange={(e) => searchHandler(e)}
          className="outline-none border-none h-full  w-full searchbox placeholder:text-sm placeholder:text-gray-300"
        />
        {headerSearchValue && (
          <div
            onClick={() => dispatch(setHeaderSearchValue(""))}
            className="absolut"
          >
            <svg className="w-6 h-6 text-zinc-600 hover:text-zinc-700 transition-all duration-300 text-xl cursor-pointer ">
              <use href="/sprite.svg#close_circle_icon" />
            </svg>
          </div>
        )}
      </div>

      {showSearchResult && (
        <SearchResult
          SetShowSearchResult={SetShowSearchResult}
          loading={loading}
          setLoading={setLoading}
          message={message}
        />
      )}
    </form>
  );
};

export default SearchBox;
