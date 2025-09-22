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
    const limit = parseInt(url.searchParams.get("limit")) || 12;
    const searchQuery = url.searchParams.get("query") || "";
    const showsuggest = url.searchParams.get("showsuggest") || false;

    const indexOfLastProduct = page * limit;
    const indexOfFirstProduct = indexOfLastProduct - limit;
    console.log("start");
    if (searchQuery) {
      // filter.title = { $regex: searchQuery, $options: 'i' };
      const sendProducts = await Product.find({
        title: { $regex: searchQuery, $options: "i" },
      })
        .sort(
          showsuggest ? {  suggest: -1 , instock: -1} : { instock: -1, _id: -1 }
        )
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
      const sendProducts = await Product.find() // Post مدل Mongoose شماست
        .sort(
          showsuggest ? {  suggest: -1 , instock: -1 } : { instock: -1, _id: -1 }
        )
        .skip(indexOfFirstProduct)
        .limit(limit)
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
