import connectDB from "@/utiles/connectDB";
import { NextResponse } from "next/server";
import Blog from "../../../../../models/Blog";

export async function GET(req) {
  try {
    await connectDB();
    console.log("ok");
  } catch (error) {
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
  }
  try {
    // const data = await req.json();

    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page")) || 1;
    const limit = parseInt(url.searchParams.get("limit")) || 10;
    const searchQuery = url.searchParams.get("query") || "";

    const indexOfLastBlog = page * limit;
    const indexOfFirstBlog = indexOfLastBlog - limit;
    console.log("start");
    if (searchQuery) {
      console.log("search start");
      // filter.title = { $regex: searchQuery, $options: 'i' };
      const sendBlogs = await Blog.find({
        title: { $regex: searchQuery, $options: "i" },
      })
        .skip(indexOfFirstBlog)
        .limit(limit)
        .exec();
      const totalBlogs = await Blog.countDocuments({
        title: { $regex: searchQuery, $options: "i" },
      });
      const totalPages = Math.ceil(totalBlogs / limit);
      console.log({sendBlogs, totalPages , page , limit , searchQuery});
      return NextResponse.json(
        { data: { sendBlogs, totalPages, totalBlogs } },
        { status: 200 }
      );
    } else {
      console.log("nist 11111111");
      const sendBlogs = await Blog.find() // Post مدل Mongoose شماست
        .skip(indexOfFirstBlog)
        .limit(limit)
        .exec();
      console.log("nist 2222");
      const totalBlogs = await Blog.countDocuments();
      console.log("nist 3333333");
      const totalPages = Math.ceil(totalBlogs / limit);
      console.log("nist 4444444");
      console.log(sendBlogs, totalPages);
      return NextResponse.json(
        { data: { sendBlogs, totalPages, totalBlogs } },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
  }
}
