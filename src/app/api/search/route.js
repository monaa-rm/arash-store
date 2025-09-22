import connectDB from "@/utiles/connectDB";
import { NextResponse } from "next/server";
import Product from "../../../../models/Product";
import { getSortQuery } from "@/utiles/utils-func";

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
    const searchvalue = url.searchParams.get("searchvalue") || "";
    const minprice = url.searchParams.get("minprice") || 0;
    const maxprice = url.searchParams.get("maxprice") ;
    const category = url.searchParams.get("category") || null;
    const sortby = url.searchParams.get("sortby") || "default";
    let filter = {};
    const indexOfLastProduct = page * limit;
    const indexOfFirstProduct = indexOfLastProduct - limit;
    if (searchvalue.length) {
      filter.title = { $regex: searchvalue, $options: "i" };
    }
    if (minprice || +maxprice) {
      filter["price.howMuch"] = { $gte: +minprice, $lte: +maxprice };
    }
    if (category?.length && category != null) {
      filter["category.link"] = { $in: [category] };
    }
    console.log(sortby ,getSortQuery(sortby))
    const sendProducts = await Product.find(filter) // Post مدل Mongoose شماست
      .skip(indexOfFirstProduct)
      .limit(limit)
      .sort(getSortQuery(sortby))
      .exec();

    const totalProducts = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / limit);
    return NextResponse.json(
      { data: { sendProducts, totalPages, totalProducts } },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
  }
}
