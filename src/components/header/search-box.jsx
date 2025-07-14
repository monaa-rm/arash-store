"use client";
import { FiSearch } from "react-icons/fi";
import { RiSearch2Line } from "react-icons/ri";
import { IoMdCloseCircle } from "react-icons/io";
import { useState } from "react";
import SearchResult from "./search-result";
import { useDispatch, useSelector } from "react-redux";
import {
  setHeaderSearchedItems,
  setHeaderSearchValue,
} from "@/features/filterSlice";
import { usePathname } from "next/navigation";

const SearchBox = () => {
  const [showSearchResult, SetShowSearchResult] = useState(false);
  const [loading, setLoading] = useState([]);
  const [message, setMessage] = useState([]);
  const path = usePathname();
  const headerSearchValue =
    useSelector((store) => store.filterSlice.headerSearchValue) || "";
  const dispatch = useDispatch();

  const searchHandler = async (e) => {
    dispatch(setHeaderSearchValue(e.target.value));
    if (e?.target?.value?.length > 2) {
      setLoading(true);
      dispatch(setHeaderSearchedItems([]));
      if (!path.startsWith("/search")) {
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
        <div className="h-full w-10 min-w-10 pl-2 flex justify-center items-center cursor-pointer relative">
          <RiSearch2Line className="text-zinc-800 text-xl group-focus-within:text-blue-700 transition-all duration-300" />
        </div>
        <input
          type="search"
          value={headerSearchValue}
          placeholder="جستجو..."
          onChange={(e) => searchHandler(e)}
          className="outline-none border-none h-full  w-full searchbox placeholder:text-sm placeholder:text-gray-300"
        />
        {headerSearchValue && (
          <div className="absolut">
            <IoMdCloseCircle
              className="text-zinc-600 text-xl cursor-pointer "
              onClick={() => dispatch(setHeaderSearchValue(""))}
            />
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
