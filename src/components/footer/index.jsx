import FooterTopSection from "../elements/footer-top-section";
import Image from "next/image";
import SocialMediaicons from "../elements/social-media-icons";
import FooterBottom from "../elements/footer-bottom";
import Link from "next/link";
import { BsExclamationSquareFill } from "react-icons/bs";
import { MdLockOutline, MdOutlinePhoneEnabled } from "react-icons/md";
import { FiFileText } from "react-icons/fi";
import FooterAddress from "./footer-address";
import SiteSetting from "../../../models/SiteSetting";
import FooterPhoneEmail from "./footer-phone-email";

const Footer = async () => {
  let info = {};
  try {
    info = await SiteSetting.findOne();
  } catch (error) {
    console.log(error);
    throw Error("خطا در دریافت اطلاعات");
  }
  return (
    <footer className="w-full bg-slate-200 pt-4">
      <FooterTopSection />
      <div className="px-4 flex flex-col sm:flex-row flex-wrap items-center sm:items-start justify-center">
        <FooterAddress data={JSON.parse(JSON.stringify(info))} />
        <FooterPhoneEmail data={JSON.parse(JSON.stringify(info))} />
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
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-slate-300  hidden md:grid grid-cols-3 justify-between items-center lg:hidden  p-4 gap-4">
        <div className=" flex gap-2 justify-start items-center">
          <span>تلفن: </span>
          <span>013-458-6952</span>
        </div>
        <div className="flex gap-2 justify-start items-center">
          <span>ایمیل: </span>
          <span>arashstore@gmail.com</span>
        </div>
        <SocialMediaicons />
      </div>
      <FooterBottom />
    </footer>
  );
};

export default Footer;
