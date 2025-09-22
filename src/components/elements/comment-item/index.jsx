import { useState } from "react";
import { CiMail } from "react-icons/ci";
import { FaAngleDoubleLeft, FaAngleDown } from "react-icons/fa";
import { MdDeleteForever, MdMailOutline } from "react-icons/md";
import ProductRating from "../product-rating";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { slugify } from "@/utiles/utils-func";

const CommentItem = ({ item, comments, setComments }) => {
  const [showmore, setShowmore] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();
  const prdslug = slugify(item?.productDetails?.title);
  const cmDeleteHandler = async (id) => {
    if (status == "unauthenticated" || loading) return;
    setLoading(id);
    console.log("start deleting");
    try {
      const res = await fetch(`/api/comment/delete/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        console.log(data);
        // setFinallyText(data?.error);
        const copyCms = [...comments];
        const newComments = copyCms.filter((item) => item._id !== id);
        setComments(newComments);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full p-4 flex flex-col gap-4 rounded border text-sm relative">
      <div
        onClick={() => cmDeleteHandler(item?._id)}
        className="absolute left-4 top-4 w-5 h-5 flex text-center items-center
       text-gray-500 cursor-pointer active:bg-blue-600 rounded bg-zinc-200 hover:bg-blue-500
        hover:text-white transition-all duration-300"
      >
        <MdDeleteForever className={`${loading ? "hidden" : "flex"} w-5 h-5`} />
        <Image
          src={"/images/spinner.svg"}
          alt="spinner"
          fill
          className={`${loading ? "flex" : "hidden"}`}
        />
      </div>
      <h3 className="text-gray-600 font-bold">{item?.name}</h3>

      <div
        onClick={() => setShowmore(!showmore)}
        className="flex flex-col gap-2 text-gray-500 items-start "
      >
        <p
          className={` ${
            showmore ? "line-clamp-none" : "line-clamp-3"
          } cursor-pointer h-auto  transition-all duration-500`}
        >
          {item.text}
        </p>
      </div>
      <div className=" text-gray-500 text-xs  flex items-center justify-between flex-wrap">
        <div className="w-20">
          <ProductRating rating={item?.rating} readOnly={true} />
        </div>
        <div className="flex justify-end items-center gap-1 text-xs">
          {item?.email} <CiMail className="w-5 h-5" />
        </div>
      </div>
      <Link
        href={`/products/${item?.productDetails?._id}/${prdslug}`}
        className="p-1 rounded bg-zinc-100 flex justify-start items-center  gap-2 text-gray-400 hover:pr-2 transition-all duration-300 line-clamp-1"
      >
        <FaAngleDoubleLeft className="w-3 h-3" />
        {item?.productDetails?.title}
      </Link>
    </div>
  );
};

export default CommentItem;
