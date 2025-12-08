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
    const { freeSending } = await req.json();
    console.log({ freeSending });
    const existingSetting = await SiteSetting.findOne();
    if (existingSetting) {
      existingSetting.freeSending = freeSending;
      existingSetting.updatedAt = new Date();

      await existingSetting.save();
      return NextResponse.json({ data: "succes" }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
  }
}
