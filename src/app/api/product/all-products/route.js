import connectDB from "@/utiles/connectDB";
import { NextResponse } from "next/server";
import Product from "../../../../../models/Product";

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

    const indexOfLastProduct = page * limit;
    const indexOfFirstProduct = indexOfLastProduct - limit;
    console.log("start");
    if (searchQuery) {
      // filter.title = { $regex: searchQuery, $options: 'i' };
      const sendProducts = await Product.find({
        title: { $regex: searchQuery, $options: "i" },
      })
        .skip(indexOfFirstProduct)
        .limit(limit)
        .exec();
      console.log("search 11111");
      const totalProducts = await Product.countDocuments({
        title: { $regex: searchQuery, $options: "i" },
      });
      console.log("search 2222222");
      const totalPages = Math.ceil(totalProducts / limit);
      console.log("search 33333333");
      console.log({ sendProducts, totalPages, page, limit, searchQuery });
      return NextResponse.json(
        { data: { sendProducts, totalPages, totalProducts } },
        { status: 200 }
      );
    } else {
      console.log("nist 11111111");
      const sendProducts = await Product.find() // Post مدل Mongoose شماست
        .skip(indexOfFirstProduct)
        .limit(limit)
        .sort({ _id: -1 })
        .exec();
      const totalProducts = await Product.countDocuments();
      const totalPages = Math.ceil(totalProducts / limit);
      return NextResponse.json(
        { data: { sendProducts, totalPages, totalProducts } },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
  }
}
