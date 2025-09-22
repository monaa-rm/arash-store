import ProductRating from "@/components/elements/product-rating";
import { LiaUserCircle } from "react-icons/lia";
import { FaUserCircle } from "react-icons/fa";
import { getJalaliDate } from "@/utiles/utils-func";
import { AiOutlineDelete } from "react-icons/ai";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

const UsersComments = ({ comments, setComments }) => {
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();

  const cmDeleteHandler = async (id) => {
    setLoading(id);
    if (status == "unauthenticated" || session?.user?.role !== "admin") return;
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
  if (comments?.length == 0)
    return (
      <div className="p-4 text-zinc-600 text-sm">
        هیج دیدگاهی برای این محصول ثبت نشده است.
      </div>
    );
  return (
    <div className="w-full flex flex-col py-4 gap-2">
      {comments?.map((comment, i) => (
        <div
          key={comment?._id}
          className={`flex flex-col gap-4 py-2  ${
            i !== comments?.length - 1 && "border-b"
          }`}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-1">
            <div className="flex justify-start items-center gap-2">
              <FaUserCircle className="w-8 h-8 text-zinc-300" />
              <span className="font-bold">{comment?.name}</span>
            </div>
            <div className="w-24">
              <ProductRating readOnly={true} rating={comment?.rating} />
            </div>
          </div>
          <p className="text-sm text-zinc-600">{comment?.text}</p>
          <div className="flex justify-end items-center gap-4">
            {session?.user?.role == "admin" ? (
              <div
                onClick={() => cmDeleteHandler(comment?._id)}
                className="text-zinc-400 h-6 flex items-center justify-center bg-zinc-200  rounded w-24  relative hover:bg-zinc-300 active:text-white active:bg-zinc-400 transition-all duration-300 ease-in-out text-xs cursor-pointer"
              >
                حذف دیدگاه
                {loading == comment?._id ? (
                  <Image
                    src={"/images/spinner.svg"}
                    alt="spinner"
                    width={25}
                    height={25}
                    className=""
                  />
                ) : null}
              </div>
            ) : (
              <></>
            )}

            <span className="text-zinc-400 text-end text-sm">
              {getJalaliDate(comment?.createdAt)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UsersComments;
