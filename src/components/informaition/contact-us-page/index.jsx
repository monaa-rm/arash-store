import { addZeroFunc } from "@/utiles/utils-func";
import Link from "next/link";


const ContactUsPage = ({ information }) => {
  return (
    <main className="w-full flex flex-col gap-6 p-4 ">
      <h1 className="flex justify-start items-center gap-2 pt-4 pb-2 text-gray-700">
        <svg className="w-5 h-5 text-inherit">
          <use href="/sprite.svg#phone_icon" />
        </svg>
        <span className="font-bold text-xl">تماس با ما</span>
      </h1>
      <section className="flex flex-col gap-4 lg:min-h-96">
        <div className=" border-r-2 p-2 text-gray-500  flex flex-col gap-6">
          <p>
            شما می‌توانید برای هر گونه پرسش، پیگیری سفارش یا دریافت پشتیبانی با
            ما در ارتباط باشید.
          </p>
          <div className="flex flex-col gap-1">
            {information?.address?.map((address, i) => (
              <div key={i} className={`flex justify-start items-center gap-2`}>
                <svg className="w-4 h-4 text-inherit">
                  <use href="/sprite.svg#location_icon" />
                </svg>
                {address}
              </div>
            ))}
            {information?.phone?.map((phone, i) => (
              <div key={i} className={`flex justify-start items-center gap-2`}>
                <svg className="w-4 h-4 text-inherit">
                  <use href="/sprite.svg#phone_icon" />
                </svg>
                {addZeroFunc(phone)}
              </div>
            ))}
            {information?.email?.length ? (
              <div className={`flex justify-start items-center gap-2`}>
                <svg className="w-4 h-4 text-inherit">
                  <use href="/sprite.svg#mail_icon" />
                </svg>
                {information?.email}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
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
          href={"/terms"}
          className="flex justify-start items-center gap-2  text-blue-600 hover:text-blue-800 transition-all duration-300"
        >
          <svg className="w-5 h-5 text-inherit">
            <use href="/sprite.svg#rules_icon" />
          </svg>
          قوانین و مقررات
        </Link>
        <Link
          href={"/privacy-policy"}
          className="flex justify-start items-center gap-2  text-blue-600 hover:text-blue-800 transition-all duration-300"
        >
          <svg className="w-5 h-5 text-inherit">
            <use href="/sprite.svg#privacy_policy_icon" />
          </svg>
          حریم خصوصی
        </Link>
      </div>
    </main>
  );
};

export default ContactUsPage;
