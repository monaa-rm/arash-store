"use client";
import { useEffect, useState } from "react";
import { TbSortDescending2 } from "react-icons/tb";
import { RiFilterOffLine } from "react-icons/ri";
import SearchCategoryFilter from "../search-category-filter";
import SearchPriceFilter from "../search-price-filter";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveSearchHeaderItem,
  setReloadFilter,
  setShowCategory,
} from "@/features/filterSlice";

const searchHeaderItems = [
  {
    title: "پیشفرض",
    link: "default",
  },
  {
    title: "محبوبیت",
    link: "popular",
  },
  {
    title: "پربازدید ترین",
    link: "visit",
  },
  {
    title: "جدیدترین",
    link: "new",
  },
  {
    title: "ارزان ترین",
    link: "cheap",
  },
  {
    title: "گران ترین",
    link: "expensive",
  },
];

const SearchMainBoxHeader = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const activeSearchHeaderItem = useSelector(
    (store) => store.filterSlice.activeSearchHeaderItem
  );
  const showCategory = useSelector((store) => store.filterSlice.showCategory);
  const totalProducts = useSelector((store) => store.filterSlice.totalProducts);
  const numberCategories = useSelector(
    (store) => store.filterSlice.numberCategories
  );

  const dispatch = useDispatch();
  useEffect(() => {
    const handleClick = (event) => {
      if (!event.target.closest("#filterSearch")) {
        if (showCategory && window.innerWidth < 1024) {
          dispatch(setShowCategory(false));
        } else {
          setShowFilter(false);
        }
      }
    };

    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  });
  useEffect(() => {
    const handleClick = (event) => {
      if (!event.target.closest("#sortSearch")) {
        setShowSort(false);
      }
    };

    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <>
      <div className="w-full border-b text-sm text-zinc-600 hidden lg:flex justify-between items-center p-4 ">
        <div className=" justify-start items-center flex gap-1 lg:gap-2">
          <div className="flex justify-start items-center gap-1">
            <TbSortDescending2 className="w-6 h-6 text-zinc-500" />
            مرتب سازی:
          </div>
          {searchHeaderItems?.map((item) => (
            <div
              onClick={() => {
                dispatch(setActiveSearchHeaderItem(item.link));
                dispatch(setReloadFilter());
                setShowSort(false);
              }}
              key={item.link}
              className={`px-2 py-1 rounded-lg ${
                activeSearchHeaderItem == item.link
                  ? "bg-blue-800 text-white"
                  : "bg-none hover:text-black"
              } transition-all duration-500 ease-in-out cursor-pointer  `}
            >
              {item.title}
            </div>
          ))}
        </div>
        <div>
          نمایش {numberCategories} از {totalProducts} کالا
        </div>
      </div>
      <div className=" border rounded-lg text-sm lg:hidden overflow-hidden">
        <div className="flex justify-between items-center  py-2 px-4 border-b bg-gradient-to-l from-slate-100 to-slate-50">
          <span className="font-bold">فروشگاه</span>
          <span className="text-zinc-500 text-xs">
            نمایش {numberCategories} از {totalProducts} کالا
          </span>
        </div>
        <div className="flex justify-around items-center  py-2 px-4">
          <div
            onClick={() => setShowFilter(true)}
            className="flex justify-center items-center gap-2 cursor-pointer "
          >
            <RiFilterOffLine className="w-6 h-6 text-zinc-500" />
            <span className="text-zinc-500"> فیلتر کردن</span>
          </div>
          <div
            onClick={() => setShowSort(true)}
            className="flex justify-center items-center gap-2 cursor-pointer "
          >
            <TbSortDescending2 className="w-6 h-6 text-zinc-500" />
            <span className="text-zinc-500">مرتب سازی</span>
          </div>
        </div>
      </div>
      <div
        className={`fixed lg:hidden flex justify-center items-center top-0 right-0 left-0 bottom-0 bg-black bg-opacity-50 z-20 ${
          showFilter ? "opacity-100" : "opacity-0 pointer-events-none"
        } transition-opacity duration-300`}
      >
        <div
          className="  rounded-xl flex flex-col gap-4  w-72 "
          id="filterSearch"
        >
          <SearchPriceFilter />
          <SearchCategoryFilter />
        </div>
      </div>
      <div
        className={`fixed lg:hidden flex justify-center items-center top-0 right-0 left-0 bottom-0 bg-black bg-opacity-50 z-20 ${
          showSort ? "opacity-100" : "opacity-0 pointer-events-none"
        } transition-opacity duration-300`}
      >
        <div
          className="bg-white  rounded-xl  w-72 flex flex-col space-y-4 p-5"
          id="sortSearch"
        >
          {searchHeaderItems?.map((item) => (
            <label
              dir="rtl"
              key={item.link}
              className="relative flex items-center cursor-pointer"
            >
              <input
                checked=""
                onChange={() => {
                  dispatch(setActiveSearchHeaderItem(item.link));
                  dispatch(setReloadFilter());
                  setShowSort(false);
                }}
                className="sr-only peer"
                name="futuristic-radio"
                type="radio"
              />
              <div
                className={`w-6 h-6  border-2 border-blue-500 rounded-full
               ${
                 activeSearchHeaderItem == item.link
                   ? " bg-blue-800 border-blue-700  shadow-lg shadow-blue-800/50 "
                   : "bg-transparent"
               }
                transition duration-300 ease-in-out peer-hover:shadow-lg peer-hover:shadow-blue-800/50 `}
              ></div>
              <span className="mr-2">{item.title}</span>
            </label>
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchMainBoxHeader;
