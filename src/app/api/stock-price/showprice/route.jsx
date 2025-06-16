import { NextResponse } from "next/server";
import connectDB from "@/utiles/connectDB";
import SiteSetting from "../../../../../models/SiteSetting";

export async function POST(req) {
  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
  }

  try {
    const { showPriceOrNot } = await req.json();
    const existingSetting = await SiteSetting.findOne();
    if (existingSetting) {
      existingSetting.showPrice = showPriceOrNot;
      await existingSetting.save();
      return NextResponse.json({ data : "succes"}, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
  }
}
