"use client";
// import { useEffect, useRef, useState, useCallback } from "react";
// import BlogItem from "@/components/elements/blog-Item";
// import Link from "next/link";
// import { FaLongArrowAltLeft } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import { setBlogsPage } from "@/features/globalSlice";

export const blogData = [
  {
    id: "0",
    title: " برد کولرو0 چه کاربردی دارد",
    description:
      " دنیای امروز، سیستم‌های تهویه مطبوع دیگر تنها وسیله‌ای برای ک کردن فضا نیستند. تکنولوژی‌های جدید به این سیستم‌ها قابلیت‌هایدر دنیای امروز، سیستم‌های تهویه مطبوع دیگر تنها وسیله‌ای برای خنک کردن فضا نیستند. تکنولوژی‌های جدید به این سیستم‌ها قابلیت‌های",
    imageSrc: "/images/welcomebg.jpg",
    date: "  ۱۴۰۳-۱۱-۲۰",
  },
  {
    id: "1",
    title: "یدر دنیای امروز، سیستم‌های تهویه1 مطبوع دید به این ",
    description:
      " دنیای امروز، سیستم‌های تهویه مطبوع دیگر تنها وسیله‌ای برای ک کلیت‌هایدر دنیای امروز، سیستم‌های تهویه مطبوع دیگر تنهام‌ها قابلیت‌های",
    imageSrc: "/images/welcomebg.jpg",
    date: "  ۱۴۰۳-۱۱-۲۰",
  },
  {
    id: "2",
    title: "این سیستم‌ها قابلیت‌ها2یدر دنیای امروز",
    description:
      " دنیای امروز، سیستم‌های تهویه مطبوع دیگر تنها وسیله‌ای برای ک کردن فضا نیستند. تکنولوژی‌های جدید به این سیستم‌ها قابلیت‌هایدر دنیای امروز، سیستم‌های تهویه مطبوع دید به این سیستم‌ها قابلیت‌های",
    imageSrc: "/images/welcomebg.jpg",
    date: "  ۱۴۰۳-۱۱-۲۰",
  },
  {
    id: "3",
    title: "این سیستم‌ها قابلی3ت‌هایدر دنیای امروز",
    description:
      " دنیای امروز، سیستم‌های تهویه مطبوع دیگر تنها وسیله‌ای برای ک کردن فضا نیستند. تکنولوژی‌های جدید به این سیستم‌ها قابلیت‌هایدر دنیای امروز، سیستم‌های تهویه مطبوع دید به این سیستم‌ها قابلیت‌های",
    imageSrc: "/images/welcomebg.jpg",
    date: "  ۱۴۰۳-۱۱-۲۰",
  },
  {
    id: "4",
    title: "این سیستم‌ها قابلی4ت‌هایدر دنیای امروز",
    description:
      " دنیای امروز، سیستم‌های تهویه مطبوع دیگر تنها وسیله‌ای برای ک کردن فضا نیستند. تکنولوژی‌های جدید به این سیستم‌ها قابلیت‌هایدر دنیای امروز، سیستم‌های تهویه مطبوع دید به این سیستم‌ها قابلیت‌های",
    imageSrc: "/images/welcomebg.jpg",
    date: "  ۱۴۰۳-۱۱-۲۰",
  },
  {
    id: "5",
    title: "این سیستم‌ها قابلیت‌ه5ایدر دنیای امروز",
    description:
      " دنیای امروز، سیستم‌های تهویه مطبوع دیگر تنها وسیله‌ای برای ک کردن فضا نیستند. تکنولوژی‌های جدید به این سیستم‌ها قابلیت‌هایدر دنیای امروز، سیستم‌های تهویه مطبوع دید به این سیستم‌ها قابلیت‌های",
    imageSrc: "/images/welcomebg.jpg",
    date: "  ۱۴۰۳-۱۱-۲۰",
  },

  {
    id: "6",
    title: "این سیستم‌ه6ا قابلیت‌هایدر دنیای امروز",
    description:
      " دنیای امروز، سیستم‌های تهویه مطبوع دیگر تنها وسیله‌ای برای ک کردن فضا نیستند. تکنولوژی‌های جدید به این سیستم‌ها قابلیت‌هایدر دنیای امروز، سیستم‌های تهویه مطبوع دید به این سیستم‌ها قابلیت‌های",
    imageSrc: "/images/welcomebg.jpg",
    date: "  ۱۴۰۳-۱۱-۲۰",
  },
  {
    id: "7",
    title: "این سیس7تم‌ها قابلیت‌هایدر دنیای امروز",
    description:
      " دنیای امروز، سیستم‌های تهویه مطبوع دیگر تنها وسیله‌ای برای ک کردن فضا نیستند. تکنولوژی‌های جدید به این سیستم‌ها قابلیت‌هایدر دنیای امروز، سیستم‌های تهویه مطبوع دید به این سیستم‌ها قابلیت‌های",
    imageSrc: "/images/welcomebg.jpg",
    date: "  ۱۴۰۳-۱۱-۲۰",
  },
  {
    id: "8",
    title: "این سیستم‌ها 8قابلیت‌هایدر دنیای امروز",
    description:
      " دنیای امروز، سیستم‌های تهویه مطبوع دیگر تنها وسیله‌ای برای ک کردن فضا نیستند. تکنولوژی‌های جدید به این سیستم‌ها قابلیت‌هایدر دنیای امروز، سیستم‌های تهویه مطبوع دید به این سیستم‌ها قابلیت‌های",
    imageSrc: "/images/welcomebg.jpg",
    date: "  ۱۴۰۳-۱۱-۲۰",
  },
  {
    id: "9",
    title: "این سیستم‌ها قابلیت‌9هایدر دنیای امروز",
    description:
      " دنیای امروز، سیستم‌های تهویه مطبوع دیگر تنها وسیله‌ای برای ک کردن فضا نیستند. تکنولوژی‌های جدید به این سیستم‌ها قابلیت‌هایدر دنیای امروز، سیستم‌های تهویه مطبوع دید به این سیستم‌ها قابلیت‌های",
    imageSrc: "/images/welcomebg.jpg",
    date: "  ۱۴۰۳-۱۱-۲۰",
  },
  {
    id: "10",
    title: "این سیستم‌ها قابلیت‌ه10ایدر دنیای امروز",
    description:
      " دنیای امروز، سیستم‌های تهویه مطبوع دیگر تنها وسیله‌ای برای ک کردن فضا نیستند. تکنولوژی‌های جدید به این سیستم‌ها قابلیت‌هایدر دنیای امروز، سیستم‌های تهویه مطبوع دید به این سیستم‌ها قابلیت‌های",
    imageSrc: "/images/welcomebg.jpg",
    date: "  ۱۴۰۳-۱۱-۲۰",
  },
  {
    id: "11",
    title: "این سیستم‌ها قابلیت‌های11در دنیای امروز",
    description:
      " دنیای امروز، سیستم‌های تهویه مطبوع دیگر تنها وسیله‌ای برای ک کردن فضا نیستند. تکنولوژی‌های جدید به این سیستم‌ها قابلیت‌هایدر دنیای امروز، سیستم‌های تهویه مطبوع دید به این سیستم‌ها قابلیت‌های",
    imageSrc: "/images/welcomebg.jpg",
    date: "  ۱۴۰۳-۱۱-۲۰",
  },
  {
    id: "12",
    title: "این سیستم‌ها قابلیت‌هاید12ر دنیای امروز",
    description:
      " دنیای امروز، سیستم‌های تهویه مطبوع دیگر تنها وسیله‌ای برای ک کردن فضا نیستند. تکنولوژی‌های جدید به این سیستم‌ها قابلیت‌هایدر دنیای امروز، سیستم‌های تهویه مطبوع دید به این سیستم‌ها قابلیت‌های",
    imageSrc: "/images/welcomebg.jpg",
    date: "  ۱۴۰۳-۱۱-۲۰",
  },
  {
    id: "13",
    title: "این سیستم‌ها قابلیت‌هاید13ر دنیای امروز",
    description:
      " دنیای امروز، سیستم‌های تهویه مطبوع دیگر تنها وسیله‌ای برای ک کردن فضا نیستند. تکنولوژی‌های جدید به این سیستم‌ها قابلیت‌هایدر دنیای امروز، سیستم‌های تهویه مطبوع دید به این سیستم‌ها قابلیت‌های",
    imageSrc: "/images/welcomebg.jpg",
    date: "  ۱۴۰۳-۱۱-۲۰",
  },
];
// const BlogsPage = () => {
//   const [blogs, setBlogs] = useState([]); // لیست بلاگ‌ها
//   const [loading, setLoading] = useState(false); // وضعیت بارگذاری
//   const [hasMore, setHasMore] = useState(true); // بررسی وجود بلاگ‌های بیشتر
//   const [page, setPage] = useState(1); // شماره صفحه

