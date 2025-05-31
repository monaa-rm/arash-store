
import FooterTopSection from "../elements/footer-top-section";
import Image from "next/image";
import SocialMediaicons from "../elements/social-media-icons";
import FooterBottom from "../elements/footer-bottom";

const Footer = () => {
  return (
    <footer className="w-full bg-slate-200 pt-4">
      <FooterTopSection />
      <div className="px-4 flex flex-col sm:flex-row flex-wrap items-center sm:items-start justify-center">
        <div className="w-full sm:w-1/2 md:w-1/4  p-4 flex flex-col gap-4">
          <h1 className="border-b border-zinc-700 font-bold pb-2">
            {" "}
            آدرس فروشگاه
          </h1>
          <ul>
            <li className="list-inside list-disc">لاهیجان،فلان قسمت</li>
            <li className="list-inside list-disc"> لنگزود ،فلان</li>
          </ul>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/4 md:hidden lg:flex  p-4 flex flex-col gap-4">
          <h1 className="border-b border-zinc-700 font-bold pb-2">
            فروشگاه آرش
          </h1>
          <ul>
            <li className="border-b flex justify-between items-center">
              <span>تلفن</span>
              <span>013-458-6952</span>
            </li>
            <li className="border-b flex justify-between items-center">
              <span>ایمیل</span>
              <span>arashstore@gmail.com</span>
            </li>
            <SocialMediaicons />
          </ul>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/4  p-4 flex flex-col gap-4">
          <h1 className="border-b border-zinc-700 font-bold pb-2">
            راهنمای خرید
          </h1>
          <ul>
            <li className="">اصالت محصولات</li>
            <li>خرید عمده از سایت</li>
            <li>رویه ارسال سفارش</li>
            <li>پاسخ به سوالات متداول</li>
          </ul>
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
