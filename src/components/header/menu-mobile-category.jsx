"use client";

import { setSearchedCategory } from "@/features/filterSlice";
import { setShowMenu, setShowMenuCategory } from "@/features/globalSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

const MenuMobileCategory = ({ categories }) => {
  const showMenuCategory = useSelector(
    (store) => store.globalSlice.showMenuCategory
  );
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <div
      className={`absolute z-[1] border  w-[270px] h-screen text-gray-700  top-0 bottom-0 bg-white ${
        showMenuCategory ? "right-0 " : "right-[-270px]  "
      } transition-all duration-300`}
    >
      <div
        onClick={() => dispatch(setShowMenuCategory(false))}
        className="p-4 h-10 cursor-pointer border-b-2 flex justify-start items-center gap-2"
      >
        <svg className="w-4 h-4 text-gray-900">
          <use href="/sprite.svg#back_icon" />
        </svg>
        دسته بندی ها
      </div>
      <div
        dir="ltr"
        className={`headermenucat-h w-full  overflow-y-auto scrollbar-style`}
      >
        {categories?.map((cat) => (
          <Link
            href={`/category/${cat?.link}`}
            onClick={() => {
              dispatch(setSearchedCategory(cat));
              dispatch(setShowMenuCategory(false));
              dispatch(setShowMenu(false));
              router.push("/search");
            }}
            key={cat?._id}
            dir="rtl"
            className={`h-9 group border-b cursor-pointer hover:text-blue-700 transition-all duration-300 flex justify-between items-center pr-4 pl-2 `}
          >
            {cat.name}
            <svg className=" ml-2 group-hover:ml-1 w-3 h-3 text-inherit transition-all duration-200">
              <use href="/sprite.svg#show_arrow_left" />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MenuMobileCategory;
