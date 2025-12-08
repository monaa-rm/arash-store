"use client";
import GlobalLoading from "@/components/elements/global-loading";
import Pagination from "@/components/elements/pagination";
import SearchBoxItem from "@/components/search/search-box-item";
import { setMenuActiveItem } from "@/features/globalSlice";
import { useParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";

const CategorySinglePage = ({ cat }) => {
  const params = useParams();
  const { catSlug } = params;
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(-1);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setMenuActiveItem("/category"));
  }, []);
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/category/findCategory?page=${currentPage}&limit=${productsPerPage}&catSlug=${catSlug}`
      );
      const data = await response.json();

      if (response.ok) {
        setProducts(data?.data?.sendProducts);
        setTotalPages(data?.data?.totalPages);
        setTotalProducts(data?.data?.totalProducts || 0);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
      // Handle error appropriately, e.g., display an error message
    } finally {
      setLoading(false);
    }
    console.log(isSearchActive);
  }, [currentPage, productsPerPage, isSearchActive, reload]);
  // useEffect برای فراخوانی API
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <main className="w-full p-4">
      <h1 className="font-bold text-xl flex items-center gap-2 pb-4">
        {/* <BiCategory /> */}
        <svg className="w-5 h-5 text-inherit">
          <use href="/sprite.svg#category_icon_2" />
        </svg>
        {cat?.name}
      </h1>
      {loading ? (
        <GlobalLoading />
      ) : (
        <section className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-4">
          {products?.length === 0 ? (
            <p className="pb-4 text-sm text-gray-500">محصولی یافت نشد</p>
          ) : products?.length > 0 ? (
            products.map((item) => <SearchBoxItem item={item} key={item._id} />)
          ) : (
            <p className="pb-4 text-sm text-gray-500">
              محصولی برای نمایش وجود ندارد.
            </p>
          )}
        </section>
      )}

      <Pagination
        items={products}
        loading={loading}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </main>
  );
};

export default CategorySinglePage;
