"use client";
import BlogItem from "@/components/elements/blog-Item";
import GlobalLoading from "@/components/elements/global-loading";
import Pagination from "@/components/elements/pagination";
import { useState, useEffect, useCallback } from "react";
import { LuChevronFirst, LuChevronLast } from "react-icons/lu";

const Allblogs = () => {
  const [blogs, setBlogs] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(10);
  const [totalblogs, setTotalBlogs] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(-1);

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
    <div className="w-full p-4">
      <h3 className="font-bold text-xl">آخرین وبلاگ ها</h3>
      {loading ? (
        <GlobalLoading />
      ) : (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-4">
          {blogs?.length > 0 ? (
            blogs.map((item) => <BlogItem blog={item} key={item._id} />)
          ) : (
            <div className="pb-4 text-sm text-gray-500">
              وبلاگی برای نمایش وجود ندارد.
            </div>
          )}
        </div>
      )}
      <Pagination
        items={blogs}
        loading={loading}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default Allblogs;