//   const observer = useRef(); // برای IntersectionObserver
//   const blogsRef = useRef([]); // ذخیره بلاگ‌ها برای جلوگیری از درخواست مجدد
//   const pageRef = useRef(1); // ذخیره مقدار صفحه

//   const lastBlogRef = useCallback(
//     (node) => {
//       if (loading) return;
//       if (observer.current) observer.current.disconnect();

//       observer.current = new IntersectionObserver(
//         (entries) => {
//           if (entries[0].isIntersecting && hasMore) {
//             setPage((prevPage) => prevPage + 1);
//           }
//         },
//         { threshold: 1 }
//       );

//       if (node) observer.current.observe(node);
//     },
//     [loading, hasMore]
//   );

//   useEffect(() => {
//     const fetchBlogs = async () => {

//       if (blogsRef.current.length > 0 && pageRef.current === page) {
//         setBlogs([...blogsRef.current]); // اگر قبلاً مقدارگیری شده، استفاده شود
//         return;
//       }
//       console.log("infoooooo" , page , blogs)
//       setLoading(true);
//       const startIndex = (page - 1) * 6;
//       const endIndex = page * 6;
//       const newBlogs = blogData.slice(startIndex, endIndex);

//       blogsRef.current = [...blogsRef.current, ...newBlogs]; // ذخیره در useRef
//       pageRef.current = page; // ذخیره مقدار page

