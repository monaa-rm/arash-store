import BlogSingleItemPage from "@/components/blogs/blogsPage/blog-single-item-page";
import React from "react";
import connectDB from "@/utiles/connectDB";
import { notFound, redirect } from "next/navigation";
import mongoose from "mongoose";
import Blog from "../../../../../models/Blog";
import JsonDl from "@/components/elements/json-dl-func";
import { slugifyBlog } from "@/utiles/utils-func";
import GlobalLoading from "@/components/elements/global-loading";

const getData = async (blogId) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/blog/getSingleBlog/${blogId}`,
    { cache: "no-store" }
  );
  return data.json();
};
export async function generateMetadata({ params }) {
  const { blogId, blogSlug } = await params;
  const data = await getData(blogId);
  // fetch post information
  if (!data?.data?.title) {
    return {
      title: "وبلاگ یافت نشد",
      description: "وبلاگ مورد نطر یافت نشد",
      robots: {
        index: false,
        follow: false,
      },
    };
  }
  return {
    title: data?.data?.title,
    description: data?.data?.description,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SERVER_URL}/blogs/${
        data?.data?._id
      }/${encodeURIComponent(blogSlug)}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

const BlogSingleItem = async ({ params }) => {
  const { blogId, blogSlug } = await params;
  if (!mongoose.Types.ObjectId.isValid(blogId)) {
    return notFound();
  }
  const data = await getData(blogId);
  if (data?.error) {
    return notFound();
  }
  const blogslg = slugifyBlog(data?.data?.title, blogId);
  const decodedBlogSlug = decodeURIComponent(blogSlug);

  if (decodedBlogSlug !== blogslg) {
    return redirect(`/blogs/${blogId}/${blogslg}`);
  }
  const blogJsondl = {
    "@context": process.env.NEXT_PUBLIC_SERVER_URL,
    "@type": "BlogPosting",
    // "@id":
    // "https://dataliberate.com/2019/05/14/library-metadata-evolution-final-mile/#BlogPosting",
    headline: data?.data?.title,
    // image: data?.data?.imageSrc,
    description: data?.data?.description,

    url: `${process.env.NEXT_PUBLIC_SERVER_URL}/${blogId}/${encodeURIComponent(
      blogSlug
    )}`,
    mainEntityOfPage: `${
      process.env.NEXT_PUBLIC_SERVER_URL
    }/${blogId}/${encodeURIComponent(blogSlug)}`,
    keywords: [
      "فروشگاه آرش",
      "لوازم کولر",
      "لوازم یخچال",
      "فیلتر",
      "فیلتر آب",
      "لوله",
      "لوله مسی",
    ],
  };
  if (!data?.data?.title) return <GlobalLoading />;
  return (
    <>
      <JsonDl data={blogJsondl} jsondlkey="blog-jsondl" />
      <BlogSingleItemPage data={JSON.parse(JSON.stringify(data?.data)) || {}} />
    </>
  );
};

export default BlogSingleItem;
