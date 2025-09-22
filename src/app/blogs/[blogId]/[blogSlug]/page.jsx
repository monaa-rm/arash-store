

import BlogSingleItemPage from "@/components/blogs/blogsPage/blog-single-item-page";
import React from "react";
import connectDB from "@/utiles/connectDB";
import { notFound } from "next/navigation";
import mongoose from "mongoose";
import Blog from "../../../../../models/Blog";

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

  return <BlogSingleItemPage data={JSON.parse(JSON.stringify(data)) || {}} />;
};

export default BlogSingleItem;
