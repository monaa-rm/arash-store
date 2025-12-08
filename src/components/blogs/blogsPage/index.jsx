"use client";
import BlogItem from "@/components/elements/blog-Item";
import GlobalLoading from "@/components/elements/global-loading";
import Pagination from "@/components/elements/pagination";
import { setMenuActiveItem } from "@/features/globalSlice";
import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";

const Allblogs = () => {
  const [blogs, setBlogs] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(12);
  const [totalblogs, setTotalBlogs] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(-1);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setMenuActiveItem("/blogs"));
  }, []);
  const fetchblogs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/blog/all-blogs?page=${currentPage}&limit=${blogsPerPage}`
      );
      const data = await response.json();

      if (response.ok) {
        setBlogs(data?.data?.sendBlogs);
        setTotalPages(data?.data?.totalPages);
        setTotalBlogs(data?.data?.totalBlogs || 0);
      }
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
      // Handle error appropriately, e.g., display an error message
    } finally {
      setLoading(false);
    }
  }, [currentPage, blogsPerPage, reload]);
  // useEffect برای فراخوانی API
  useEffect(() => {
    fetchblogs();
  }, [fetchblogs]);

  return (
    <main className="w-full p-4">
      {/* <h1 className="font-bold text-xl"></h1> */}
       <h1 className="font-bold text-xl flex items-center gap-2 pb-4  sm:px-4">
        {/* <BiCategory /> */}
        <svg className="w-5 h-5 text-inherit">
          <use href="/sprite.svg#blog_icon" />
        </svg>
       آخرین وبلاگ ها
      </h1>
      {loading ? (
        <GlobalLoading />
      ) : (
        <section className="w-full p-4">
          <div  className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {blogs?.length > 0 ? (
              blogs.map((item) => <BlogItem blog={item} key={item._id} />)
            ) : (
              <p className="pb-4 text-sm text-gray-500">
                وبلاگی برای نمایش وجود ندارد.
              </p>
            )}
          </div>
        </section>
      )}
      <Pagination
        items={blogs}
        loading={loading}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </main>
  );
};

export default Allblogs;
