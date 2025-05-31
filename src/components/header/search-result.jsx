"use client";

import { useEffect } from "react";
import { GrFormNextLink } from "react-icons/gr";
import { IoMdCloseCircle } from "react-icons/io";

const SearchResult = ({ searchText, setSearchText, SetShowSearchResult }) => {
  useEffect(() => {
    const handleClick = (event) => {
      if (!event.target.closest("#searchResult")) {
        SetShowSearchResult(false);
        setSearchText("");
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
      className={`w-full lg:h-[500px] bg-white rounded-md border border-zinc-300 fixed lg:absolute top-0 left-0 right-0 bottom-0 lg:top-[120%] z-10`}
    >
      <div className="w-full lg:hidden flex justify-between gap-3 items-center border-b border-zinc-300 p-2">
        <GrFormNextLink
          className="w-8 min-w-9 h-8 cursor-pointer"
          onClick={() => {
            setSearchText("");
            SetShowSearchResult(false);
          }}
        />
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="outline-none w-full"
        />
        {searchText && (
          <div className="">
            <IoMdCloseCircle
              className="text-zinc-700 hover:text-zinc-800 transition-all duration-300 text-xl cursor-pointer w-8 h-8 "
              onClick={() => setSearchText("")}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResult;
