"use client";

import { setSearchedCategory } from "@/features/filterSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

const FilterRemoteItemSeeAll = ({ cat }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <div onClick={() => {
        dispatch(setSearchedCategory(cat))
        router.push("/search")
    }} className="md:text-sm lg:text-base">
      مشاهده محصولات
    </div>
  );
};

export default FilterRemoteItemSeeAll;
