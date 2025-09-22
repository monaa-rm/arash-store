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
    const catSlug = url.searchParams.get("catSlug") || "";
    if (!catSlug?.length) {
      return NextResponse.json({ data: [] }, { status: 200 });
    }
    const indexOfLastProduct = page * limit;
    const indexOfFirstProduct = indexOfLastProduct - limit;

    const sendProducts = await Product.find({
      category: {
        $elemMatch: {
          link: catSlug,
        },
      },
    }) // Post مدل Mongoose شماست
      .sort({ _id: -1 })
      .skip(indexOfFirstProduct)
      .limit(limit)
      .exec();
    const totalProducts = await Product.countDocuments({
      category: {
        $elemMatch: {
          link: catSlug,
        },
      },
    });
    const totalPages = Math.ceil(totalProducts / limit);
    return NextResponse.json(
      { data: { sendProducts, totalPages, totalProducts } },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
  }
}
