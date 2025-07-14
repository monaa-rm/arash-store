"use client";

import OrderItem from "@/components/elements/order-item";
import GlobalLoading from "@/components/elements/global-loading";
import { setOrderProducts } from "@/features/orderSlice";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { HiDotsVertical } from "react-icons/hi";
import { FiDelete } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { formatNumberToPersian } from "@/utiles/utils-func";
import { useSession } from "next-auth/react";
import { setShowLoginBox } from "@/features/globalSlice";
import { useRouter } from "next/navigation";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [draftOrders, setDraftOrders] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showDeleteAll, setShowDeleteAll] = useState(false);
  const [cost, setCost] = useState(0);
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session, status } = useSession();
  const orderProducts =
    useSelector((store) => store.orderSlice.orderProducts) || [];
  const showPriceGlobal =
    useSelector((store) => store.globalSlice.showPriceGlobal) || false;
  useEffect(() => {
    async function fetchOrderProducts() {
      console.log(orderProducts);
      if (orderProducts.length && !draftOrders) {
        try {
          setLoading(true);
          console.log(orderProducts);
          const res = await fetch(`/api/order/getOrders`, {
            method: "POST",
            body: JSON.stringify({ orders: orderProducts }),
            headers: { "Content-Type": "application/json" },
          });
          const data = await res.json();

          console.log(data);
          if (res.ok) {
            if (Array.isArray(data?.localOrders)) {
              localStorage.setItem("orders", JSON.stringify(data?.localOrders));
              setOrders(data?.productsData);
              if (data?.productsData?.length) {
                data?.productsData?.map((order) => {
                  const result = order?.quantity * order?.price;
                  setCost((prev) => {
                    return prev + result;
                  });
                });
              }
              dispatch(setOrderProducts(data?.localOrders));
              if (data?.localOrders.length) setDraftOrders(true);
            }
          }
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
          console.log("loading false");
        }
      } else {
        setLoading(false);
      }
    }
    fetchOrderProducts();
  }, [orderProducts]);

  useEffect(() => {
    const handleClick = (event) => {
      if (!event.target.closest("#deleteAll")) {
        setShowDeleteAll(false);
      }
    };

    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, []);
  const deleteAllHandler = () => {
    try {
      localStorage.removeItem("orders");
      dispatch(setOrderProducts([]));
    } catch (error) {
      console.log(error);
    }
  };
  const finishOrdersHandler = () => {
    if (status == "authenticated") {
      router.push("/checkout");
    } else {
      dispatch(setShowLoginBox(true));
    }
  };
  return (
    <div className="w-full px-4 pt-4 flex flex-col gap-2 pb-12 ">
      <div className="flex gap-1 text-sm pt-2  pb-0.5  border-b relative ">
        <div className="absolute bottom-0 h-1 rounded-full w-20 bg-blue-500"></div>
        <h1 className="font-bold text-lg">سبد خرید </h1>
      </div>
      <div className="w-full flex gap-2 relative pt-2">
        <div className="flex flex-col gap-1 w-full">
          {loading && !orders?.length ? <GlobalLoading /> : <></>}

          {showPriceGlobal ? (
            <>
              <div className="flex justify-between items-center gap-2 text-gray-500">
                <div className="flex gap-1 text-sm pt-1 py-2 ">
                  <span className="font-bold">سبد خرید شما</span>
                  <span className="text-gray-500">.</span>
                  <span className="text-gray-500">
                    {showPriceGlobal ? orderProducts.length : "0"} مرسوله
                  </span>
                </div>
                {orders.length ? (
                  <div className="relative">
                    <HiDotsVertical
                      className="w-5 h-5 cursor-pointer"
                      onClick={() => setShowDeleteAll(true)}
                    />
                    <div
                      id="deleteAll"
                      onClick={() => deleteAllHandler()}
                      className={`absolute z-[4] w-40 bg-white left-4 top-full md:top-[-18px] group px-2 py-3 cursor-pointer border rounded-[8px]
                   flex justify-start items-center gap-1 ${
                     showDeleteAll
                       ? " opacity-100"
                       : " opacity-0 pointer-events-none"
                   } transition-all duration-300`}
                    >
                      <RiDeleteBin5Line className="w-5 h-5 group-hover:text-blue-600" />
                      <span className="text-sm group-hover:text-blue-600">
                        حذف همه
                      </span>
                    </div>
                  </div>
                ) : null}
              </div>
              {!loading && orders?.length ? (
                <>
                  {orders?.map((order) => (
                    <OrderItem
                      setDraftOrders={setDraftOrders}
                      order={order}
                      key={order?._id}
                    />
                  ))}
                </>
              ) : !loading && !orders?.length ? (
                <div className="min-h-96">هیج سفارشی موجود نیست</div>
              ) : null}
            </>
          ) : (
            <div
              className={`${
                !loading && showPriceGlobal
                  ? " opacity-100"
                  : " opacity-0 pointer-events-none"
              } p-4 min-h-96 transition-all duration-1000 `}
            >
              لطفا جهت سفارش تماس بگیرید
            </div>
          )}
        </div>
        {!loading && orders?.length && showPriceGlobal ? (
          <div
            className="w-full z-[5] md:z-0 md:w-[340px] h-20 md:h-40  add_to_cart_button border justify-center items-center md:items-start bg-white  md:rounded-[8px] py-0 md:py-8 px-4 
              fixed md:sticky md:bottom-auto md:top-[222px] lg:top-[190px] flex flex-row-reverse md:flex-col gap-2 md:gap-10 "
          >
            <div className="w-full flex flex-col md:flex-row items-end justify-between md:items-center gap-2">
              <span className="text-xs font-bold">جمع سبد خرید</span>
              <div className="flex justify-end items-center gap-0.5 text-xs text-gray-700">
                {formatNumberToPersian(cost)}
                <span className="text-base"></span> تومان{" "}
              </div>
            </div>
            <button
              disabled={!orders.length || !showPriceGlobal}
              onClick={() => finishOrdersHandler()}
              type="button"
              className="w-full h-10 flex justify-center items-center rounded-[10px]
                   bg-blue-700 hover:bg-blue-800 active:bg-blue-900 transition-all duration-300 text-white"
            >
              تایید و تکمیل سفارش
            </button>
            <div className="text-xs text-gray-400 absolute left-0 right-0 top-full pt-2 text-justify
            ">هزینه این سفارش هنوز پرداخت نشده‌ و در صورت اتمام موجودی، کالاها از سبد حذف می‌شوند</div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default OrdersPage;
