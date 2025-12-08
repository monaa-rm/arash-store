"use client"
import FooterTopSection from "@/components/elements/footer-top-section";
import Image from "next/image";
import Link from "next/link";
import FooterAddress from "../footer-address";
import FooterPhoneEmail from "../footer-phone-email";
import SocialMediaicons from "@/components/elements/social-media-icons";
import FooterBottom from "@/components/elements/footer-bottom";
import { usePathname } from "next/navigation";


const FooterMain =  ({data}) => {
const path = usePathname();
if(path.startsWith("/dashboard")) return <div></div>
  return (
    <footer className="w-full bg-slate-200 pt-4">
      <FooterTopSection />
      <div className="px-4 flex flex-col sm:flex-row flex-wrap items-center sm:items-start justify-center">
        <FooterAddress data={data} />
        <FooterPhoneEmail data={data} />
        <div className="w-full sm:w-1/2 md:w-1/4  p-4 flex flex-col gap-4">
          <h1 className="border-b border-zinc-700 font-bold pb-2">
            راهنمای خرید
          </h1>
          <div>
            <Link
              href={"/about-us"}
              className="flex justify-start items-center gap-2   hover:text-blue-800 transition-all duration-300"
            >
              درباره‌ی ما
            </Link>
            <Link
              href={"/contact-us"}
              className="flex justify-start items-center gap-2   hover:text-blue-800 transition-all duration-300"
            >
              تماس با ما
            </Link>
            <Link
              href={"/terms"}
              className="flex justify-start items-center gap-2   hover:text-blue-800 transition-all duration-300"
            >
              قوانین و مقررات
            </Link>
            <Link
              href={"/privacy-policy"}
              className="flex justify-start items-center gap-2   hover:text-blue-800 transition-all duration-300"
            >
              حریم خصوصی
            </Link>
          </div>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/4  p-4 flex flex-col gap-4">
          <h1 className="border-b border-zinc-700 font-bold pb-2">
            نماد تجارت الکترونیکی
          </h1>
          <div className="flex w-full justify-start">
            <div className="w-full max-w-36 h-40 md:h-36 lg:h-44 relative border border-gray-400 rounded-2xl overflow-hidden">
              <Image
                src={"/images/inamad.png"}
                alt="inamad"
                fill
                sizes="256px"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-slate-300  text-gray-600 hidden md:grid grid-cols-3 justify-between items-center lg:hidden py-3 px-4 gap-4">

        <ul>
          {data?.phone?.map((phone, i) => (
            <li
              key={i}
              className="text-sm flex justify-start items-center gap-2"
            >
              <svg className="w-4 h-4 -rotate-90">
                <use href="/sprite.svg#phone_icon_footer" />
              </svg>
              <span className="mt-1">{phone}</span>
            </li>
          ))}
        </ul>
        <div className="flex gap-2 justify-start items-center">
          <svg className="w-5 h-5 text-inherit">
            <use href="/sprite.svg#mail_icon" />
          </svg>
          <span>{data?.email}</span>
        </div>
        <SocialMediaicons />
      </div>
      <FooterBottom />
    </footer>
  );
};

export default FooterMain;
