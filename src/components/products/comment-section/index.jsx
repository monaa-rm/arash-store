"use client";

import AddCommentButton from "@/components/elements/add-cm-btn";
import ProductRating from "@/components/elements/product-rating";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import SetCommentSection from "../set-comment-section";
import { FaCaretDown } from "react-icons/fa";
import UsersComments from "../users-comments";
import { useSession } from "next-auth/react";
import GlobalLoading from "@/components/elements/global-loading";



const CommentSection = ({ title, id , rate }) => {
  const [rating, setRating] = useState(rate || 0);
  const [showCm, setShowCm] = useState(false);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();
   const cmtRef = useRef(null);
 useEffect(() => {
    // 2. کد اسکرول را داخل useEffect قرار می‌دهیم
    if (cmtRef.current) {
      cmtRef.current.scrollIntoView({
        behavior: 'smooth', // 3. برای اسکرول نرم و روان
        block: 'start',     // 4. اسکرول به ابتدای عنصر
      });
    }
  }, []);
  useEffect(() => {
    async function fetchComments() {
      try {
        setLoading(true);
        const res = await fetch(`/api/comment/productComments/${id}`);
        const data = await res.json();
        if (res.ok) {
          setComments(data?.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchComments();
  }, []);
  return (
    <section ref={cmtRef} className="w-full">
      <div className="w-full flex flex-wrap justify-between items-center">
        <div className=" pb-3">
          <span className="font-bold">{title} - </span>
          <span className="text-blue-700">({comments?.length}) نظر</span>
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
          <SetCommentSection
            comments={comments}
            setComments={setComments}
            id={id}
            showCm={showCm}
            setShowCm={setShowCm}
          />
        </div>
      </div>
      <div className="pt-8">
        <div className="flex justify-start items-center gap-1 border-b pb-2">
          <FaCaretDown className="w-4 h-4 text-blue-700 rotate-45" />
          <h3 className="font-bold ">نظرات کاربران</h3>
        </div>
        {loading ? <GlobalLoading /> : ( <UsersComments  comments={comments} setComments={setComments} />)}
       
      </div>
    </section>
  );
};

export default CommentSection;
