"use client";
import { blogData } from "@/components/blogs/blogsPage";
import AdminBlogItem from "@/components/elements/admin-blog-item";
import BlogItem from "@/components/elements/blog-Item";
import DashboardProductItem from "@/components/elements/dashboard-product-item";
import SearchBoxItem from "@/components/search/search-box-item";
import { setDashboardActiveItem } from "@/features/globalSlice";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { LuChevronFirst, LuChevronLast } from "react-icons/lu";
import { useDispatch } from "react-redux";

const AdminBlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [, setsearchedList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(3);
  const [totalblogs, setTotalblogs] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const path = usePathname();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setDashboardActiveItem({ title: "وبلاگ ها", link: "blogs" })
    );
  }, [path]);
  // useCallback برای بهینه‌سازی fetchblogs
  const fetchblogs = useCallback(async () => {
    setLoading(true);

    try {
      // Use searchedList if search is active, otherwise use blogData

      //   const response = await fetch(
      //     `YOUR_API_ENDPOINT?page=${currentPage}&limit=${blogsPerPage}`
      //   );
      //   const data = await response.json();
      //inja ro alaki neveshtam bad be server vaslesh konam
      const indexOfLastProduct = currentPage * blogsPerPage;
      const indexOfFirstProduct = indexOfLastProduct - blogsPerPage;
      console.log({ indexOfLastProduct, indexOfFirstProduct });
      // تعیین لیست محصولاتی که باید در صفحه فعلی نمایش داده شوند

      const currentblogs = blogData?.slice(
        indexOfFirstProduct,
        indexOfLastProduct
      );
      console.log(currentblogs);
      //alaki
      //   setBlogs(data.blogs);
      //   setTotalblogs(data.totalblogs || 0); // مقدار پیش‌فرض برای totalblogs
      setBlogs(currentblogs);
      setTotalblogs(blogData.length || 0); // مقدار پیش‌فرض برای totalblogs
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
      // Handle error appropriately, e.g., display an error message
    } finally {
      setLoading(false);
    }
    console.log(isSearchActive);
  }, [currentPage, blogsPerPage, isSearchActive]);
  // useEffect برای فراخوانی API
  useEffect(() => {
    fetchblogs();
  }, [fetchblogs]); // fetchblogs به عنوان dependency


  // محاسبه تعداد صفحات
  const totalPages = Math.ceil(totalblogs / blogsPerPage);

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
      {/*   <div className="flex w-full top-0 blogData-center border-b-2 h-10 focus-within:border-indigo-500 transition duration-300 px-3 gap-2 bg-white border-gray-500/30 py-2">
        <input
          type="search"
          placeholder="جستجوی محصول"
          value={searchProduct}
          onChange={searchProductHandler}
          className="w-full h-full pl-4 outline-none placeholder-gray-500 text-sm"
        />
      </div> */}

      {loading ? (
        <div>Loading...</div> // نمایش loading
      ) : (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-4">
          {blogs?.length > 0 ? (
            blogs.map((item) => (
              <AdminBlogItem blog={item} key={item.id} />
            ))
          ) : (
            <div className="pb-4 text-sm text-gray-500">
              محصولی برای نمایش وجود ندارد.
            </div>
          )}
        </div>
      )}

      <nav>
        <ul className="pagination flex justify-center blogData-center gap-2 mt-4">
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

export default AdminBlogsPage;
