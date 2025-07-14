import Image from "next/image";
import Link from "next/link";
import { CgArrowLeft } from "react-icons/cg";
import FilterRemoteItemSeeAll from "../filter-remote-item-see-all";
import Category from "../../../../models/Category";

const FilterRemoteItem = async ({
  title,
  img,
  altImage,
  linkCategory,
  linkTilte,
  bgColor,
}) => {
  const cat = await Category.findOne({ link: linkCategory });
  return (
    <div className="w-full md:w-1/3 flex justify-center items-center">
      <div
        className={`w-full  h-60  duration-500 group overflow-hidden relative rounded-2xl  ${bgColor} text-neutral-50 p-6 md:p-2 lg:p-6 flex flex-col justify-evenly`}
      >
        <div className="absolute blur duration-500 group-hover:blur-none w-72 h-72 rounded-full group-hover:translate-x-12 group-hover:translate-y-12 bg-sky-900 right-1 -bottom-24"></div>
        <div className="absolute blur duration-500 group-hover:blur-none w-12 h-12 rounded-full group-hover:translate-x-12 group-hover:translate-y-2 bg-indigo-700 right-12 bottom-12"></div>
        <div className="absolute blur duration-500 group-hover:blur-none w-36 h-36 rounded-full group-hover:translate-x-12 group-hover:-translate-y-12 bg-indigo-800 right-1 -top-12"></div>
        <div className="absolute blur duration-500 group-hover:blur-none w-24 h-24 bg-sky-700 rounded-full group-hover:-translate-x-12"></div>
        <div className="z-[1]   flex justify-between items-center w-full h-full">
          <div className="w-full h-full flex flex-col justify-end md:justify-center lg:justify-end gap-4 pb-6 ">
            <span className=" text-3xl md:text-2xl lg:text-3xl font-bold">
              {title}
            </span>
            <button
              className="h-fit w-fit px-[1em] py-[0.25em] border-[1px] rounded-full flex 
    justify-center items-center gap-[0.5em] overflow-hidden group hover:translate-y-[0.125em]
     duration-200 backdrop-blur-[12px]"
            >
              <FilterRemoteItemSeeAll cat={JSON.parse(JSON.stringify(cat))} />
              <CgArrowLeft className="md:hidden lg:block" />
            </button>
          </div>
          <div className="w-1/2 h-full relative">
            <Image src={img} fill alt={altImage} className="object-contain" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterRemoteItem;
