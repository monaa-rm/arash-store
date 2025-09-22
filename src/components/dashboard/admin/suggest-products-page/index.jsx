"use client";

import { useDispatch } from "react-redux";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { setDashboardActiveItem } from "@/features/globalSlice";
import SelectSuggestions from "../select-suggestions";

const SuggestProductsPage = () => {
  const path = usePathname();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setDashboardActiveItem({ title: "محصولات پیشنهادی", link: "suggest-product" })
    );
  }, [path]);
  return (
    <div>
      <SelectSuggestions />
    </div>
  );
};

export default SuggestProductsPage;