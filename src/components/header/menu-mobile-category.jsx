"use client";

import { setSearchedCategory } from "@/features/filterSlice";
import { setShowMenu, setShowMenuCategory } from "@/features/globalSlice";
import { useRouter } from "next/navigation";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdChevronLeft } from "react-icons/md";
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
        <FaArrowRightLong />
        دسته بندی ها
      </div>
      <div
        dir="ltr"
        className={`headermenucat-h w-full  overflow-y-auto scrollbar-style`}
      >
        {categories?.map((cat) => (
          <div
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
            <MdChevronLeft className=" ml-2 group-hover:ml-1 w-5 h-5 transition-all duration-200" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuMobileCategory;
