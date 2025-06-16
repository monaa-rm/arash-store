import BlogSingleItemPage from "@/components/blogs/blogsPage/blog-single-item-page";
import React from "react";
import Blog from "../../../../models/Blog";
import connectDB from "@/utiles/connectDB";

const BlogSingleItem = async ({ params }) => {
  const { blogId } = await params;
  await connectDB();
  const data = await Blog.findOne({ _id: blogId });
  return <BlogSingleItemPage data={JSON.parse(JSON.stringify(data)) || {}} />;
};

export default BlogSingleItem;
