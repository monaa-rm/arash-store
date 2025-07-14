"use client";
import { setShowLoginBox } from "@/features/globalSlice";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { PiUserCheckThin, PiUserThin } from "react-icons/pi";
import { TbLayoutDashboard } from "react-icons/tb";
import { useDispatch } from "react-redux";

const SignIn = () => {
  const [showBox, setShowBox] = useState(false);
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  useEffect(() => {
    const handleClick = (event) => {
      if (!event.target.closest("#signOutBox")) {
        setShowBox(false);
      }
    };

    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, []);
  return (
    <div className="relative">
      {status === "authenticated" ? (
        <>
          <button
            // onClick={() => dispatch(setShowLoginBox(true))}
            onClick={() => setShowBox(true)}
            type="button"
            className=" hidden lg:flex justify-center items-center  min-w-24 h-10 rounded-[10px]  bg-blue-700 hover:bg-blue-800 text-sm
     text-white transition-all duration-300 ease-in-out  "
          >
            حساب کاربری
          </button>
          <button
            onClick={() => setShowBox(true)}
            type="button"
            className="  relative flex lg:hidden justify-center items-center  w-9 min-w-9  h-9
      transition-all duration-300 ease-in-out  "
          >
            <PiUserCheckThin className="w-full h-full font-thin" />
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => dispatch(setShowLoginBox(true))}
            type="button"
            className=" hidden lg:flex justify-center items-center  min-w-24 h-10 rounded-lg  bg-blue-700 hover:bg-blue-800 text-sm
     text-white transition-all duration-300 ease-in-out  "
          >
            ورود/ثبت نام
          </button>
          <button
            onClick={() => dispatch(setShowLoginBox(true))}
            type="button"
            className=" flex lg:hidden justify-center items-center  w-9 min-w-9  h-10
      transition-all duration-300 ease-in-out  "
          >
            <PiUserThin className="w-full h-full font-thin" />
          </button>
        </>
      )}

      <div
        id="signOutBox"
        className={`absolute top-11 md:top-12 left-6 rounded-2xl border bg-white flex flex-col w-32
       h-20 overflow-hidden   ${
         showBox ? " opacity-100" : " opacity-0 pointer-events-none"
       }`}
      >
        <Link
        onClick={() => setShowBox(false)}
          href={ session?.user?.role == "admin" ? "/dashboard/admin" : "/dashboard/user"}
          className="w-full h-1/2 cursor-pointer border-b px-2 flex items-center hover:bg-blue-600 hover:text-white transition-all duration-300"
        >
          داشبورد
        </Link>
        <button
          onClick={() => {
            signOut();
            setShowBox(false);
          }}
          type="button"
          className="w-full h-1/2 cursor-pointer  px-2 text-right hover:bg-blue-600 hover:text-white transition-all duration-300"
        >
          خروج
        </button>
      </div>
    </div>
  );
};

export default SignIn;
