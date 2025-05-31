"use client";
import Image from "next/image";
import { RiDeleteBin5Fill } from "react-icons/ri";

const EditImages = ({ images }) => {
  return (
    <div className="w-full  flex flex-col gap-2 ">
      <h3 className="py-2 font-bold">عکس های انتخاب شده</h3>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {images?.map((img, i) => (
          <div
            key={i}
            className="flex justify-center items-center py-2 md:py-4"
          >
            <div className="w-72 h-72 rounded-lg relative">
              <Image
                fill
                src={img}
                alt={img || "image"}
                className="object-cover rounded-lg"
              />
               <div className="w-7 h-7 absolute bottom-2 right-2 group flex justify-center items-center rounded-lg bg-rose-700 hover:bg-rose-800 hover:w-8 hover:h-8 cursor-pointer  transition-all duration-300 ease-in-out ">
                    <RiDeleteBin5Fill
                      className={`w-5 h-5 transition-all duration-300 ease-in-out text-white`}
                    />
                  </div>
            
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditImages;
