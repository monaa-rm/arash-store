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
import YourOrdersItem from "@/components/elements/your-orders-item";
import { IoInformationCircle } from "react-icons/io5";

const YourOrders = ({cost, setCost}) => {
  const [orders, setOrders] = useState([]);
  const [draftOrders, setDraftOrders] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showDeleteAll, setShowDeleteAll] = useState(false);

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
  // const deleteAllHandler = () => {
  //   try {
  //     localStorage.removeItem("orders");
  //     dispatch(setOrderProducts([]));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const finishOrdersHandler = () => {
  //   if (status == "authenticated") {
  //     router.push("/checkout");
  //   } else {
  //     dispatch(setShowLoginBox(true));
  //   }
  // };
  return (
    <div className="w-full pt-4 flex flex-col gap-2 pb-12 ">
      <div className="flex gap-1 text-sm pt-2  pb-0.5  border-b relative ">
        <div className="absolute bottom-0 h-1 rounded-full w-20 bg-blue-500"></div>
        <h1 className="font-bold text-base pb-0.5">سفارش شما</h1>
      </div>
      {loading && !orders?.length ? <GlobalLoading /> : <></>}
      <div className="w-full flex gap-2 relative pt-2">
        <div className="flex flex-col md:grid md:grid-cols-2 gap-1 md:gap-4 w-full">
          {showPriceGlobal ? (
            <>
              {/* <div className="flex justify-between items-center gap-2 text-gray-500">
                <div className="flex gap-1 text-sm pt-1 py-2 ">
                  <span className="font-bold">سبد خرید شما</span>
                  <span className="text-gray-500">.</span>
                  <span className="text-gray-500">
                    {showPriceGlobal ? orderProducts.length : "0"} مرسوله
                  </span>
                </div>
  
              </div> */}
              {!loading && orders?.length ? (
                <>
                  {orders?.map((order) => (
                    <YourOrdersItem
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
      </div>
      <div className="flex font-bold text-sm md:text-base gap-2 border-t-2 py-4">
        <span className="">مجموع قیمت سفارش:</span>
        <div className="flex justify-end items-center gap-0.5 text-gray-700">
          {formatNumberToPersian(cost)}
          <span className="text-xs text-gray-500">تومان</span>
        </div>
      </div>
    </div>
  );
};

export default YourOrders;
