import Image from "next/image";
import { MdZoomOutMap } from "react-icons/md";
import { IoIosHeartEmpty, IoIosSearch, IoMdHeartEmpty } from "react-icons/io";
import arashstore from "../../../assets/images/arashstore.png";
import { HiOutlineEye } from "react-icons/hi";
import Link from "next/link";

const BestSellerSliderLastItem = ({ sliderTitle, clickHandler }) => {
  return (
    <div className="div h-72 cursor-pointer w-56 bg-gray-100 flex m-auto rounded-[1em] overflow-hidden relative group p-2 z-0">
      <div className="circle absolute h-[8em] w-[8em] -bottom-[2.5em] bg-blue-700 -right-[2.5em] rounded-full bg-gr blur-sm group-hover:scale-[900%] duration-500 z-[-1] op"></div>

      <button className="text-[0.8em] absolute bottom-[1em] left-[1em] text-blue-700 group-hover:text-[white] duration-500">
        <Link href={"/"}>
          <span className="relative before:h-[0.16em] before:absolute before:w-full before:content-[''] before:bg-blue-700 group-hover:before:bg-[white] duration-300 before:bottom-0 before:left-0">
            فروشگاه آرش
          </span>
        </Link>
        <i className="fa-solid fa-arrow-right"></i>
      </button>

      <div
        onClick={() => clickHandler()}
        dir="rtl"
        className="z-20 w-full  text-blue-600 flex items-center justify-center gap-2 font-bold font-Poppin bg group-hover:text-white duration-500 text-[1.4em]"
      >
        <span>مشاهده همه </span>
        <HiOutlineEye className="w-6 h-6 text-blue-600 group-hover:text-white " />
      </div>
    </div>
  );
};

export default BestSellerSliderLastItem;
