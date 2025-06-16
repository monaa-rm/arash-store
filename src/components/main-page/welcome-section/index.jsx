"use client";
import WelcomeSlider from "@/components/modules/welcomeSlider";
import { setShowPriceGlobal } from "@/features/globalSlice";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const WelcomeSection = ({ data }) => {


  return (
    <section className={`w-full h-[150px] sm:h-[400px] relative`}>
      <WelcomeSlider welcomeImages={data?.welcomeImages} />
      <div className=" w-full absolute top-0 h-full flex justify-center items-center  bg-[rgba(12,0,180,0.32)] bg-opacity-80 ">
        <div className="w-full sm:w-[600px] flex flex-col items-center gap-6 ">
          <p className="text-white font-bold text-2xl sm:text-4xl text-center">
            {data?.welcomeTitle || " به فروشگاه آرش خوش آمدید"}
          </p>
          <p className="font-bold hidden sm:block text-white leading-8 mt-4 text-center">
            {data?.welcomeDescription}
          </p>
          <Link
            href={"/search"}
            className=" sm:flex hidden w-40 h-10 justify-center items-center
            bg-blue-700 hover:bg-blue-800  text-white font-bold rounded-md transition-all duration-1000"
          >
            مشاهده محصولات
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
