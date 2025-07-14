import BlogItem from "@/components/elements/blog-Item";
import Link from "next/link";
import { FaLongArrowAltLeft } from "react-icons/fa";
import Blog from "../../../../models/Blog";

// const blogData = [
//   {
//     id: "3",
//     title: " برد کولرو چه کاربردی دارد",
//     description:
//       " دنیای امروز، سیستم‌های تهویه مطبوع دیگر تنها وسیله‌ای برای ک کردن فضا نیستند. تکنولوژی‌های جدید به این سیستم‌ها قابلیت‌هایدر دنیای امروز، سیستم‌های تهویه مطبوع دیگر تنها وسیله‌ای برای خنک کردن فضا نیستند. تکنولوژی‌های جدید به این سیستم‌ها قابلیت‌های",
//     imageSrc: "/images/welcomebg.jpg",
//     date: "  ۱۴۰۳-۱۱-۲۰",
//   },
//   {
//     id: "4",
//     title: "یدر دنیای امروز، سیستم‌های تهویه مطبوع دید به این ",
//     description:
//       " دنیای امروز، سیستم‌های تهویه مطبوع دیگر تنها وسیله‌ای برای ک کلیت‌هایدر دنیای امروز، سیستم‌های تهویه مطبوع دیگر تنهام‌ها قابلیت‌های",
//     imageSrc: "/images/welcomebg.jpg",
//     date: "  ۱۴۰۳-۱۱-۲۰",
//   },
//   {
//     id: "5",
//     title: "این سیستم‌ها قابلیت‌هایدر دنیای امروز",
//     description:
//       " دنیای امروز، سیستم‌های تهویه مطبوع دیگر تنها وسیله‌ای برای ک کردن فضا نیستند. تکنولوژی‌های جدید به این سیستم‌ها قابلیت‌هایدر دنیای امروز، سیستم‌های تهویه مطبوع دید به این سیستم‌ها قابلیت‌های",
//     imageSrc: "/images/welcomebg.jpg",
//     date: "  ۱۴۰۳-۱۱-۲۰",
//   },
// ];
const Blogs = async () => {
  const blogData = await Blog.find().limit(3).sort({ _id: -1 });
  return (
    <div className="w-full flex flex-col gap-6 p-4  ">
      <h1 className="font-bold text-2xl">آخرین های وبلاگ</h1>
      <div className="w-full flex flex-col gap-8  justify-center items-center ">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogData.length &&
            blogData?.map((blog) => <BlogItem key={blog._id} blog={blog} />)}
        </div>
        <Link
          href={"/blogs"}
          className="group w-56 relative inline-flex items-center justify-center px-8 py-3 text-lg font-bold text-white transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-500 rounded-full transition-all duration-300 group-hover:scale-110 animate-gradient"></div>

          <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-300 bg-white blur-xl"></div>

          <div className="absolute inset-0 overflow-hidden rounded-full">
            <div className="glitter-container">
              <div className="glitter"></div>
              <div className="glitter"></div>
              <div className="glitter"></div>
            </div>
          </div>

          <div className="absolute inset-0 rounded-full border-2 border-white opacity-20 group-hover:opacity-40 group-hover:scale-105 transition-all duration-300"></div>

          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div className="wave"></div>
          </div>

          <span className="relative z-10 flex items-center gap-2">
            <span className="tracking-wider font-bold">مشاهده همه</span>
            <FaLongArrowAltLeft />
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Blogs;
