"use client";
import GlobalLoading from "@/components/elements/global-loading";
import { useState, useEffect, useCallback } from "react";
import { LuChevronFirst, LuChevronLast } from "react-icons/lu";
import ChangeAllPrices from "../change-all-prices";
import ChangePriceByCategory from "../change-price-by-cat";
import DashboardStockPriceItem from "@/components/elements/dashboard-stock-price-item";
import AdminShowPrice from "@/components/elements/admin-show-price";
import Pagination from "@/components/elements/pagination";

const AllSocks = () => {
  const [products, setProducts] = useState([]);
  const [searchProduct, setSearchProduct] = useState("");
  const [searchedList, setsearchedList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(-1);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/product/all-products?page=${currentPage}&limit=${productsPerPage}&query=${searchProduct}`
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
  }, [currentPage, productsPerPage, searchedList, isSearchActive, reload]);
  // useEffect برای فراخوانی API
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const searchProductHandler = async (e) => {
    const searchTerm = e.target.value;
    setSearchProduct(searchTerm);
    if (searchTerm?.length) {
      if (searchTerm?.length > 3) setIsSearchActive(true);
      if (searchTerm?.length == 3) setCurrentPage(1);
    } else {
      setIsSearchActive(false);
      setCurrentPage(1);
    }
  };


  return (
    <div className="w-full flex flex-col gap-4 p-4">
      <div className="flex w-full top-0 items-center border-b-2 h-10 focus-within:border-indigo-500 transition duration-300 px-3 gap-2 bg-white border-gray-500/30 py-2">
        <input
          type="search"
          placeholder="جستجوی محصول"
          value={searchProduct}
          onChange={searchProductHandler}
          className="w-full h-full pl-4 outline-none placeholder-gray-500 text-sm"
        />
      </div>
      <AdminShowPrice />
      <ChangeAllPrices reload={reload} setReload={setReload} />
      <ChangePriceByCategory reload={reload} setReload={setReload} />
      {loading ? (
        <GlobalLoading />
      ) : (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-4">
          {searchProduct && products?.length > 0 ? (
            products.map((item) => (
              <DashboardStockPriceItem
                item={item}
                key={item._id}
                reload={reload}
                setReload={setReload}
              />
            ))
          ) : searchProduct && products?.length === 0 ? (
            <div className="pb-4 text-sm text-gray-500">محصولی یافت نشد</div>
          ) : products?.length > 0 ? (
            products.map((item) => (
              <DashboardStockPriceItem
                item={item}
                key={item._id}
                reload={reload}
                setReload={setReload}
              />
            ))
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

export default AllSocks;
