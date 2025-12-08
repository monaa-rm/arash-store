"use client";
import { setDashboardActiveItem } from "@/features/globalSlice";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import GlobalLoading from "@/components/elements/global-loading";
import Pagination from "@/components/elements/pagination";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const UsersListPage = () => {
  const [users, setUsers] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const [searchedList, setsearchedList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [userPerPage] = useState(10);
  const [totalUsres, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(-1);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const path = usePathname();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setDashboardActiveItem({ title: "لیست کاربرها", link: "users-list" })
    );
  }, [path]);
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/user/all?page=${currentPage}&limit=${userPerPage}&query=${searchUser}`
      );
      const data = await response.json();

      if (response.ok) {
        setUsers(data?.data?.sendUsers);
        setTotalPages(data?.data?.totalPages);
        setTotalUsers(data?.data?.totalUsers || 0);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
      // Handle error appropriately, e.g., display an error message
    } finally {
      setLoading(false);
    }
    console.log(isSearchActive);
  }, [currentPage, userPerPage, searchedList, isSearchActive, reload]);
  // useEffect برای فراخوانی API
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const searchUserHandler = async (e) => {
    const searchTerm = e.target.value;
    setSearchUser(searchTerm);
    if (searchTerm?.length) {
      if (searchTerm?.length > 2) setIsSearchActive(true);
      if (searchTerm?.length == 2) setCurrentPage(1);
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
          placeholder="جستجوی کاربر"
          value={searchUser}
          onChange={searchUserHandler}
          className="w-full h-full pl-4 outline-none placeholder-gray-500 text-sm"
        />
      </div>

      {loading ? (
        <GlobalLoading />
      ) : (
        <div className="w-full flex flex-col gap-2 p-4">
          {searchUser && users?.length > 0 ? (
            users?.map((item) => (
              <div
                key={item._id}
                className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2 border rounded py-2 px-4 "
              >
                <div className="flex justify-start items-center text-gray-600 text-sm line-clamp-1">
                  {item.name.length ? (
                    `${item?.name} ${item?.lastName}`
                  ) : (
                    <span className="text-gray-400"> بدون نام</span>
                  )}
                </div>
                <div className="text-gray-600 text-end sm:text-start">
                  {item?.phone}
                </div>
                <div
                  className={`w-16 py-1 rounded flex justify-center items-center font-bold text-sm text-gray-100 ${
                    item?.role == "admin" ? "bg-green-500" : "bg-blue-600"
                  }`}
                >
                  {item?.role == "admin" ? "ادمین" : "کاربر"}
                </div>

                <div className="flex justify-end sm:justify-start w-full">
                  <Link
                    href={`/dashboard/admin/users-list/${item?._id}`}
                    className="relative cursor-pointer py-1 w-20  text-center font-barlow inline-flex justify-center text-sm font-bold uppercase text-[#7e7e7e] rounded-[8px] border-solid transition-transform duration-300 ease-in-out group outline-offset-4 focus:outline focus:outline-2 focus:outline-white focus:outline-offset-4 overflow-hidden"
                  >
                    <span className="relative z-[2] ">جزئیات کاربر</span>

                    <span className="absolute left-[-75%] top-0 h-full w-[50%] bg-[#7e7e7e44] rotate-12 z-[1] blur-lg group-hover:left-[125%] transition-all duration-1000 ease-in-out"></span>

                    <span className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-[#9b9b9b] absolute h-[20%] rounded-tl-[8px] border-l-2 border-t-2 top-0 left-0"></span>
                    <span className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-[#9b9b9b] absolute group-hover:h-[90%] h-[60%] rounded-tr-[8px] border-r-2 border-t-2 top-0 right-0"></span>
                    <span className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-[#9b9b9b] absolute h-[60%] group-hover:h-[90%] rounded-bl-[8px] border-l-2 border-b-2 left-0 bottom-0"></span>
                    <span className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-[#9b9b9b] absolute h-[20%] rounded-br-[8px] border-r-2 border-b-2 right-0 bottom-0"></span>
                  </Link>
                </div>
              </div>
            ))
          ) : searchUser && users?.length === 0 ? (
            <div className="pb-4 text-sm text-gray-500">کاربری یافت نشد</div>
          ) : users?.length > 0 ? (
            users?.map((item) => (
              <div
                key={item._id}
                className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2 border rounded py-2 px-4 "
              >
                <div className="flex justify-start items-center text-gray-600 text-sm line-clamp-1">
                  {item.name.length ? (
                    `${item?.name} ${item?.lastName}`
                  ) : (
                    <span className="text-gray-400"> بدون نام</span>
                  )}
                </div>
                <div className="text-gray-600 text-end sm:text-start">
                  {item?.phone}
                </div>
                <div
                  className={`w-16 py-1 rounded flex justify-center items-center font-bold text-sm text-gray-100 ${
                    item?.role == "admin" ? "bg-green-500" : "bg-blue-600"
                  }`}
                >
                  {item?.role == "admin" ? "ادمین" : "کاربر"}
                </div>

                <div className="flex justify-end sm:justify-start w-full">
                  <Link
                    href={`/dashboard/admin/users-list/${item?._id}`}
                    className="relative cursor-pointer py-1 w-20  text-center font-barlow inline-flex justify-center text-sm font-bold uppercase text-[#7e7e7e] rounded-[8px] border-solid transition-transform duration-300 ease-in-out group outline-offset-4 focus:outline focus:outline-2 focus:outline-white focus:outline-offset-4 overflow-hidden"
                  >
                    <span className="relative z-[2] ">جزئیات کاربر</span>

                    <span className="absolute left-[-75%] top-0 h-full w-[50%] bg-[#7e7e7e44] rotate-12 z-[1] blur-lg group-hover:left-[125%] transition-all duration-1000 ease-in-out"></span>

                    <span className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-[#9b9b9b] absolute h-[20%] rounded-tl-[8px] border-l-2 border-t-2 top-0 left-0"></span>
                    <span className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-[#9b9b9b] absolute group-hover:h-[90%] h-[60%] rounded-tr-[8px] border-r-2 border-t-2 top-0 right-0"></span>
                    <span className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-[#9b9b9b] absolute h-[60%] group-hover:h-[90%] rounded-bl-[8px] border-l-2 border-b-2 left-0 bottom-0"></span>
                    <span className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-[#9b9b9b] absolute h-[20%] rounded-br-[8px] border-r-2 border-b-2 right-0 bottom-0"></span>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="pb-4 text-sm text-gray-500">
              کاربری برای نمایش وجود ندارد.
            </div>
          )}
        </div>
      )}

      <Pagination
        items={users}
        loading={loading}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default UsersListPage;
