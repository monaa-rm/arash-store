"use client";
import DashboardProductItem from "@/components/elements/dashboard-product-item";
import GlobalLoading from "@/components/elements/global-loading";
import Pagination from "@/components/elements/pagination";
import SearchCategoryFilter from "@/components/elements/search-category-filter";
import SearchPriceFilter from "@/components/elements/search-price-filter";
import SearchBoxItem from "@/components/search/search-box-item";
import SearchMainBox from "@/components/search/search-main-box";
import { setHighestPrice, setSearchPrice } from "@/features/filterSlice";
import { setMenuActiveItem } from "@/features/globalSlice";
import { useState, useEffect, useCallback } from "react";
import { IoAppsOutline } from "react-icons/io5";
import { RiApps2Fill } from "react-icons/ri";
import { useDispatch } from "react-redux";

const ProductsPage = ({ highestPrice }) => {
  const [products, setProducts] = useState([]);
  const [searchProduct, setSearchProduct] = useState("");
  const [searchedList, setsearchedList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(-1);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setMenuActiveItem("/products"));
  }, []);
  useEffect(() => {
    if (highestPrice && highestPrice > 0) {
      dispatch(setHighestPrice(highestPrice));
      dispatch(setSearchPrice([0, highestPrice]));
    }
    console.log(highestPrice);
  }, [highestPrice]);
  // const fetchProducts = useCallback(async () => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch(
  //       `/api/product/all-products?page=${currentPage}&limit=${productsPerPage}&query=${searchProduct}`
  //     );
  //     const data = await response.json();

  //     if (response.ok) {
  //       setProducts(data?.data?.sendProducts);
  //       setTotalPages(data?.data?.totalPages);
  //       setTotalProducts(data?.data?.totalProducts || 0);
  //     }
  //   } catch (error) {
  //     console.error("Failed to fetch products:", error);
  //     // Handle error appropriately, e.g., display an error message
  //   } finally {
  //     setLoading(false);
  //   }
  //   console.log(isSearchActive);
  // }, [currentPage, productsPerPage, searchedList, isSearchActive, reload]);
  // // useEffect برای فراخوانی API
  // useEffect(() => {
  //   fetchProducts();
  // }, [fetchProducts]);

  // const searchProductHandler = async (e) => {
  //   const searchTerm = e.target.value;
  //   setSearchProduct(searchTerm);
  //   if (searchTerm?.length) {
  //     if (searchTerm?.length > 3) setIsSearchActive(true);
  //     if (searchTerm?.length == 3) setCurrentPage(1);
  //   } else {
  //     setIsSearchActive(false);
  //     setCurrentPage(1);
  //   }
  // };
  return (
    // <div className="w-full p-4">
    //         <h1 className="font-bold text-xl flex items-center gap-2 pb-4">
    //           <RiApps2Fill />
    //           همه‌ی محصولات
    //         </h1>
    //   <div className="flex w-full top-0 items-center border-b-2 h-10 focus-within:border-indigo-500 transition duration-300 px-3 gap-2 bg-white border-gray-500/30 py-2">
    //     <input
    //       type="search"
    //       placeholder="جستجوی محصول"
    //       value={searchProduct}
    //       onChange={searchProductHandler}
    //       className="w-full h-full pl-4 outline-none placeholder-gray-500 text-sm"
    //     />
    //   </div>

    //   {loading ? (
    //     <GlobalLoading />
    //   ) : (
    //     <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-3 p-4">
    //       {searchProduct && products?.length > 0 ? (
    //         products.map((item) => (
    //         <SearchBoxItem item={item} key={item._id} />
    //         ))
    //       ) : searchProduct && products?.length === 0 ? (
    //         <div className="pb-4 text-sm text-gray-500">محصولی یافت نشد</div>
    //       ) : products?.length > 0 ? (
    //         products.map((item) => (
    //             <SearchBoxItem item={item} key={item._id} />
    //         ))
    //       ) : (
    //         <div className="pb-4 text-sm text-gray-500">
    //           محصولی برای نمایش وجود ندارد.
    //         </div>
    //       )}
    //     </div>
    //   )}

    //   <Pagination
    //     items={products}
    //     loading={loading}
    //     currentPage={currentPage}
    //     setCurrentPage={setCurrentPage}
    //     totalPages={totalPages}
    //   />
    // </div>
    <div className="w-full px-2 sm:px-4 lg:px-8 py-8 flex gap-4 relative">
      <div className="w-1/3 min-w-1/3 h-full hidden lg:flex  sticky top-[100px] flex-col gap-6  ">
        {highestPrice && highestPrice > 0 ? <SearchPriceFilter /> : <></>}
        <SearchCategoryFilter />
      </div>
      <SearchMainBox />
    </div>
  );
};

export default ProductsPage;
