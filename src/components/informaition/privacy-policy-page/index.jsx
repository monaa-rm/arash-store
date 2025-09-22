import { addZeroFunc } from "@/utiles/utils-func";
import Link from "next/link";
import { BsExclamationSquareFill } from "react-icons/bs";
import { FiFileText } from "react-icons/fi";
import {
  MdLockOutline,
  MdOutlinePhoneEnabled,
} from "react-icons/md";

const PrivacyPolicyPage = () => {
  return (
    <div className="w-full flex flex-col gap-6 p-4 ">
      <section className="flex flex-col gap-4 lg:min-h-96">
        <div className="flex justify-start items-center gap-2 text-gray-700">
          <MdLockOutline className="w-5 h-5 " />
          <h3 className="font-bold text-xl">حریم خصوصی</h3>
        </div>
        <p className=" border-r-2 p-2 text-gray-500  flex flex-col gap-6">
          ما به حریم خصوصی کاربران خود احترام میگذاریم. اطلاعاتی که هنگام ثبت
          سفارش دریافت میکنیم شامل نام، شماره تماس، ایمیل و آدرس پستی است.این
          اطلاعات فقط برای پردازش سفارش، ارسال کالا و اطلاع‌رسانی وضعیت خرید
          استفاده می‌شود و در اختیار شخص ویا مجموعه‌ی دیگری قرار نخواهد گرفت.
        </p>
        <p className=" border-r-2 p-2 text-gray-500  flex flex-col gap-6">
          اطلاعات پرداخت شما از طریق درگاه‌های بانکی معتبر انجام می‌شود و
          فروشگاه هیچگونه دسترسی به جزئیات کارت بانکی شما ندارد.
        </p>
      </section>
      <div className="flex flex-col gap-2 border-t-2 px-2 py-4">
        <Link
          href={"/about-us"}
          className="flex justify-start items-center gap-2  text-blue-600 hover:text-blue-800 transition-all duration-300"
        >
          <BsExclamationSquareFill className="w-4 h-4" />
          درباره‌ی ما
        </Link>
        <Link
          href={"/contact-us"}
          className="flex justify-start items-center gap-2  text-blue-600 hover:text-blue-800 transition-all duration-300"
        >
          <MdOutlinePhoneEnabled className="w-4 h-4" />
          تماس با ما
        </Link>
        <Link
          href={"/terms"}
          className="flex justify-start items-center gap-2  text-blue-600 hover:text-blue-800 transition-all duration-300"
        >
          <FiFileText className="w-4 h-4" />
         قوانین‌و‌مقررات
        </Link>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
