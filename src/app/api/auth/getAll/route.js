import connectDB from "@/utiles/connectDB";
import User from "../../../../../models/User";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();
    const users = await User?.find();
    return NextResponse.json({ data: users }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "خطا" }, { status: 500 });
  }
}
