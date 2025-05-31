"use client";

import { useEffect, useState } from "react";
import { CgMenuRightAlt } from "react-icons/cg";

const HeaderMenuMobile = () => {

  const [showMenu, setShowMenu] = useState(false);
  useEffect(() => {
    const handleClick = (event) => {
      if (!event.target.closest("#headermenumobile")) {
        setShowMenu(false);
      }
    };

    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <>
      <CgMenuRightAlt
        className="w-8 h-8 cursor-pointer  text-zinc-700"
        onClick={() => setShowMenu(!showMenu)}
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
        className={`fixed transition-all duration-300 ease-in-out top-0 ${
          showMenu ? " right-0" : " right-[-300px]"
        } bottom-0  w-[300px] bg-white z-20`}
      ></div>
    </>
  );
};

export default HeaderMenuMobile;
