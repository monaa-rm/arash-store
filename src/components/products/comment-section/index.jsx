"use client";

import AddCommentButton from "@/components/elements/add-cm-btn";
import ProductRating from "@/components/elements/product-rating";
import { useParams } from "next/navigation";
import { useState } from "react";
import SetCommentSection from "../set-comment-section";
import { FaCaretDown } from "react-icons/fa";
import UsersComments from "../users-comments";

const commentsData = [
  {
    id: "5221212",
    nickname: "aboli",
    message:
      "میکروسوئیچ ماشین لباسشویی ال جی یا سوئیچ فشار حساس، یک قطعه الکتریکی کوچک اما حیاتی است که برای کنترل عملیات مختلف ماشین لباسشویی، مانند تشخیص بسته بودن درب، کنترل سطح آب و بررسی وضعیت موتور به کار می‌روداین قطعه با تغییرات فشار یا حرکت فعال شده و باعث برقراری یا قطع مدار الکتریکی می‌شود.",
    date: "28/3/74",
    rating: 3,
  },
  {
    id: "545554",
    nickname: "mamali",
    message:
      "   ال جی یا سوئیچ فشار ترل عملیات مختلف ماشین لباسش می‌شود.",
    date: "28/8/74",
    rating: 5,
  },
  {
    id: "22744",
    nickname: "mona",
    message:
      "   ال جی یا سوئیچ فشار ترل عملیات مختلف ماشین ار می‌روداین قطعه با تغییرات فشار یا حرکت فعال شده و باعث برقراری یا قطع می‌شود.",
    date: "28/8/45",
    rating: 5,
  },
  {
    id: "14752",
    nickname: "dela",
    message:
      "   ال جی یا سوئیچ فشار ترل عملیات مختلف ماشین ار می‌روداین قطعه با تغییراد.",
    date: "28/8/45",
    rating: 1,
  },
];

const CommentSection = ({ title }) => {
  const [rating, setRating] = useState(0);
  const [showCm, setShowCm] = useState(false);
  const params = useParams();

  return (
    <section className="w-full">
      <div className="w-full flex flex-wrap justify-between items-center">
        <div className=" pb-3">
          <span className="font-bold">{title} - </span>
          <span className="text-blue-700">({commentsData.length}) نظر</span>
        </div>
        <div className="w-20 md:w-40 pb-3" dir="rtl">
          <ProductRating
            rating={rating}
            setRating={setRating}
            readOnly={true}
          />
        </div>
      </div>
      <div className="w-full pt-6 pb-2 ">
        <AddCommentButton showCm={showCm} setShowCm={setShowCm} />
        <div
          className={`relative overflow-hidden ${
            showCm ? " h-[600px] md:h-[450px]" : "h-0"
          } transition-all duration-500`}
        >
          <SetCommentSection showCm={showCm} setShowCm={setShowCm} />
        </div>
      </div>
      <div className="pt-8">
        <div className="flex justify-start items-center gap-1 border-b pb-2">
          <FaCaretDown className="w-4 h-4 text-blue-700 rotate-45" />
          <h3 className="font-bold ">نظرات کاربران</h3>
        </div>
        <UsersComments comments={commentsData} />
      </div>
    </section>
  );
};

export default CommentSection;
