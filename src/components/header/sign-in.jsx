"use client";
import { setShowLoginBox } from "@/features/globalSlice";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";

const SignIn = () => {
  const [showBox, setShowBox] = useState(false);
  const dispatch = useDispatch();
  const path = usePathname();
  const router = useRouter();
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
            className="  relative flex lg:hidden justify-center items-center  w-7 min-w-7  h-10
      transition-all duration-300 ease-in-out  "
          >
            <svg className="w-full h-full text-zinc-600 hover:text-zinc-700 transition-all duration-300 ease-in-out">
              <use href="/sprite.svg#user_icon_logged_in" />
            </svg>
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => dispatch(setShowLoginBox(true))}
            type="button"
            className=" hidden lg:flex justify-center items-center  min-w-24 h-10 rounded-[10px]  bg-blue-700 hover:bg-blue-800 text-sm
     text-white transition-all duration-300 ease-in-out  "
          >
            ورود/ثبت نام
          </button>
          <button
            onClick={() => dispatch(setShowLoginBox(true))}
            type="button"
            className=" flex lg:hidden justify-center items-center  w-7 min-w-7  h-10
      transition-all duration-300 ease-in-out  "
          >
            <svg className="w-full h-full text-zinc-600 hover:text-zinc-700 transition-all duration-300 ease-in-out">
              <use href="/sprite.svg#user_icon" />
            </svg>
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
          href={
            session?.user?.role == "admin"
              ? "/dashboard/admin"
              : "/dashboard/user"
          }
          className="w-full h-1/2 cursor-pointer border-b px-2 flex items-center hover:bg-blue-600 hover:text-white transition-all duration-300"
        >
          داشبورد
        </Link>
        <button
          onClick={(e) => {
            e.preventDefault()

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
