import { getJalaliDate, slugifyBlog } from "@/utiles/utils-func";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogItem = ({ blog }) => {
  const blugSlug = slugifyBlog(blog?.title, blog?._id);
  return (
    <div className={`w-full h-[380px] flex justify-center items-center `}>
      <div className="relative w-full max-w-[320px] sm:w-[330px] h-[380px] flex flex-col gap-3 overflow-hidden rounded-2xl shadow-lg bg-zinc-100 shadow-zinc-200 ">
        <div className="relative w-full h-[150px]">
          <Image
            src={blog?.imageSrc}
            alt={blog?.imageSrc}
            fill
            className="object-cover"
          />
        </div>
        <div className="px-4 flex flex-col gap-4 ">
          <Link
            href={`/blogs/${blog?._id}/${blugSlug}`}
            className="line-clamp-2 hover:text-blue-800 transition-all duration-300 text-lg font-[vazirmedium]  "
          >
            <h3>{blog?.title}</h3>
          </Link>
          <p className="text-zinc-400 line-clamp-4 text-sm  text-justify">
            {blog?.description}
          </p>
        </div>
        <div className="w-full absolute bottom-0 px-4 py-2 border-t border-blue-300 text-zinc-500 text-sm">
          {blog?.createdAt ? getJalaliDate(blog?.createdAt) : ""}
        </div>
      </div>
    </div>
  );
};

export default BlogItem;
