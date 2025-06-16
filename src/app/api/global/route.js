import connectDB from "@/utiles/connectDB";
import SiteSetting from "../../../../models/SiteSetting";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
  }
  try {
    const setting = await SiteSetting.findOne().select({ showPrice: 1 });
    return NextResponse.json({ data: setting }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
  }
}
