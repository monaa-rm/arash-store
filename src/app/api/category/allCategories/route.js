import { NextResponse } from "next/server";
import Category from "../../../../../models/Category";
import connectDB from "@/utiles/connectDB";

export async function GET(req) {
  try {
    await connectDB();
    const categorydata = await Category.find().sort({createdAt : -1});
    return  NextResponse.json({ data: categorydata, status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "خطا در  سمت سرور ", status: 500 });
  }
}
