import React from "react";
import connectDB from "@/utiles/connectDB";
import { notFound, redirect } from "next/navigation";
import mongoose from "mongoose";
import { slugifyBlog } from "@/utiles/utils-func";
import GlobalLoading from "@/components/elements/global-loading";
import Blog from "../../../../models/Blog";

const BlogSingleItem = async ({ params }) => {
  const { blogId } = await params;
  let data = {};
  if (!mongoose.Types.ObjectId.isValid(blogId)) {
    return notFound();
  }

  try {
    await connectDB();
    data = await Blog.findOne({ _id: blogId });
    if (!data?.title) {
      return notFound();
    }
  } catch (error) {
    return notFound();
  }
  if (data?.title) {
    const blogSlug = slugifyBlog(data?.title, data?._id);
    return redirect(`/blogs/${data?._id}/${blogSlug}`);
  } else {
    return (
      <div className="flex flex-col gap-4">
        <GlobalLoading />
      </div>
    );
  }
  //   return <BlogSingleItemPage data={JSON.parse(JSON.stringify(data)) || {}} />;
};

export default BlogSingleItem;

