import connectDB from "@/utiles/connectDB";
import { NextResponse } from "next/server";
import Product from "../../../../models/Product";

export async function GET(req) {
  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
  }
  try {
    const url = new URL(req.url);
    const searchvalue = url.searchParams.get("searchvalue") || "";
    const searchedItems = await Product.find({
      title: { $regex: searchvalue, $options: "i" },
    }).limit(9).select({category : 1 , title : 1});
    return NextResponse.json({ data: searchedItems }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
  }
}
