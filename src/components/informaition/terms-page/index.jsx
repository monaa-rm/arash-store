import { addZeroFunc } from "@/utiles/utils-func";
import Link from "next/link";
import { BsExclamationSquareFill } from "react-icons/bs";
import { FiFileText } from "react-icons/fi";
import {
  MdLocationOn,
  MdLockOutline,
  MdOutlineMailOutline,
  MdOutlinePhoneEnabled,
} from "react-icons/md";

const TermsPage = () => {
  return (
    <div className="w-full flex flex-col gap-6 p-4 ">
      <section className="flex flex-col gap-4 lg:min-h-96">
        <div className="flex justify-start items-center gap-2 text-gray-700">
          <FiFileText className="w-5 h-5 " />
          <h3 className="font-bold text-xl">قوانین‌و‌مقررات</h3>
        </div>
        <div className=" border-r-2 p-2 text-gray-500  flex flex-col gap-6">
          <div>
            <span className="font-bold text-gray-600">نحوه‌‌ی ارسال: </span>
            <span>
              سفارش‌ها در بازه‌ی 24 تا 72 ساعت کاری آماده و توسط پست یا شرکت‌های
              حمل‌ونقل طرف قرارداد ارسال می‌شود.
            </span>
          </div>
          <div>
            <span className="font-bold text-gray-600">
              مرجوعی و بازگشت وجه:{" "}
            </span>
            <span>
              در صورتی که محصول دارای ایراد فنی یا مغایرت با سفارش باشد،پس از
              دریافت کالا و بررسی آن، در صورت تایید شرایط بازگشت، وجه پرداختی
              شما طی 7 روز کاری به حساب شما مسترد خواهد شد.
            </span>
          </div>
          <div>
            <span className="font-bold text-gray-600">لغو سفارش: </span>
            <span>
              قبل از ارسال کالا امکان لغو سفارش از طریق تماس با پشتیبانی وجود
              دارد و مبلغ ظرف 7 روز آینده به حساب مشتری بازگردانده خواهد شد.
            </span>
          </div>
          <div>
            <span className="font-bold text-gray-600">مسئولیت‌ها: </span>
            <span>
              مشتری موظف است اطلاعات صحیح (آدرس، شماره تماس و ...) را هنگام ثبت
              سفارش وارد کند.مسئولیت تأخیر یا عدم تحویل به دلیل اطلاعات ناقص بر
              عهده‌ی مشتری خواد بود.
            </span>
          </div>
        </div>
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
          href={"/privacy-policy"}
          className="flex justify-start items-center gap-2  text-blue-600 hover:text-blue-800 transition-all duration-300"
        >
          <MdLockOutline className="w-4 h-4" />
          حریم خصوصی
        </Link>
      </div>
    </div>
  );
};

export default TermsPage;
