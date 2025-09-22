import connectDB from "@/utiles/connectDB";
import { NextResponse } from "next/server";
import Product from "../../../../../models/Product";

export async function POST(req) {
  try {
    await connectDB();
    console.log("ok");
  } catch (error) {
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
  }
  try {
    const { favItems } = await req.json();

    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page")) || 1;
    const limit = parseInt(url.searchParams.get("limit")) || 12;
    const searchQuery = url.searchParams.get("query") || "";
    const showsuggest = url.searchParams.get("showsuggest") || false;

    const indexOfLastProduct = page * limit;
    const indexOfFirstProduct = indexOfLastProduct - limit;

    const sendProducts = await Product.find({ _id: { $in: favItems } }) // Post مدل Mongoose شماست
      .sort(showsuggest ? { suggest: -1 } : { _id: -1 })
      .skip(indexOfFirstProduct)
      .limit(limit)
      .exec();
    const totalProducts = await Product.countDocuments({ _id: { $in: favItems } });
    const totalPages = Math.ceil(totalProducts / limit);
    return NextResponse.json(
      { data: { sendProducts, totalPages, totalProducts } },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
  }
}
