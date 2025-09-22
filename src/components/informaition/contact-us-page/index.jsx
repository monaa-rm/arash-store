import { addZeroFunc } from "@/utiles/utils-func";
import Link from "next/link";
import { BsExclamationSquareFill } from "react-icons/bs";
import { FiFileText } from "react-icons/fi";
import { MdLocationOn, MdLockOutline, MdOutlineMailOutline, MdOutlinePhoneEnabled } from "react-icons/md";

const ContactUsPage = ({ information }) => {
  return (
    <div className="w-full flex flex-col gap-6 p-4 ">
      <section className="flex flex-col gap-4 lg:min-h-96">
        <div className="flex justify-start items-center gap-2 text-gray-700">
          <MdOutlinePhoneEnabled className="w-5 h-5 " />
          <h3 className="font-bold text-xl">تماس با ما</h3>
        </div>
        <div className=" border-r-2 p-2 text-gray-500  flex flex-col gap-6">
          <p>
            شما می‌توانید برای هر گونه پرسش، پیگیری سفارش یا دریافت پشتیبانی با
            ما در ارتباط باشید.
          </p>
          <div className="flex flex-col gap-1">
            {information?.address?.map((address, i) => (
              <div key={i} className={`flex justify-start items-center gap-1 `}>
                <MdLocationOn />
                {address}
              </div>
            ))}
            {information?.phone?.map((phone, i) => (
              <div key={i} className={`flex justify-start items-center gap-1 `}>
                <MdOutlinePhoneEnabled />
                {addZeroFunc(phone)}
              </div>
            ))}
            {information?.email?.length ? (
              <div className={`flex justify-start items-center gap-1 `}>
                <MdOutlineMailOutline />
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
          <BsExclamationSquareFill className="w-4 h-4" />
          درباره‌ی ما
        </Link>
        <Link 
          href={"/terms"}
          className="flex justify-start items-center gap-2  text-blue-600 hover:text-blue-800 transition-all duration-300"
        >
          <FiFileText className="w-4 h-4" />
          قوانین و مقررات
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

export default ContactUsPage;
