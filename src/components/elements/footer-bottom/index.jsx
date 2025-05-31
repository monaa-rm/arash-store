"use client";

import { usePathname } from "next/navigation";


const FooterBottom = () => {
  const path = usePathname();
  return <div className={`${path.startsWith('/products/') && "w-full h-16 md:h-0 bg-transparent"}`}></div>
};

export default FooterBottom;
