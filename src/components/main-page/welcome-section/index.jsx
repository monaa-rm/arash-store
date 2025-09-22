"use client";
import WelcomeSlider from "@/components/modules/welcomeSlider";
import { setMenuActiveItem, setShowPriceGlobal } from "@/features/globalSlice";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const WelcomeSection = ({ data }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setMenuActiveItem("/"));
  }, []);

  return (
    <section className={`w-full h-[150px] sm:h-[400px] relative`}>
      <WelcomeSlider welcomeImages={data?.welcomeImages} />
      <div className=" w-full absolute top-0 h-full flex justify-center items-center ">
        <div className="w-full sm:w-[600px] flex flex-col items-center gap-6 ">
          <h1 className="w-full h-full flex flex-col items-center gap-6">
            <span className="text-white font-bold text-2xl sm:text-4xl text-center">
              {data?.welcomeTitle || " به فروشگاه آرش خوش آمدید"}
            </span>
            <span className="font-bold hidden sm:block text-white leading-8 mt-4 text-center">
              {data?.welcomeDescription}
            </span>
          </h1>
          <Link
            href={"/products"}
            className=" sm:flex hidden w-40 h-10 justify-center items-center
            bg-blue-700 hover:bg-blue-800  text-white font-bold rounded-[8px] transition-all duration-1000"
          >
            مشاهده محصولات
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
