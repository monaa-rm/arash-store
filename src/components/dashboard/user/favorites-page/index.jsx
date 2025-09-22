"use client";
import BestSellerSliderItem from "@/components/elements/best-seller-slider-item";
import CommentItem from "@/components/elements/comment-item";
import DashboardProductItem from "@/components/elements/dashboard-product-item";
import GlobalLoading from "@/components/elements/global-loading";
import Pagination from "@/components/elements/pagination";
import {
  setDashboardActiveItem,
  setFavorites,
  setUserDashboardActiveItem,
} from "@/features/globalSlice";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { LuChevronFirst, LuChevronLast } from "react-icons/lu";
import { useDispatch } from "react-redux";

const FavoritesPage = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(12);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(-1);
  const path = usePathname();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setUserDashboardActiveItem({ title: "مارک شده ها", link: "favorites" })
    );
  }, []);

  const fatchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const favs = localStorage.getItem("favorites");
      const parsedFavs = favs ? JSON.parse(favs) : [];

      const response = await fetch(
        `/api/product/favorites?page=${currentPage}&limit=${perPage}`,
        {
          method: "POST",
          body: JSON.stringify({ favItems: parsedFavs }),
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();

      if (response.ok) {
        console.log(data?.data);
        setProducts(data?.data?.sendProducts);
        setTotalPages(data?.data?.totalPages);
        setTotal(data?.data?.totalProducts || 0);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, perPage, reload]);
  // useEffect برای فراخوانی API
  useEffect(() => {
    fatchProducts();
  }, [fatchProducts]);

  return (
    <div className="w-full p-4">
      {loading ? (
        <GlobalLoading />
      ) : (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-2 py-2 md:p-4">
          {products?.length === 0 ? (
            <div className="pb-4 text-sm text-gray-500">
              محصول مارک شده ای وجود ندارد
            </div>
          ) : products?.length > 0 ? (
            products.map((item) => (
              <BestSellerSliderItem key={item?._id} data={item} />
            ))
          ) : (
            <GlobalLoading />
          )}
        </div>
      )}

      <Pagination
        items={products}
        loading={loading}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default FavoritesPage;
