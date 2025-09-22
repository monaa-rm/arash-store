"use client";

import { BsExclamationSquareFill } from "react-icons/bs";
import Link from "next/link";
import { MdLockOutline, MdOutlinePhoneEnabled } from "react-icons/md";
import { FiFileText } from "react-icons/fi";

const AboutUsPage = () => {
  return (
    <div className="w-full flex flex-col gap-6 p-4 ">
      <section className="flex flex-col gap-4 lg:min-h-96">
        <div className="flex justify-start items-center gap-2 text-gray-700">
          <BsExclamationSquareFill className="w-5 h-5 " />
          <h3 className="font-bold text-xl">درباره‌ی ما</h3>
        </div>
        <div className=" border-r-2 p-2 text-gray-500  flex flex-col gap-4">
          <p className="">
            فروشگاه اینترنتی آرش، با هدف تامین و عرضه‌ی قطعات جانبی و تجهیزات
            برودتی راه‌اندازی شده است.
          </p>
          <p>
            محصولات ما شامل انواع لوازم یدکی و تجهیزات مورد نیاز برای کولرها،
            یخچال‌ها، فریزر‌ها و دیگر دستگاه‌های برودتی می‌باشد.
          </p>
          <p>
            با داشتن دو شعبه‌ی فعال در شهرهای لاهیجان و لنگرود و تجربه‌ی چندین
            ساله در زمینه‌ی فروش حضوری، اکنون این امکان را فراهم کرده‌ایم تا
            مشتریان بتوانند قطعات مورد نیاز خود را به صورت انلاین و در
            کوتاه‌ترین زمان تهیه کنند.
          </p>
          <p>
            مأموریت ما ارائه‌ی کالاهای اصلی، مشاوره تخصصی و خدمات پس از فروش
            مطمئن است تا مشتریان از بابت کیفیت و اصالت کالا آسوده باشند.
          </p>
        </div>
      </section>
      <div className="flex flex-col gap-2 border-t-2 px-2 py-4">
        <Link
          href={"/contact-us"}
          className="flex justify-start items-center gap-2 text-blue-600 hover:text-blue-800  transition-all duration-300"
        >
          <MdOutlinePhoneEnabled className="w-4 h-4" />
          تماس با ما
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

export default AboutUsPage;
