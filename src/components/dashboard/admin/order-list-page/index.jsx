"use client";
import DashboardOrderItem from "@/components/elements/dashboard-order-item";
import GlobalLoading from "@/components/elements/global-loading";
import Pagination from "@/components/elements/pagination";
import {
  setDashboardActiveItem,
  setUserDashboardActiveItem,
} from "@/features/globalSlice";
import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";

const OrderListPage = () => {
  const [orders, setOrders] = useState([]);
  const [searchProduct, setSearchOrders] = useState("");
  const [searchedList, setsearchedList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(-1);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setDashboardActiveItem({
        title: "لیست سفارش ها",
        link: "order-list",
      })
    );
  }, []);
  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/order/all-orders?page=${currentPage}&limit=${ordersPerPage}&query=${searchProduct}`
      );
      const data = await response.json();

      if (response.ok) {
        setOrders(data?.data?.sendOrders);
        console.log(data?.data?.sendOrders);
        setTotalPages(data?.data?.totalPages);
        setTotalOrders(data?.data?.totalOrders || 0);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      // Handle error appropriately, e.g., display an error message
    } finally {
      setLoading(false);
    }
    console.log(isSearchActive);
  }, [currentPage, ordersPerPage, searchedList, isSearchActive, reload]);
  // useEffect برای فراخوانی API
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const searchProductHandler = async (e) => {
    const searchTerm = e.target.value;
    setSearchOrders(searchTerm);
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
          placeholder="جستجوی محصول"
          value={searchProduct}
          onChange={searchProductHandler}
          className="w-full h-full pl-4 outline-none placeholder-gray-500 text-sm"
        />
      </div>

      {loading ? (
        <GlobalLoading />
      ) : (
        <div className="w-full flex flex-col gap-3 p-4">
          {searchProduct && orders?.length > 0 ? (
            orders.map((item) => (
              <DashboardOrderItem
                key={item._id}
                data={item}
                reload={reload}
                setReload={setReload}
                rolePath={"admin"}
              />
            ))
          ) : searchProduct && orders?.length === 0 ? (
            <div className="pb-4 text-sm text-gray-500">محصولی یافت نشد</div>
          ) : orders?.length > 0 ? (
            orders.map((item) => (
              <DashboardOrderItem
                key={item._id}
                data={item}
                reload={reload}
                setReload={setReload}
                rolePath={"admin"}
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
        items={orders}
        loading={loading}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default OrderListPage;
