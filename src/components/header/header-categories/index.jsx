"use client";
import { setMenuActiveItem, setShowMenu, setShowMenuCategory } from "@/features/globalSlice";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const HeaderCategories = ({ categories }) => {
  const showMenu = useSelector((store) => store.globalSlice.showMenuCategory);
  const dispatch = useDispatch();
  useEffect(() => {
    const handleClick = (event) => {
      if (!event.target.closest("#headerCatlg")) {
        dispatch(setShowMenuCategory(false));
      }
    };

    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div
      id="headerCatlg"
      className={`w-3/4 right-20 h-72 rounded-[8px] bg-white transition-all duration-300 border fixed top-[70px]  overflow-hidden ${
        showMenu ? "opacity-100" : " opacity-0 pointer-events-none"
      }`}
    >
      <div className={`w-full h-full ${categories?.length> 16 ? "overflow-y-scroll" : "overflow-auto"}  p-2 gap-1 grid grid-cols-4 justify-start items-start`}>
        {categories?.map((cat) => (
          <Link onClick={() => { dispatch(setShowMenuCategory(false)); dispatch(setMenuActiveItem("/category"));}} href={`/category/${cat?.link}`}
            key={cat?._id}
            className={`h-10 hover:bg-blue-600 hover:text-white  transition-all duration-300 flex justify-center items-center cursor-pointer rounded-full`}
          >
            {cat?.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HeaderCategories;
