"use client";
import Image from "next/image";
import Link from "next/link";
import { formatNumberToPersian } from "@/utiles/utils-func";
import { useEffect, useState } from "react";

import InputTextSection from "../input-text-section";
import { useSession } from "next-auth/react";

const DashboardStockPriceItem = ({ item, reload, setReload }) => {
  const [openBox, setOpenBox] = useState(false);
  const [productStock, setProductStock] = useState(item?.instock || 0);
  const [productCost, setProductCost] = useState(item?.price.howMuch || 0);
  const [finallyText, setFinallyText] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
      const persianNumbers = [
      /۰/g,
      /۱/g,
      /۲/g,
      /۳/g,
      /۴/g,
      /۵/g,
      /۶/g,
      /۷/g,
      /۸/g,
      /۹/g,
    ];
    const arabicNumbers = [
      /٠/g,
      /١/g,
      /٢/g,
      /٣/g,
      /٤/g,
      /٥/g,
      /٦/g,
      /٧/g,
      /٨/g,
      /٩/g,
    ];
  useEffect(() => {
    const handleClick = (event) => {
      if (!event.target.closest(`#DashboardStockPriceItem${item?._id}`)) {
        setOpenBox(false);
      }
    };

    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, []);

    const productCostHandler = (value) => {
    setFinallyText("");

    if (!value) {
      setProductCost(0);
      return;
    }
    let englishValue = value;
    for (let i = 0; i < 10; i++) {
      englishValue = englishValue
        .replace(persianNumbers[i], i)
        .replace(arabicNumbers[i], i);
    }

    // --- 2️⃣ حذف هر چیزی به جز عدد و علامت منفی ---
    let newvalue = englishValue.replace(/[^0-9]/g, "");

    // --- 3️⃣ قبول فقط یک صفر ---
    if (newvalue === "00") {
      newvalue = "0";
    }

    // --- 4️⃣ حذف صفر ابتدایی اگر عدد دیگری بعد از آن وارد شود ---
    if (newvalue.length > 1 && newvalue.startsWith("0")) {
      newvalue = newvalue.substring(1);
    }

    // --- 5️⃣ به‌روزرسانی state ---
    setProductCost(newvalue);
  };
    const productStockHandler = (value) => {
    setFinallyText("");

    if (!value) {
      setProductStock(0);
      return;
    }

    let englishValue = value;
    for (let i = 0; i < 10; i++) {
      englishValue = englishValue
        .replace(persianNumbers[i], i)
        .replace(arabicNumbers[i], i);
    }

    // --- 2️⃣ حذف هر چیزی به جز عدد و علامت منفی ---
    let newvalue = englishValue.replace(/[^0-9]/g, "");

    // قبول فقط یک صفر
    if (newvalue === "00") {
      newvalue = "0";
    }

    // حذف صفر ابتدایی اگر عدد دیگری بعد از آن وارد شود
    if (newvalue.length > 1 && newvalue.startsWith("0")) {
      newvalue = newvalue.substring(1);
      console.log(newvalue);
      return newvalue;
    }
    setProductStock(newvalue);
  };
  const changeItemshandler = async (value) => {
    try {
      setLoading(true);
      const formData = {
        newprice: productCost,
        newstock: productStock,
        session: session?.user,
      };
      console.log(formData);
      const res = await fetch(`/api/stock-price/${item?._id}`, {
        method: "PATCH",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });
      const errorData = await res.json();
      if (!res.ok) {
        console.log("inja");
        setFinallyText(errorData.error || "خطایی رخ داده است");
      } else {
        setReload(reload * -1);
        setFinallyText("");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      setFinallyText("خطایی رخ داده است");
    }
  };
  
  return (
    <div
      id={`DashboardStockPriceItem${item?._id}`}
      className="group relative w-full h-72 flex justify-center items-center  [perspective:1000px]"
    >
      <div
        className={`absolute flex justify-center items-center duration-1000 w-full h-full [transform-style:preserve-3d] ${
          openBox && " [transform:rotateX(180deg)]"
        } `}
      >
        {/* main section */}
        <div className=" absolute w-full overflow-hidden max-w-[260px] border rounded-2xl hover:shadow-md transition-all duration-500 h-72 ">
          <div className="w-full h-44 relative">
            <Image
              src={item?.imageSrc[0]?.file}
              fill
              sizes="256px"
              className="object-fill"
              alt={item?.imageSrc[0]?.file}
            />
            <div className="absolute left-0 bottom-0 bg-gradient-to-r from-white to-transparent min-w-20 px-2 text-left rounded-r-full text-gray-700 font-bold text-sm ">
              {item?.productId}
            </div>
          </div>
          <div className="w-full flex flex-col gap-1 p-2">
            <Link
              href={`/dashboard/admin/edit-product/${item._id}`}
              className=" cursor-pointer font-bold text-sm line-clamp-1 "
            >
              {item?.title}
            </Link>
            <div className="flex justify-start items-center gap-1 pt-3">
              <svg
                className={`w-4 h-4 ${
                  item?.instock == 0 ? "text-rose-600" : "text-blue-400"
                } `}
              >
                <use href="/sprite.svg#instock_icon" />
              </svg>
              {item?.instock == 0 ? (
                <span className="text-xs text-rose-600">ناموجود</span>
              ) : (
                <span className="text-xs text-zinc-500">
                  {item?.instock} در انبار
                </span>
              )}
            </div>
            <div className="flex justify-between items-center gap-2  pt-2">
              <div className="h-8 gap-2 flex justify-center items-center">
                <div
                  onClick={() => setOpenBox(true)}
                  className="w-7 h-7 group flex justify-center items-center rounded-[8px] bg-violet-700 hover:bg-violet-800  cursor-pointer  transition-all duration-300 ease-in-out "
                >
                                   <svg
                                    className={`w-5 h-5  transition-all duration-300 ease-in-out text-white`}

                  >
                    <use href="/sprite.svg#dollar_icon" />
                  </svg>
                </div>
              </div>
              <div className="flex justify-center items-center gap-1">
                <span className="font-bold text-sm">
                  {formatNumberToPersian(item?.price?.howMuch)}
                </span>
                <span className="text-zinc-500 text-xs">تومان</span>
              </div>
            </div>
          </div>
        </div>
        {/* change in sock and price */}
        <div className="absolute w-full overflow-hidden max-w-[260px] border rounded-2xl hover:shadow-md transition-all duration-500 h-72  bg-gradient-to-br from-white to-gray-200  p-6 text-white [transform:rotateX(180deg)] [backface-visibility:hidden]">
          <div className="flex flex-col w-full h-full">
            <div
              onClick={() => setOpenBox(false)}
              className=" w-9 h-7 flex items-center justify-center cursor-pointer rounded-[8px] bg-blue-700 hover:bg-blue-800 transition-all duration-300 ease-in-out "
            >
                 <svg
                    className="w-7 h-7 text-white rotate-180"
                  >
                    <use href="/sprite.svg#item_arrow_left" />
                  </svg>
            </div>
            <div className="flex-grow w-full pt-4 flex flex-col gap-6 text-blue-950 font-bold">
              <p className="text-sm line-clamp-2">{item?.title}</p>
              <InputTextSection
                id={`productStock${item?._id}`}
                name={`productStock${item?._id}`}
                value={productStock}
                type="text"
                setValue={productStockHandler}
                label={"موجودی"}
                finallyText={finallyText}
                setFinallyText={setFinallyText}
              />
              <InputTextSection
                id={`productCost${item?._id}`}
                name={`productCost${item?._id}`}
                value={productCost}
                type="text"
                setValue={productCostHandler}
                label={"قیمت"}
                finallyText={finallyText}
                setFinallyText={setFinallyText}
              />
              <div className="flex justify-center items-center ">
                <button
                  onClick={() => changeItemshandler()}
                  className=" font-bold w-32 h-10 rounded bg-blue-600 text-white relative overflow-hidden group z-10 hover:text-white duration-1000"
                >
                  <span className="absolute bg-blue-700 w-40 h-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
                  <span className="absolute bg-blue-800 w-40 h-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
                  <div className="flex justify-center w-full items-center gap-2">
                    ویرایش
                    {loading ? (
                      <Image
                        src={"/images/spinner.svg"}
                        alt="spinner"
                        width={25}
                        height={25}
                      />
                    ) : null}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${
          finallyText.length
            ? "flex text-rose-600 text-sm text-center pt-2"
            : "hidden"
        }`}
      >
        {finallyText}
      </div>
    </div>
  );
};

export default DashboardStockPriceItem;
