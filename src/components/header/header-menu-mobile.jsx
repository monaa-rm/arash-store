"use client";

import { setMenuActiveItem, setShowMenu } from "@/features/globalSlice";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CgMenuRightAlt } from "react-icons/cg";
import HeaderContent from "./header-content";
import { useDispatch, useSelector } from "react-redux";
import MenuMobileCategory from "./menu-mobile-category";
import Image from "next/image";
import arashStore from "../../assets/images/arashstore.png";
const HeaderMenuMobile = ({ categories }) => {
  const dispatch = useDispatch();
  const showMenu = useSelector((store) => store.globalSlice.showMenu);

  useEffect(() => {
    const handleClick = (event) => {
      if (!event.target.closest("#headermenumobile")) {
        dispatch(setShowMenu(false));
      }
    };

    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, []);
  useEffect(() => {
    if (showMenu) {
      document.body.style.overflowY = "hidden";
    }

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [showMenu]);
  return (
    <>
      <CgMenuRightAlt
        className="w-8 h-8 cursor-pointer  text-zinc-700"
        onClick={() => dispatch(setShowMenu(!showMenu))}
      />
      <div
        className={`fixed top-0  right-0 ${
          showMenu
            ? "bottom-0 opacity-100"
            : "bottom-auto opacity-0 pointer-events-none"
        } left-0 transition-opacity duration-300 bg-black bg-opacity-50 z-[19]`}
      ></div>
      <div
        id="headermenumobile"
        className={`fixed transition-all duration-300 ease-in-out p-4 top-0 ${
          showMenu ? " right-0" : " right-[-270px]"
        } bottom-0  w-[270px] bg-white z-20`}
      >
        <div className={`w-full mb-4 h-24 border-b p-4`}>
          <div className="w-16 h-16 relative">
            <Image
              src={arashStore}
              alt="arash store"
              fill
              className="object-fill"
            />
          </div>
        </div>
        <HeaderContent />
        <MenuMobileCategory categories={categories} />
      </div>
    </>
  );
};

export default HeaderMenuMobile;
