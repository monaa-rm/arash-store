"use client";
import { setShowCategory } from "@/features/filterSlice";
import { useEffect, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
const cattitles = [
  { title: "لوله 1", link: "lole1" },
  { title: "لوله 2", link: "lole2" },
  { title: "لوله 3", link: "lole3" },
  { title: "لوله 4", link: "lole4" },
  { title: "لوله 5", link: "lole5" },
  { title: "لوله 6", link: "lole6" },
  { title: "لوله 7", link: "lole7" },
  { title: "لوله 8", link: "lole8" },
  { title: "لوله 9", link: "lole9" },
  { title: "لوله 10", link: "lole10" },
  { title: "لوله 11", link: "lole11" },
  { title: "لوله 12", link: "lole12" },
  { title: "لوله 13", link: "lole13" },
  { title: "لوله 14", link: "lole14" },
];
const SearchCategoryFilter = () => {
  const showCategory = useSelector(store => store.filterSlice.showCategory)
  const [catboxPosition, setCatboxPosition] = useState("bottom-[70px]"); // Initial position
  const [catSearch, setCatSearch] = useState("");
  const [catActive, setCatActive] = useState(cattitles[0]?.link || "");
  const [searchedCats, setSearchedCats] = useState([]);
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
  const searchCategoryHandler = (e) => {
    const searchText = e.target.value;
    setCatSearch(searchText);
    const result = cattitles.filter((item) => item.title.includes(searchText));
    setSearchedCats(result);
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
            یک دسته بندی انتخاب کنید
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
        className={`w-[90%] h-64 pt-1 absolute ${catboxPosition} ${
          showCategory ? "block" : "hidden"
        } bg-white rounded-lg border transition-all duration-300`}
      >
        <div className="bg-white w-full px-1 absolute top-1 z-[1] ">
          <input
            type="text"
            className="w-full  h-8 border bg-white  border-zinc-400 p-2 outline-none "
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
                  {searchedCats.map((cat) => (
                    <div
                      onClick={() => setCatActive(cat.link)}
                      key={cat.link}
                      className={`line-clamp-1 cursor-pointer hover:bg-gray-100 transition-all duration-300 w-full h-[40px] min-h-[40px] px-4 ${
                        cat.link == catActive ? "bg-gray-100" : "bg-none"
                      } flex justify-start items-center`}
                    >
                      {cat.title}
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
              {cattitles.map((cat) => (
                <div
                  onClick={() => setCatActive(cat.link)}
                  key={cat.link}
                  className={`line-clamp-1 cursor-pointer hover:bg-gray-100 transition-all duration-300 w-full h-[40px] min-h-[40px] px-4 ${
                    cat.link == catActive ? "bg-gray-100" : "bg-none"
                  } flex justify-start items-center`}
                >
                  {cat.title}
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
