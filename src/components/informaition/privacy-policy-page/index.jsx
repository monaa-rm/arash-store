import Link from "next/link";

const PrivacyPolicyPage = () => {
  return (
    <main className="w-full flex flex-col gap-6 p-4 ">
      <h1 className="flex justify-start items-center gap-2 pb-2 pt-4 text-gray-700">
         <svg className="w-5 h-5 text-inherit">
            <use href="/sprite.svg#privacy_policy_icon" />
          </svg>
        <span className="font-bold text-xl">حریم خصوصی</span>
      </h1>
      <section className="flex flex-col gap-4 lg:min-h-96">
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
           <svg className="w-5 h-5 text-inherit">
            <use href="/sprite.svg#menu_info_icon" />
          </svg>
          درباره‌ی ما
        </Link>
        <Link
          href={"/contact-us"}
          className="flex justify-start items-center gap-2  text-blue-600 hover:text-blue-800 transition-all duration-300"
        >
           <svg className="w-5 h-5 text-inherit">
            <use href="/sprite.svg#phone_icon" />
          </svg>
          تماس با ما
        </Link>
        <Link
          href={"/terms"}
          className="flex justify-start items-center gap-2  text-blue-600 hover:text-blue-800 transition-all duration-300"
        >
           <svg className="w-5 h-5 text-inherit">
            <use href="/sprite.svg#rules_icon" />
          </svg>
          قوانین‌و‌مقررات
        </Link>
      </div>
    </main>
  );
};

export default PrivacyPolicyPage;
