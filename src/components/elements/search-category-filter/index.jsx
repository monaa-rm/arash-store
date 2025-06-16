"use client";
import {
  setReloadFilter,
  setSearchedCategory,
  setShowCategory,
} from "@/features/filterSlice";
import { useEffect, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import SearchPriceFilter from "../search-price-filter";

const SearchCategoryFilter = () => {
  const [categories, setCategories] = useState([]);
  const showCategory = useSelector((store) => store.filterSlice.showCategory);
  const [catboxPosition, setCatboxPosition] = useState("bottom-[70px]"); // Initial position
  const [catSearch, setCatSearch] = useState("");
  const [catActive, setCatActive] = useState("");
  const [searchedCats, setSearchedCats] = useState([]);
  const searchedCategory = useSelector(
    (store) => store.filterSlice.searchedCategory
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        // Adjust 100 to your desired scroll threshold
        setCatboxPosition("top-12");
      } else {
        setCatboxPosition("bottom-[70px]");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClick = (event) => {
      if (!event.target.closest("#catBox")) {
        dispatch(setShowCategory(false));
        setCatSearch("");
      }
    };

    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, []);
  useEffect(() => {
    async function getCats() {
      try {
        const res = await fetch(`/api/category/allCategories`);
        const data = await res.json();
        if (res?.ok) {
          setCategories(data?.data);
          setCatActive(data?.data[0]);
        } else {
          setCategories([]);
        }
      } catch (error) {
        setCategories([]);
      }
    }
    getCats();
  }, []);
  const searchCategoryHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const searchText = e.target.value;
    setCatSearch(searchText);
    if (searchText.length > 2) {
      console.log(searchText);
      const result = categories?.filter((item) =>
        item?.name?.includes(searchText)
      );
      console.log(result);
      setSearchedCats(result);
    }
  };
  return (
    <div className="w-full max-w-80 bg-white rounded-lg border py-4 px-4 relative">
      <div
        className="flex flex-col gap-4 cursor-pointer "
        onClick={() => dispatch(setShowCategory(true))}
      >
        <h1 className="font-bold">دسته های محصولات</h1>
        <div className="px-2 py-3 flex justify-between items-center border rounded-lg">
          <span className="text-gray-500  text-sm">
            {searchedCategory?.name?.length
              ? searchedCategory?.name
              : "  یک دسته بندی انتخاب کنید"}
          </span>
          <FaCaretDown
            className={`w-4 h-4 ${
              showCategory ? "rotate-180" : "rotate-0"
            } transition-all duration-300 `}
          />
        </div>
      </div>
      <div
        id="catBox"
        className={`w-[90%] h-64 pt-1   absolute ${catboxPosition} ${
          showCategory ? "block" : "hidden"
        } bg-white rounded-lg border transition-all duration-300`}
      >
        <div  className=" w-full px-1 top-1 ">
          <input
            type="text"
            // onClick={() => dispatch(setShowCategory(true))}
            className="w-full  h-8 border bg-white absolute top-1  border-zinc-400 p-2 outline-none z-[1] "
            value={catSearch}
            onChange={(e) => searchCategoryHandler(e)}
          />
        </div>
        <div className="left-0 right-0 h-[228px]  absolute px-1 overflow-hidden top-[26px] ">
          {catSearch.length ? (
            <div className="">
              {searchedCats.length ? (
                <div
                  className={` w-full h-[241px] overflow-y-scroll catbox flex pb-4 flex-col gap-1 pt-4`}
                >
                  <div
                    onClick={() => {
                      dispatch(setSearchedCategory({}));
                      dispatch(setShowCategory(false));
                      dispatch(setReloadFilter());
                    }}
                    className={`line-clamp-1 cursor-pointer hover:bg-gray-100 transition-all duration-300 w-full h-[40px] min-h-[40px] px-4 
                flex justify-start items-center`}
                  >
                    هیچکدام
                  </div>
                  {searchedCats.map((cat) => (
                    <div
                      onClick={() => {
                        setCatActive(cat);
                        dispatch(setSearchedCategory(cat));
                        dispatch(setShowCategory(false));
                        dispatch(setReloadFilter());
                      }}
                      key={cat._id}
                      className={`line-clamp-1 cursor-pointer hover:bg-gray-100 transition-all duration-300 w-full h-[40px] min-h-[40px] px-4 ${
                        cat.link == catActive?.link ? "bg-gray-100" : "bg-none"
                      } flex justify-start items-center`}
                    >
                      {cat?.name}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm px-2 pt-4 text-zinc-500">
                  نتیجه ای یافت نشد
                </div>
              )}
            </div>
          ) : (
            <div
              className={` w-full h-[241px] overflow-y-scroll catbox flex pb-4 flex-col gap-1 pt-4`}
            >
              {" "}
              <div
                onClick={() => {
                  dispatch(setSearchedCategory({}));
                  dispatch(setShowCategory(false));
                  dispatch(setReloadFilter());
                }}
                className={`line-clamp-1 cursor-pointer hover:bg-gray-100 transition-all duration-300 w-full h-[40px] min-h-[40px] px-4 
        flex justify-start items-center`}
              >
                هیچکدام
              </div>
              {categories?.map((cat) => (
                <div
                  onClick={() => {
                    setCatActive(cat);
                    dispatch(setSearchedCategory(cat));
                    dispatch(setShowCategory(false));
                    dispatch(setReloadFilter());
                  }}
                  key={cat._id}
                  className={`line-clamp-1 cursor-pointer hover:bg-gray-100 transition-all duration-300 w-full h-[40px] min-h-[40px] px-4 ${
                    cat.link == catActive?.link ? "bg-gray-100" : "bg-none"
                  } flex justify-start items-center`}
                >
                  {cat.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchCategoryFilter;
