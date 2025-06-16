"use client";

import { getJalaliDate } from "@/utiles/utils-func";

const BlogSingleItemPage = ({ data }) => {
  return (
    <div className="w-full pt-8 pb-96 px-8 md:px-16 lg:px-28">
      <h1 className="text-lg font-bold mb-4">{data?.title}</h1>
      <span className="text-zinc-500 bg-slate-100 px-3 md:px-6  rounded-lg ">
        {" "}
        {getJalaliDate(data?.createdAt)}
      </span>
      <p className="pt-8 md:pt-6 text-slate-600 text-justify ">
        {data?.description}
      </p>
    </div>
  );
};

export default BlogSingleItemPage;
