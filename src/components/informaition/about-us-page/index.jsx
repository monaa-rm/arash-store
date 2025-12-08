"use client";

import Link from "next/link";

const AboutUsPage = () => {
  return (
    <main className="w-full flex flex-col gap-6 p-4 ">
      <h1 className="flex justify-start items-center gap-2 pb-2 pt-4 text-gray-700">
        <svg className="w-5 h-5 text-inherit">
          <use href="/sprite.svg#menu_info_icon" />
        </svg>
        <section className="font-bold text-xl">درباره‌ی ما</section>
      </h1>
      <section className="flex flex-col gap-4 lg:min-h-96">
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

export default AboutUsPage;
