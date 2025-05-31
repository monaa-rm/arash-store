"use client";

import { setDashboardActiveItem } from "@/features/globalSlice";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import NewCategory from "../new-category";
import { FaPlus } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { BsFillTrashFill } from "react-icons/bs";
import { RiEditFill } from "react-icons/ri";
import RemoveBox from "@/components/elements/remove-box";

export const categorydata = [
  { name: "لوله", link: "lole" },
  { name: "آچار", link: "achar" },
  { name: "کولر", link: "kooler" },
  { name: "3کولر", link: "kooler3" },
  { name: "5کولر 5کولر ", link: "kooler5" },
  { name: "پیچ پیچ2 پیچ2 پیچ22", link: "pich2" },
  { name: "3پیچ", link: "pich3" },
  { name: "پیچ", link: "pich" },
  { name: "تصفیه اب", link: "tasfie" },
  { name: "فیلتر", link: "filter" },
  { name: "سیم", link: "sim" },
  { name: "شیر آب", link: "shir-ab" },
  { name: "خازن", link: "khazan" },
  { name: "برد", link: "bord" },
];
const CategoriesPage = () => {
  const [catdata, setCatdata] = useState([]);
  const [showNewCat, setShowNewCat] = useState(false);
  const [showRemove, setShowRemove] = useState(false);
  const [searchedCat, setSearchedCat] = useState("");
  const [searchedList, setsearchedList] = useState([]);
  const [catToEdit, setCatToEdit] = useState({});
  const [catToRemove, setCatToRemove] = useState(null);
  const [reload, setReload] = useState(-1);
  const path = usePathname();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setDashboardActiveItem({ title: "دسته بندی ها", link: "categories" })
    );
  }, [path]);
  useEffect(() => {
    if (showNewCat) {
      document.body.style.overflowY = "hidden";
    }

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [showNewCat]);
  useEffect(() => {
    async function fetchCat() {
      const data = await fetch("/api/category/allCategories").then((res) =>
        res.json()
      );
      setCatdata(data?.data || []);
    }
    fetchCat();
  }, [reload]);
  const searchCatHandler = (e) => {
    setSearchedCat(e.target.value);
    const catListSearch = catdata?.filter(
      (item) =>
        item?.name.includes(searchedCat) || item?.link.includes(searchedCat)
    );
    setsearchedList(catListSearch);
  };
  return (
    <div className=" w-full">
      <div className="w-full flex flex-col gap-2 px-2 md:px-4 lg:pr-0">
        <div className=" flex flex-col sm:flex-row gap-2 justify-between items-center">
          <div
            className="flex items-center border-b-2 h-10 w-full md:w-80 focus-within:border-indigo-500
           transition duration-300 px-3 gap-1 bg-white border-gray-500/30 py-2
            overflow-hidden"
          >
            <input
              type="search"
              placeholder="جستجوی دسته بندی"
              value={searchedCat}
              onChange={(e) => searchCatHandler(e)}
              className="w-full h-full pl-4 outline-none placeholder-gray-500 text-sm"
            />
            <FiSearch className="w-5 h-5" />
          </div>
          <button
            onClick={() => setShowNewCat(true)}
            className="relative px-8 py-2 w-40 h-10 font-bold rounded-md isolation-auto z-[1] text-white border-2 bg-blue-600 border-blue-500
        before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full
         before:-right-full before:hover:right-0 before:rounded-full  before:bg-blue-950 before:-z-10 
          before:aspect-square before:hover:scale-150  overflow-hidden before:hover:duration-700
           flex justify-center items-center gap-2"
          >
            <span>افزودن</span>
            <FaPlus />
          </button>
        </div>
        <NewCategory
          showNewCat={showNewCat}
          setShowNewCat={setShowNewCat}
          searchedCat={searchedCat}
          setSearchedCat={setSearchedCat}
          catToEdit={catToEdit}
          setCatToEdit={setCatToEdit}
          reload={reload}
          setReload={setReload}
        />

        <div className="grid grid-cols-3 border-b font-bold ">
          <div>نام دسته</div>
          <div>لینک دسته</div>
        </div>
        <div className="w-full flex flex-col  ">
          {searchedCat && searchedList?.length ? (
            searchedList?.map((item, i) => (
              <div
                key={i}
                className={`grid grid-cols-3 gap-4 odd:bg-gray-100  p-1 `}
              >
                <div className="line-clamp-1">{item.name}</div>
                <div className=" line-clamp-1">{item.link}</div>
                <div className="flex items-center gap-4">
                  <RiEditFill
                    onClick={() => {
                      setCatToEdit(item);
                      setShowNewCat(true);
                    }}
                    className="w-5 h-5 cursor-pointer text-blue-400 hover:text-blue-600 transition-all duration-300 ease-in-out"
                  />
                  <BsFillTrashFill
                    onClick={() => {
                      setCatToRemove(item);
                      setShowRemove(true);
                    }}
                    className="w-4 h-4 cursor-pointer text-rose-400 hover:text-rose-600 transition-all duration-300 ease-in-out"
                  />
                </div>
              </div>
            ))
          ) : searchedCat && !searchedList?.length ? (
            <div className="py-4 text-sm text-gray-500">
              متاسفانه دسته ای یافت نشد
            </div>
          ) : (
            catdata?.map((item, i) => (
              <div
                key={i}
                className={`grid grid-cols-3 gap-4 odd:bg-gray-100  p-1 `}
              >
                <div className="line-clamp-1">{item.name}</div>
                <div className=" line-clamp-1">{item.link}</div>
                <div className="flex items-center gap-4">
                  <RiEditFill
                    onClick={() => {
                      setCatToEdit(item);
                      setShowNewCat(true);
                    }}
                    className="w-5 h-5 cursor-pointer text-blue-400 hover:text-blue-600 transition-all duration-300 ease-in-out"
                  />
                  <BsFillTrashFill
                    onClick={() => {
                      setCatToRemove(item);
                      setShowRemove(true);
                    }}
                    className="w-4 h-4 cursor-pointer text-rose-400 hover:text-rose-600 transition-all duration-300 ease-in-out"
                  />
                </div>
              </div>
            ))
          )}
          <RemoveBox
            showRemove={showRemove}
            setShowRemove={setShowRemove}
            catToRemove={catToRemove}
            setCatToRemove={setCatToRemove}
            reload={reload}
            setReload={setReload}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
