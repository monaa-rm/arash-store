import DashboardProductItem from "@/components/elements/dashboard-product-item";
import { useState, useEffect, useCallback } from "react";
import { LuChevronFirst, LuChevronLast } from "react-icons/lu";

const items = [
  {
    id: "1",
    title: " آب 6 مرحله ای ن",
    price: 1855455,
    inStock: 25,
    productId: "123",
  },
  {
    id: "2",
    title: "  دستگاه تصفیه آب 6 مرحله ای چفتن",
    price: 1250000,
    inStock: 1,
    productId: "1234",
  },
  {
    id: "3",
    title: " آب 6 مرحله ای  6 مرحله ای چفتن",
    price: 42585665,
    inStock: 0,
    productId: "2345",
  },
  {
    id: "4",
    title:
      " آب 6 مرحله آب 6 مرحله ای  دستگاه تصفیه آب 6 مرحله ای چفتن آب 6 مرحله ای  دستگاه تصفیه آب 6 مرحله ای  ای چفتن",
    price: 34585665,
    inStock: 8,
    productId: "678",
  },
  {
    id: "5",
    title: " آب 6 مرحله آب 6 مرحله ای  دستگاه تصفیه آب 6 مرحله ای چفتن  چفتن",
    price: 5854587,
    inStock: 15,
    productId: "778",
  },
  {
    id: "6",
    title: " آب 6 مرحله چفتن",
    price: 5000000,
    inStock: 14,
    productId: "774",
  },
  {
    id: "7",
    title:
      " ن ref به عنصر بالا (در این مثال، یک <div> خالی) اختصاص داده شب 6 مرحله چفتن",
    price: 5000000,
    inStock: 14,
    productId: "6543",
  },
  {
    id: "8",
    title: "فقط یک بار اجرا شود",
    price: 700000,
    inStock: 124,
    productId: "454",
  },
  {
    id: "9",
    title: " ق اسکرول به بالا، می‌توانید یک",
    price: 85000000,
    inStock: 24,
    productId: "58",
  },
  {
    id: "10",
    title: "ن می‌دهد که عنصر به بالای صفح",
    price: 62000000,
    inStock: 87,
    productId: "568",
  },
  {
    id: "11",
    title: " که عنصر به بالای صفح",
    price: 96000000,
    inStock: 45,
    productId: "965",
  },
];
const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchProduct, setSearchProduct] = useState("");
  const [searchedList, setsearchedList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(3);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);

    // useCallback برای بهینه‌سازی fetchProducts
    const fetchProducts = useCallback(async () => {
      setLoading(true);

      try {
        const productSource = isSearchActive ? searchedList : items; // Use searchedList if search is active, otherwise use items

        //   const response = await fetch(
        //     `YOUR_API_ENDPOINT?page=${currentPage}&limit=${productsPerPage}`
        //   );
        //   const data = await response.json();
        //inja ro alaki neveshtam bad be server vaslesh konam
        const indexOfLastProduct = currentPage * productsPerPage;
        const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
console.log({indexOfLastProduct , indexOfFirstProduct})
        // تعیین لیست محصولاتی که باید در صفحه فعلی نمایش داده شوند

          const currentProducts = productSource?.slice(
              indexOfFirstProduct,
              indexOfLastProduct
            );
            console.log(currentProducts)
        //alaki
        //   setProducts(data.products);
        //   setTotalProducts(data.totalProducts || 0); // مقدار پیش‌فرض برای totalProducts
        setProducts(currentProducts);
        setTotalProducts(productSource.length || 0); // مقدار پیش‌فرض برای totalProducts
      } catch (error) {
        console.error("Failed to fetch products:", error);
        // Handle error appropriately, e.g., display an error message
      } finally {
        setLoading(false);
      }
      console.log(isSearchActive)
    }, [currentPage, productsPerPage, searchedList, isSearchActive ]);
    // useEffect برای فراخوانی API
    useEffect(() => {
      fetchProducts();
    }, [fetchProducts]); // fetchProducts به عنوان dependency

    const searchProductHandler = async (e) => {
      const searchTerm = e.target.value;
      setSearchProduct(searchTerm);

      if (searchTerm) {
        try {
          // const response = await fetch(
          //   `YOUR_SEARCH_API_ENDPOINT?query=${searchTerm}`
          // );
          // const data = await response.json();
          // setsearchedList(data.results);
          const productsearcch = items?.filter(
            (item) =>
              item?.title?.includes(searchProduct) ||
              item?.productId?.includes(searchProduct)
          );
          setsearchedList(productsearcch);
          setIsSearchActive(true); // Set search as active
          setCurrentPage(1); // Reset to first page on search
      
        } catch (error) {
          console.error("Search failed:", error);
          setsearchedList([]);
          }
      } else {
        setsearchedList([]);
        setIsSearchActive(false); // Set search as inactive
        setCurrentPage(1); // Reset to first page when search is cleared
      }
    };

    // محاسبه تعداد صفحات
    const totalPages = Math.ceil(totalProducts / productsPerPage);

    // // ایجاد شماره صفحات
    // const pageNumbers = [];
    // for (let i = 1; i <= totalPages; i++) {
    //   pageNumbers.push(i);
    // }

    // محاسبه شماره صفحاتی که باید نمایش داده شوند

    const getVisiblePageNumbers = () => {
      const maxVisiblePages = 5;
      let startPage = currentPage - Math.floor(maxVisiblePages / 2);
      let endPage = currentPage + Math.floor(maxVisiblePages / 2);

      if (startPage <= 0) {
        startPage = 1;
        endPage = Math.min(maxVisiblePages, totalPages);
      }

      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, totalPages - maxVisiblePages + 1);
      }

      let visiblePageNumbers = Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
      );

      return visiblePageNumbers;
    };

    const visiblePageNumbers = getVisiblePageNumbers();

 
  return (
    <div className="w-full p-4">
      <div className="flex w-full top-0 items-center border-b-2 h-10 focus-within:border-indigo-500 transition duration-300 px-3 gap-2 bg-white border-gray-500/30 py-2">
        <input
          type="search"
          placeholder="جستجوی محصول"
          value={searchProduct}
          onChange={searchProductHandler}
          className="w-full h-full pl-4 outline-none placeholder-gray-500 text-sm"
        />
      </div>

      {loading ? (
        <div>Loading...</div> // نمایش loading
      ) : (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-4">
          {searchProduct && searchedList?.length > 0 ? (
            products.map((item) => (
              <DashboardProductItem item={item} key={item.id} />
            ))
          ) : searchProduct && searchedList?.length === 0 ? (
            <div className="pb-4 text-sm text-gray-500">محصولی یافت نشد</div>
          ) : products?.length > 0 ? (
            products.map((item) => (
              <DashboardProductItem item={item} key={item.id} />
            ))
          ) : (
            <div className="pb-4 text-sm text-gray-500">
              محصولی برای نمایش وجود ندارد.
            </div>
          )}
        </div>
      )}

      <nav>
        <ul className="pagination flex justify-center items-center gap-2 mt-4">
          {totalPages > 5 && currentPage > 3 && (
            <li>
              <button
                onClick={() => setCurrentPage(1)}
                className="page-link p-3 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                <LuChevronLast />
              </button>
            </li>
          )}

          {visiblePageNumbers.map((number) => (
            <li key={number} className="page-item">
              <button
                onClick={() => setCurrentPage(number)}
                className={`page-link px-4 py-2 rounded-md ${
                  currentPage === number
                    ? "bg-indigo-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {number}
              </button>
            </li>
          ))}

          {totalPages > 5 && currentPage < totalPages - 2 && (
            <li>
              <button
                onClick={() => setCurrentPage(totalPages)}
                className="page-link p-3 py-3 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                <LuChevronFirst />
              </button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default AllProducts;
