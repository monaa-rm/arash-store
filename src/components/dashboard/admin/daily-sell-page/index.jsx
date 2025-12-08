"use client";
import GlobalLoading from "@/components/elements/global-loading";
import Pagination from "@/components/elements/pagination";
import { setDashboardActiveItem } from "@/features/globalSlice";
import {
  convertGregorianToPersian,
  formatNumberToPersian,
} from "@/utiles/utils-func";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";

const DailySellpage = () => {
  const [ordersByDate, setOrdersByDate] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(50);
  // const [totalOrders, setTotalOrders] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(-1);
  const path = usePathname();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setDashboardActiveItem({
        title: "فروش روزانه",
        link: "daily-sell",
      })
    );
  }, [path]);
  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/order/daily-sell?page=${currentPage}&limit=${perPage}`
      );
      const data = await response.json();

      if (response.ok) {
        console.log(data?.data?.ordersByDate);
        setOrdersByDate(data?.data?.ordersByDate);
        setTotalPages(data?.data?.totalPages);
        // setTotalOrders(data?.data?.totalOrders || 0);
      }
    } catch (error) {
      console.error("Failed to fetch ordersByDate:", error);
      // Handle error appropriately, e.g., display an error message
    } finally {
      setLoading(false);
    }
  }, [currentPage, perPage, reload]);
  // useEffect برای فراخوانی API
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <div className="w-full lg:pl-2">
      {loading ? (
        <GlobalLoading />
      ) : (
        <div
          className="w-full flex flex-col py-4 p-0
text-gray-700 "
        >
          {ordersByDate?.length === 0 ? (
            <div className="pb-4 text-sm text-gray-500">محصولی یافت نشد</div>
          ) : ordersByDate?.length > 0 ? (
            <table className={` w-full table-fixed border rounded-[8px]`}>
              <thead
                className={`h-8 w-full bg-gray-200 text-xs font-bold p-2 `}
              >
                <tr className="w-full">
                  <th className="border-l border-gray-300 w-14 sm:w-20 lg:w-28 ">
                    تاریخ
                  </th>
                  <th className="border-l border-gray-300">نام خانوادگی</th>
                  <th className="border-l border-gray-300">شهر</th>
                  <th className="border-l border-gray-300">
                    قیمت <span className="text-[8px]">(تومان)</span>
                  </th>
                  <th className="border-gray-300 w-12">جزئیات</th>
                </tr>
              </thead>
              {ordersByDate?.map((item) => (
                <tbody
                  key={item?._id}
                  className=" w-full text-[8px] sm:text-xs md:text-sm "
                >
                  {item?.orders?.map((order, i) => (
                    <tr
                      className="w-full border-b border-gray-300"
                      key={order?._id}
                    >
                      <td className="p-0.5 sm:p-1 w-14 sm:w-20 lg:w-28 border-l text-center flex justify-center  border-gray-300">
                        {convertGregorianToPersian(item?._id)?.persianDate}
                      </td>
                      <td className="p-0.5 text-center w-full sm:p-1 border-l border-gray-300 overflow-hidden">{` ${order?.lastName}`}</td>
                      <td className="p-0.5 text-center sm:p-1 border-l border-gray-300">
                        {order?.city?.name}
                      </td>
                      <td className="p-0.5 text-center sm:p-1 border-l border-gray-300">
                        {formatNumberToPersian(Number(order?.allCost))}
                      </td>
                      <td className="p-0.5 text-center sm:p-1border-gray-300">
                        <Link
                          href={`/dashboard/admin/order-list/${order?._id}`}
                          className="flex justify-center items-center"
                        >
                          <svg className="hover:text-blue-600 w-3 h-3 transition-all duration-300">
                            <use href="/sprite.svg#see_icon" />
                          </svg>
                        </Link>
                      </td>
                    </tr>
                  ))}
                  <tr className="w-full border-b bg-blue-50 border-gray-300">
                    <td className="p-0.5 sm:p-1 w-14 sm:w-20 lg:w-28 border-l text-center flex justify-center  border-gray-300">
                      {convertGregorianToPersian(item?._id)?.persianDate}
                    </td>
                    <td className="p-0.5 text-center sm:p-1 border-l border-gray-300"></td>
                    <td className="p-0.5 text-center sm:p-1 border-l border-gray-300"></td>
                    <td className="p-0.5 text-center sm:p-1 border-l border-gray-300 font-bold">
                      {formatNumberToPersian(item?.dailyTotalCost?.toString())}
                    </td>
                    <td className="border-gray-300 w-12"></td>
                  </tr>
                </tbody>
              ))}
            </table>
          ) : (
            <div className="pb-4 text-sm text-gray-500">
              محصولی برای نمایش وجود ندارد.
            </div>
          )}
        </div>
      )}

      <Pagination
        items={ordersByDate}
        loading={loading}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default DailySellpage;
