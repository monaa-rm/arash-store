"use client";
import { getJalaliDate } from "@/utiles/utils-func";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";

const AdminBlogItem = ({ blog, reload, setReload }) => {
  const [showRemoveBox, setShowRemoveBox] = useState(false);
  const [itemToRemove, setItemToRemove] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const handleClick = (event) => {
      if (!event.target.closest(`blogItemAdmin${blog?._id}`)) {

       !loading && setShowRemoveBox(false);
      }
    };

    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, []);

  const deleteBlogHandler = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/blog/delete-blog/${itemToRemove}`, {
        method: "DELETE",
      });
      const dataErr = await res.json();
      console.log({ res });
      if (res.ok) {
        setReload(reload * -1);
      } else {
        console.log(dataErr?.error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setShowRemoveBox(false);
      setItemToRemove(null);
    }
  };
  return (
    <div className={`w-full h-[380px] flex justify-center items-center `}>
      <div className="relative w-full max-w-[320px] sm:w-[330px] h-[380px] flex flex-col gap-3 overflow-hidden rounded-2xl shadow-lg bg-zinc-100 shadow-zinc-200 ">
        <div className="relative w-full h-[150px]">
          <Image
            src={blog?.imageSrc}
            alt={blog?.imageSrc}
            fill
            className="object-cover"
          />
        </div>
        <div className="px-4 flex flex-col gap-4 ">
          <Link
            href={`/blogs/${blog?._id}`}
            className="line-clamp-2 hover:text-blue-800 transition-all duration-300 text-lg font-[vazirmedium]  "
          >
            {blog?.title}
          </Link>
          <p className="text-zinc-400 line-clamp-4 text-sm  text-justify">
            {blog?.description}
          </p>
        </div>
        <div className="w-full h-10 absolute bottom-0 flex justify-between items-center px-4 py-2 border-t border-blue-300 text-zinc-500 text-sm">
          {getJalaliDate(blog?.createdAt)}
          <div className="w-7 h-7 group flex justify-center items-center rounded-lg bg-rose-700 hover:bg-rose-800 hover:w-8 hover:h-8 cursor-pointer  transition-all duration-300 ease-in-out ">
            <RiDeleteBin5Fill
              onClick={() =>{ setShowRemoveBox(true); setItemToRemove(blog?._id)}}
              className={`w-5 h-5 transition-all duration-300 ease-in-out text-white`}
            />
          </div>
          <div
            id={`blogItemAdmin${blog?._id}`}
            className={`absolute w-40 bg-white border rounded-lg ${
              showRemoveBox
                ? "bottom-10 left-2 opacity-100"
                : "bottom-auto left-auto opacity-0 pointer-events-none"
            }  flex flex-col gap-2 p-4 `}
          >
            {loading ? (
              <div className="px-3 py-2 flex justify-center items-center gap-2">
                در حال حذف
                <Image
                  src={"/images/spinner.svg"}
                  alt="spinner"
                  width={25}
                  height={25}
                />
              </div>
            ) : (
              <>
                <span>پاک شود؟</span>
                <div className={`flex justify-center items-baseline gap-4`}>
                  <div className="flex justify-center gap-4 items-center w-full  ">
                    <button
                      onClick={() => deleteBlogHandler()}
                      className=" font-bold w-28 h-8 rounded bg-green-600 text-white relative overflow-hidden group z-[1] hover:text-white duration-1000"
                    >
                      <span className="absolute bg-green-700 w-40 h-36 rounded-full group-hover:scale-100 scale-0 -z-[1] -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
                      <span className="absolute bg-green-800 w-40 h-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-[1] group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
                      بله
                    </button>
                    <button
                      onClick={() => setShowRemoveBox(false)}
                      className=" font-bold w-28 h-8 rounded bg-rose-600 text-white relative overflow-hidden group z-[1] hover:text-white duration-1000"
                    >
                      <span className="absolute bg-rose-700 w-40 h-36 rounded-full group-hover:scale-100 scale-0 -z-[1] -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
                      <span className="absolute bg-rose-800 w-40 h-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-[1] group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
                      خیر
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBlogItem;
