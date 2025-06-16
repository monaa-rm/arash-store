"use client";
import AdminBlogItem from "@/components/elements/admin-blog-item";
import GlobalLoading from "@/components/elements/global-loading";
import Pagination from "@/components/elements/pagination";
import { useState, useEffect, useCallback } from "react";
import { LuChevronFirst, LuChevronLast } from "react-icons/lu";

const AdminBlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchBlog, setSearchBlog] = useState("");
  const [searchedList, setsearchedList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(10);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(-1);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/blog/all-blogs?page=${currentPage}&limit=${blogsPerPage}&query=${searchBlog}`
      );
      const data = await response.json();

      if (response.ok) {
        console.log(data);
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
    console.log(isSearchActive);
  }, [currentPage, blogsPerPage, searchedList, isSearchActive, reload]);
  // useEffect برای فراخوانی API
  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const searchBlogHandler = async (e) => {
    const searchTerm = e.target.value;
    setSearchBlog(searchTerm);
    if (searchTerm?.length) {
      if (searchTerm?.length > 3) setIsSearchActive(true);
      if (searchTerm?.length == 3) setCurrentPage(1);
    } else {
      setIsSearchActive(false);
      setCurrentPage(1);
    }
  };

  return (
    <div className="w-full p-4">
      <div className="flex w-full top-0 items-center border-b-2 h-10 focus-within:border-indigo-500 transition duration-300 px-3 gap-2 bg-white border-gray-500/30 py-2">
        <input
          type="search"
          placeholder="جستجوی وبلاگ"
          value={searchBlog}
          onChange={searchBlogHandler}
          className="w-full h-full pl-4 outline-none placeholder-gray-500 text-sm"
        />
      </div>

      {loading ? (
        <GlobalLoading />
      ) : (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-4">
          {searchBlog && blogs?.length > 0 ? (
            blogs.map((item) => (
              <AdminBlogItem
                blog={item}
                key={item._id}
                reload={reload}
                setReload={setReload}
              />
            ))
          ) : searchBlog && blogs?.length === 0 ? (
            <div className="pb-4 text-sm text-gray-500">وبلاگی یافت نشد</div>
          ) : blogs?.length > 0 ? (
            blogs.map((item) => (
              <AdminBlogItem
                blog={item}
                key={item._id}
                reload={reload}
                setReload={setReload}
              />
            ))
          ) : (
            <div className="pb-4 text-sm text-gray-500">
              وبلاگی برای نمایش وجود ندارد.
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

export default AdminBlogsPage;
