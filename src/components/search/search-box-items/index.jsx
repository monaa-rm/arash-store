"use client";
import DashboardProductItem from "@/components/elements/dashboard-product-item";
import GlobalLoading from "@/components/elements/global-loading";
import { useState, useEffect, useCallback } from "react";
import { LuChevronFirst, LuChevronLast } from "react-icons/lu";
import SearchBoxItem from "../search-box-item";
import { useDispatch, useSelector } from "react-redux";
import { setHeaderSearchValue, setNumberCategories, setTotalProducts } from "@/features/filterSlice";
import Pagination from "@/components/elements/pagination";

const SearchBoxItems = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const searchPrice = useSelector((store) => store.filterSlice.searchPrice);
  const headerSearchValue = useSelector(
    (store) => store.filterSlice.headerSearchValue
  );
  const activeSearchHeaderItem = useSelector(
    (store) => store.filterSlice.activeSearchHeaderItem
  );
  const searchedCategory = useSelector(
    (store) => store.filterSlice.searchedCategory
  );
  const reloadFilter = useSelector((store) => store.filterSlice.reloadFilter);
  const dispatch = useDispatch();
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/search?page=${currentPage}&limit=${productsPerPage}&minprice=${
          searchPrice[0]
        }&maxprice=${searchPrice[1]}&category=${
          searchedCategory?.link || ""
        }&sortby=${activeSearchHeaderItem}&searchvalue=${
          headerSearchValue || ""
        }`
        // `/api/search?page=${currentPage}&limit=${productsPerPage}`
      );
      const data = await response.json();

      if (response.ok) {
        setProducts(data?.data?.sendProducts);
        setTotalPages(data?.data?.totalPages);

        dispatch(setTotalProducts(data?.data?.totalProducts || 0));
        dispatch(setNumberCategories(data?.data?.sendProducts?.length || 0));
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
      // Handle error appropriately, e.g., display an error message
    } finally {
      setLoading(false);
    }
  }, [currentPage, productsPerPage, reloadFilter, searchedCategory , headerSearchValue]);
  // useEffect برای فراخوانی API
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);



  return (
    <div className="w-full p-4">
      {loading ? (
        <GlobalLoading />
      ) : (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-4">
          {products?.length > 0 ? (
            products.map((item) => <SearchBoxItem item={item} key={item._id} />)
          ) : (
            <div className="pb-4 text-sm text-gray-500">
              محصولی برای نمایش وجود ندارد.
            </div>
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

export default SearchBoxItems;
