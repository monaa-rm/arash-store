import connectDB from "@/utiles/connectDB";
import { NextResponse } from "next/server";
import User from "../../../../../models/User";
import Order from "../../../../../models/order";

export async function POST(req) {
  try {
    await connectDB();
    console.log("ok");
  } catch (error) {
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
  }
  try {
    const { status, user, orderId } = await req.json();
    console.log({ status, user });
    const existingUser = await User.findOne({ phone: user?.phone });
    if (!existingUser || existingUser.role !== "admin") {
      return NextResponse.json({ error: "خطا" }, { status: 403 });
    }
    const existingOrder = await Order.findOne({ _id: orderId });
    if (!existingOrder) {
      return NextResponse.json({ error: "خطا" }, { status: 404 });
    }
    existingOrder.status = status;
    existingOrder.save();
    return NextResponse.json({ data: "ok" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
  }
}