//       setBlogs([...blogsRef.current]); // مقداردهی به useState
//       setHasMore(endIndex < blogData.length);
//       setLoading(false);
//     };

//     fetchBlogs();
//   }, [page]);

//   return (
//     <div className="w-full flex flex-col gap-6 p-4">
//       <h1 className="font-bold text-2xl">آخرین‌های وبلاگ</h1>
//       <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//         {blogs.map((blog, index) => (
//           <div key={blog.id} ref={blogs.length === index + 1 ? lastBlogRef : null}>
//             <BlogItem blog={blog} />
//           </div>
//         ))}
//         {loading && <p>در حال بارگیری...</p>}
//       </div>
//     </div>
//   );
// };

// export default BlogsPage;

import { useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs, nextPage, resetBlogs } from "@/features/blogSlice";
import BlogItem from "@/components/elements/blog-Item";
import LoadingButton from "@/components/elements/loading-button";
import { usePathname } from "next/navigation";
const BlogsPage = () => {
  const dispatch = useDispatch();
  const { blogs, page, hasMore, loading, error } = useSelector(
    (state) => state.blogSlice
  );
  const observer = useRef();
  const currentPath = usePathname();
  useEffect(() => {
    dispatch(resetBlogs()); // Dispatch resetPage to set page to 1
  }, [dispatch]);
  useEffect(() => {
    console.log(page, blogs);

    dispatch(fetchBlogs(page));
  }, [page]);

  useEffect(() => {
    return () => {
      dispatch(resetBlogs());
    };
  }, []);

  const lastBlogRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            dispatch(nextPage());
          }
        },
        { threshold: 1 }
      );

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, dispatch]
  );

  return (
    <div className="w-full flex flex-col gap-6 p-4">
      <h1 className="font-bold text-2xl">آخرین‌های وبلاگ</h1>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog, index) => (
          <div
            key={blog.id}
            ref={blogs?.length === index + 1 ? lastBlogRef : null}
          >
            <BlogItem blog={blog} />
          </div>
        ))}
      </div>
      {loading && <LoadingButton />}
      {error && <p className="text-red-500">خطا در دریافت اطلاعات: {error}</p>}
    </div>
  );
};

export default BlogsPage;
