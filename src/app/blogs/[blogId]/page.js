import BlogSingleItemPage from "@/components/blogs/blogsPage/blog-single-item-page";
import React from "react";
import Blog from "../../../../models/Blog";
import connectDB from "@/utiles/connectDB";
import { notFound } from "next/navigation";
import mongoose from "mongoose";

const BlogSingleItem = async ({ params }) => {
  const { blogId } = await params;
  if (!mongoose.Types.ObjectId.isValid(blogId)) {
    return notFound();
  }
  await connectDB();
  const data = await Blog.findOne({ _id: blogId });
  if(!data?.title){
    return notFound();
  }
  return <BlogSingleItemPage data={JSON.parse(JSON.stringify(data)) || {}} />;
};

export default BlogSingleItem;
