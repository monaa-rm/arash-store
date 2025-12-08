import { NextResponse } from "next/server";
import connectDB from "@/utiles/connectDB";
import SiteSetting from "../../../../../models/SiteSetting";

export async function GET(req, { params }) {
  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
  }
  try {
    const data = await SiteSetting.findOne().select({ showPrice: 1 });
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
  }
}
