import ProductRating from "@/components/elements/product-rating";
import { LiaUserCircle } from "react-icons/lia";
import { FaUserCircle } from "react-icons/fa";

const UsersComments = ({ comments }) => {
  if (comments?.length == 0)
    return (
      <div className="p-4 text-zinc-600 text-sm">
        هیج دیدگاهی برای این محصول ثبت نشده است.
      </div>
    );
  return (
    <div className="w-full flex flex-col py-4 gap-2">
      {comments?.map((comment,i) => (
        <div key={comment?.id} className={`flex flex-col gap-4 py-2  ${i !== comments?.length -1 && "border-b"}`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-1">
            <div className="flex justify-start items-center gap-2">
              <FaUserCircle className="w-8 h-8 text-zinc-300" />
              <span className="font-bold">{comment?.nickname}</span>
            </div>
            <div className="w-24">
              <ProductRating readOnly={true} rating={comment?.rating} />
            </div>
          </div>
          <p className="text-sm text-zinc-600">{comment?.message}</p>
          <span className="text-zinc-400 text-end text-sm">
            {" "}
            {comment?.date}
          </span>
        </div>
      ))}
    </div>
  );
};

export default UsersComments;
