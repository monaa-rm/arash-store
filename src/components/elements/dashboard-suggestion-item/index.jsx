"use client";
import Image from "next/image";
import Link from "next/link";
import { LuBoxes } from "react-icons/lu";
import { formatNumberToPersian, slugify } from "@/utiles/utils-func";
import { FaCheck } from "react-icons/fa";

import { useRouter } from "next/navigation";
import { IoAdd } from "react-icons/io5";
import { useState } from "react";
import { useSession } from "next-auth/react";

const DashboardSuggestionItem = ({ item, reload, setReload }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const prdslug = slugify(item?.title);
  const { data: session } = useSession();
  const suggestionHandler = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/product/suggest/${item._id}`, {
        method: "PATCH",
        body: JSON.stringify({ user: session?.user }),
        headers: { "Content-Type": "application/json" },
      });
      console.log({ res });
      if (res.ok) {
        setReload(reload * -1);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id={`DashboardSuggestionItem${item?._id}`}
      className="group relative w-full h-72 flex justify-center items-center  [perspective:1000px]"
    >
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
              href={`/products/${item?._id}/${prdslug}`}
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
                  {item?.instock} {item?.unit} در انبار
                </span>
              )}
            </div>
            <div className="flex justify-between items-center gap-2  pt-2">
              <div className="h-8 gap-2 flex justify-center items-center">
                <div
                  onClick={() => suggestionHandler()}
                  className={`w-7 h-7 group flex justify-center items-center rounded-[8px] text-sm
                    ${
                      item?.suggest
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-orange-700 hover:bg-orange-800"
                    }  hover:w-8 hover:h-8 cursor-pointer  transition-all
                      duration-300 ease-in-out `}
                >
                  {item?.suggest ? (
                    <FaCheck
                      className={`w-5 h-5  transition-all duration-300 ease-in-out text-white`}
                    />
                  ) : (
                    <IoAdd
                      className={`w-5 h-5  transition-all duration-300 ease-in-out text-white`}
                    />
                  )}
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

export default DashboardSuggestionItem;
