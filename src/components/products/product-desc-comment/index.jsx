"use client";

import { useRef, useState, useEffect } from "react";
import DescriptionSection from "../description-section";
import CommentSection from "../comment-section";

const ProductDescComment = ({ description, title, id, rate }) => {
  const [menuItem, setMenuItem] = useState("description");
  const [isInitialRender, setIsInitialRender] = useState(true); // state برای بررسی بارگذاری اولیه
  const sectionRef = useRef(null);

  const scrollToSection = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      const width = window.innerWidth;
      let offset = 0;
      if (width < 1024) offset = -150; // موبایل
      else offset = -115; // دسکتاپ

      setTimeout(() => {
        window.scrollBy({ top: offset, behavior: "smooth" }); // مقدار 300 هر چقدر بخوای می‌تونی تغییر بدی
      }, 20); // تاخیر تا انیمیشن scrollIntoView تموم بشه
    }
  };

  useEffect(() => {
    if (!isInitialRender) {
      // فقط اگر بارگذاری اولیه نباشد، اسکرول انجام شود
      scrollToSection();
    } else {
      setIsInitialRender(false); // پس از اولین بار رندر، مقدار را false کنید
    }
  }, [menuItem]); // اجرای اسکرول بعد از تغییر menuItem

  return (
    <div className="w-full relative">
      <div className="w-full pt-3.5 bg-white border-b flex justify-start items-center gap-4 sticky top-[115px] lg:top-[84px] z-[3] ">
        <div
          className={` w-24 ${
            menuItem === "description" &&
            "border-b-2 border-blue-600 text-blue-600"
          } border-b-2 border-transparent transition-all duration-300  pb-2 flex justify-center items-center gap-2 cursor-pointer`}
          onClick={() => {
            setMenuItem("description");
          }}
        >
          <svg className="h-6 w-6 text-inherit">
            <use href="/sprite.svg#description_icon" />
          </svg>
          <span className="font-bold">توضیحات</span>
        </div>
        <div
          className={` w-24 ${
            menuItem === "comment" && "border-b-2 border-blue-600 text-blue-600"
          } border-b-2 border-transparent transition-all duration-300  pb-2 flex justify-center items-center gap-2 cursor-pointer`}
          onClick={() => {
            setMenuItem("comment");
          }}
        >
          <svg className="h-6 w-6 text-inherit">
            <use href="/sprite.svg#comment_icon" />
          </svg>
          <span className="font-bold">نظرات</span>
        </div>
      </div>
      <div
        ref={sectionRef}
        className="border rounded-br-2xl rounded-bl-2xl p-6 pb-10"
      >
        {menuItem === "description" ? (
          <DescriptionSection description={description} />
        ) : null}
        {menuItem === "comment" ? (
          <CommentSection rate={rate} id={id} title={title} />
        ) : null}
      </div>
    </div>
  );
};

export default ProductDescComment;
