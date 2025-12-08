"use client";
import DashboardOrderItem from "@/components/elements/dashboard-order-item";
import GlobalLoading from "@/components/elements/global-loading";
import Pagination from "@/components/elements/pagination";
import { setUserDashboardActiveItem } from "@/features/globalSlice";
import { useSession } from "next-auth/react";
import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";

const UserOrdersPage = () => {
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
  const { data: session } = useSession();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setUserDashboardActiveItem({
        title: "لیست سفارش ها",
        link: "order-list",
      })
    );
  }, []);
  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/order/user-orders?page=${currentPage}&limit=${ordersPerPage}`
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
  }, [currentPage, ordersPerPage, reload]);
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
      {loading ? (
        <GlobalLoading />
      ) : (
        <div className="w-full flex flex-col gap-3 p-4">
          {orders?.length === 0 ? (
            <div className="pb-4 text-sm text-gray-500">محصولی یافت نشد</div>
          ) : orders?.length > 0 ? (
            orders.map((item) => (
              <DashboardOrderItem
                key={item._id}
                data={item}
                reload={reload}
                setReload={setReload}
                rolePath={"user"}
              />
            ))
          ) : (
            <GlobalLoading />
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

export default UserOrdersPage;
