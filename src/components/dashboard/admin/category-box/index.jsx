"use client";

import { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { IoMdRemoveCircleOutline } from "react-icons/io";

const CategoryBox = ({
  productCat,
  setProductCat,
  errorArray,
  setFinallyText,
}) => {
  const [showCats, setShowCats] = useState(false);
  const [searchedCat, setSearchedCat] = useState("");
  const [searchedList, setsearchedList] = useState([]);
  const [allCats, setAllcats] = useState([]);
  useEffect(() => {
    const handleClick = (event) => {
      if (!event.target?.closest("#catshows")) {
        setSearchedCat("");
        setShowCats(false);
      }
    };

    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, []);
  useEffect(() => {
    async function getCategories() {
      const data = await fetch("/api/category/allCategories").then((res) =>
        res.json()
      );
      return data?.data ? setAllcats(data?.data) : [];
    }
    if (showCats) {
      getCategories();
    }
  }, [showCats]);
  const searchCatHandler = (e) => {
    setSearchedCat(e?.target?.value);
    const catListSearch = allCats?.filter(
      (item) =>
        item?.name?.includes(searchedCat) || item?.link?.includes(searchedCat)
    );
    setsearchedList(catListSearch);
  };
  const productCatListHandler = (cat) => {
    setFinallyText("");
    setProductCat((prevProductCat) => {
      const catIndex = prevProductCat.findIndex((c) => c.name === cat.name);
      if (catIndex > -1) {
        // اگر cat در productCat وجود داشت، حذفش کن
        const newProductCat = [...prevProductCat];
        newProductCat.splice(catIndex, 1);
        return newProductCat;
      } else {
        // اگر cat در productCat وجود نداشت، اضافه کن
        return [...prevProductCat, cat];
      }
    });
  };

  return (
    <div className="w-full relative pt-1">
      <div className="relative  h-10 w-full ">
        <div
          onClick={() => setShowCats(true)}
          className={`border-b w-full text-sm cursor-pointer flex justify-start items-center right-0 peer-focus:text-xs
             py-1  ${
               showCats ? " border-b-2 border-blue-700" : "border-gray-300 "
             }  ${productCat?.length ? "h-8 " : "h-5"}
          transition-all  bg-inherit
           ${
             errorArray?.includes("productCat") && !productCat?.length
               ? "  border-b border-rose-600 focus:border-b-2 focus:border-rose-600 "
               : null
           }`}
        >
          {productCat?.map((cat, i) => (
            <div
              key={i}
              className={` flex justify-start items-center text-sm cursor-pointer`}
            >
              {`${cat?.name} ${i !== productCat?.length - 1 ? " ، " : ""} `}
            </div>
          ))}
        </div>
        <div
          onClick={() => setShowCats(true)}
          className={`absolute cursor-pointer flex gap-1  h-8  font-bold right-0
          transition-all ${showCats ? " text-blue-700 text-xs " : "text-sm"} ${
            productCat?.length ? "text-xs -top-3   " : " text-sm -top-1 "
          }  peer-placeholder-shown:top-1  ${
            errorArray?.includes("productCat") && !productCat?.length
              ? "  text-rose-600 "
              : null
          }
          `}
        >
          انتخاب دسته بندی
          <FaAngleDown
            className={`w-4 h-4 mt-0.5 transition-all duration-300 ${
              showCats ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>
      </div>

      <div
        id="catshows"
        className={` absolute z-[1] top-10 w-full flex flex-col gap-4 border p-2 rounded-lg bg-slate-50 h-52 overflow-y-scroll   ${
          showCats ? "opacity-100" : "opacity-0 pointer-events-none"
        } transition-opacity duration-300 `}
      >
        <div
          className="flex w-full top-0  items-center border-b-2 h-10  focus-within:border-indigo-500
           transition duration-300 px-3 gap-2 bg-white border-gray-500/30 py-2
            "
        >
          <input
            type="search"
            placeholder="جستجوی دسته بندی"
            value={searchedCat}
            onChange={(e) => searchCatHandler(e)}
            className="w-full h-full pl-4 outline-none placeholder-gray-500 text-sm"
          />
        </div>
        {productCat?.length ? (
          <div className="flex flex-wrap gap-4">
            {productCat?.map((cat, i) => (
              <div
                key={i}
                className={`flex justify-center items-center gap-0.5 rounded-full px-1 bg-slate-200 text-sm text-blue-700 cursor-pointer `}
              >
                {cat?.name}
                <IoMdRemoveCircleOutline
                  onClick={() => productCatListHandler(cat)}
                  className="text-rose-600 hover:text-rose-800 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        ) : null}
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-2">
          {searchedCat && searchedList?.length ? (
            searchedList?.map((cat, i) => (
              <div
                onClick={() => productCatListHandler(cat)}
                key={i}
                className={`text-sm ${
                  productCat.find((item) => cat.link == item.link)
                    ? "text-blue-500"
                    : "text-inherit"
                } cursor-pointer hover:text-blue-600 transition-all duration-300`}
              >
                {cat?.name}
              </div>
            ))
          ) : searchedCat && !searchedList?.length ? (
            <div className="pb-4 text-sm text-gray-500">دسته ای یافت نشد</div>
          ) : (
            allCats?.map((cat, i) => (
              <div
                key={i}
                onClick={() => productCatListHandler(cat)}
                className={`text-sm  ${
                  productCat.find((item) => cat.link == item.link)
                    ? "text-blue-500"
                    : "text-inherit"
                } cursor-pointer hover:text-blue-600 transition-all duration-300 `}
              >
                {cat?.name}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryBox;
