"use client";
import DashboardOrderItem from "../dashboard-order-item";
import OrderSingleItem from "../order-single-item";

const UserListSinglePage = ({ user, orders }) => {
  return (
    <div className="w-full flex flex-col gap-4 px-4 lg:px-0">
      <div className="w-full grid grid-cols-1 sm:grid-cols-4 gap-2 border-b  py-2  ">
        <div className="flex justify-start items-center text-gray-600 text-sm font-bold col-span-2">
          {user?.name.length ? (
            `${user?.name} ${user?.lastName}`
          ) : (
            <span className="text-gray-400"> بدون نام</span>
          )}
        </div>
        <div className="text-gray-600 ">{user?.phone}</div>
        <div
          className={`w-16 py-1 rounded flex justify-center items-center font-bold text-sm text-gray-100 ${
            user?.role == "admin" ? "bg-green-500" : "bg-blue-600"
          }`}
        >
          {user?.role == "admin" ? "ادمین" : "کاربر"}
        </div>
      </div>
      <div className="w-full flex flex-col gap-2">
        <h1 className="font-bold text-gray-700 ">سفارش ها</h1>
        <div className="flex flex-col gap-4">
         {orders?.map((order) => (
            <DashboardOrderItem  data={order} key={order?._id} />
          ))} 
        </div>
      </div>
    </div>
  );
};

export default UserListSinglePage;
