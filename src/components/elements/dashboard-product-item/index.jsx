"use client";
import Image from "next/image";
import Link from "next/link";
import { LuBoxes } from "react-icons/lu";
import { formatNumberToPersian } from "@/utiles/utils-func";
import { FaEdit } from "react-icons/fa";

import { RiDeleteBin5Fill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const DashboardProductItem = ({ item, reload, setReload }) => {
  const [deletemsg, setDeletemsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [showRmBox, setShowRmBox] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const handleClick = (event) => {
      if (!event.target.closest(`productToRm${item?._id}`)) {
        setShowRmBox(false);
      }
    };
    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, []);
  const deleteProductHandler = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/product/delete-product/${itemToRemove}`, {
        method: "DELETE",
      });
      const dataErr = await res.json();
      console.log({ res });
      if (res.ok) {
        setReload(reload * -1);
      } else {
        setDeletemsg(dataErr?.error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setShowRmBox(false);
      setItemToRemove(null);
    }
  };
  return (
    <div
      id={`dashboardProductItem${item?._id}`}
      className="group relative w-full h-72 flex justify-center items-center  [perspective:1000px]"
    >
      <div
        id={`productToRm${item?._id}`}
        className={` ${
          showRmBox && itemToRemove == item?._id
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        } w-52 ${
          loading ? "py-4" : "pt-8 pb-4"
        } transition-all duration-300 shadow-lg px-4 rounded-lg border flex flex-col gap-4 bg-white  absolute top-2 left-1/2 -translate-x-1/2  z-[2]`}
      >
        {loading ? (
          <div className="flex justify-center items-center gap-2">
            در حال پاک کردن
            <Image
              src={"/images/spinner.svg"}
              alt="spinner"
              width={25}
              height={25}
              className="text-blue-500 "
            />
          </div>
        ) : (
          <>
            <span>
              آیا از پاک کردن محصول{" "}
              <span className="font-bold"> {item?.title} </span>
              اطمینان دارید؟
            </span>
            <div className=" flex justify-center items-center gap-2">
              <button
                onClick={() => deleteProductHandler()}
                className="relative  w-36 h-8 font-bold rounded-md isolation-auto z-[1] text-white border-2 bg-blue-600 border-blue-500
        before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full
         before:-right-full before:hover:right-0 before:rounded-full  before:bg-blue-950 before:-z-10 
          before:aspect-square before:hover:scale-150 text-sm md:text-base overflow-hidden before:hover:duration-700
           flex justify-center items-center gap-2"
              >
                <span>پاک کردن</span>
              </button>
              <button
                onClick={() => {
                  setShowRmBox(false);
                  setItemToRemove(null);
                }}
                className="relative w-36 h-8 font-bold rounded-md isolation-auto z-[1] text-white border-2 bg-rose-600 border-rose-500
        before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full
         before:-right-full before:hover:right-0 before:rounded-full  before:bg-rose-950 before:-z-10 
          before:aspect-square before:hover:scale-150 text-sm md:text-base  overflow-hidden before:hover:duration-700
           flex justify-center items-center gap-2"
              >
                <span>انصراف</span>
              </button>
            </div>
          </>
        )}
      </div>
      <div
        className={`absolute flex justify-center items-center duration-1000 w-full h-full [transform-style:preserve-3d] `}
      >
        {/* main section */}
        <div className=" absolute w-full overflow-hidden max-w-[260px] border rounded-2xl hover:shadow-md transition-all duration-500 h-72 ">
          <div className="w-full h-44 relative">
            <Image
              src={item?.imageSrc[0]?.file}
              fill
              className="object-fill"
              alt={item?.title}
            />
            <div className="absolute left-0 bottom-0 bg-gradient-to-r from-white to-transparent min-w-20 px-2 text-left rounded-r-full text-gray-700 font-bold text-sm ">
              {item?.productId}
            </div>
          </div>
          <div className="w-full flex flex-col gap-1 p-2">
            <Link
              href={`/dashboard/admin/edit-product/${item?._id}`}
              className=" cursor-pointer font-bold text-sm line-clamp-1 "
            >
              {item?.title}
            </Link>
            <div className="flex justify-start items-center gap-1 pt-3">
              <LuBoxes
                className={`w-4 h-4 ${
                  item?.instock == 0 ? "text-rose-600" : "text-blue-400"
                } `}
              />
              {item?.instock == 0 ? (
                <span className="text-xs text-rose-600">ناموجود</span>
              ) : (
                <span className="text-xs text-zinc-500">
                  {item?.unit} {item?.instock} در انبار
                </span>
              )}
            </div>
            <div className="flex justify-between items-center gap-2  pt-2">
              <div className="h-8 gap-2 flex justify-center items-center">
                <Link
                  href={`/dashboard/admin/edit-product/${item?._id}`}
                  className="w-7 h-7 group flex justify-center items-center rounded-lg bg-orange-700 hover:bg-orange-800 hover:w-8 hover:h-8 cursor-pointer  transition-all duration-300 ease-in-out "
                >
                  <FaEdit
                    className={`w-5 h-5  transition-all duration-300 ease-in-out text-white`}
                  />
                </Link>
                <div
                  onClick={() => {
                    setItemToRemove(item?._id);
                    setShowRmBox(true);
                  }}
                  className="w-7 h-7 group flex justify-center items-center rounded-lg bg-rose-700 hover:bg-rose-800 hover:w-8 hover:h-8 cursor-pointer  transition-all duration-300 ease-in-out "
                >
                  <RiDeleteBin5Fill
                    className={`w-5 h-5 transition-all duration-300 ease-in-out text-white`}
                  />
                </div>
              </div>
              <div className="flex justify-center items-center gap-1">
                <span className="font-bold text-sm">
                  {formatNumberToPersian(item?.price.howMuch)}
                </span>
                <span className="text-zinc-500 text-xs">تومان</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardProductItem;
