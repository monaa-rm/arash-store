import connectDB from "@/utiles/connectDB";
import { NextResponse } from "next/server";
import Comment from "../../../../../../models/Comment";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "../../../../../../models/User";

export async function GET(req, { params }) {
  try {
    await connectDB();
    console.log("ok");
  } catch (error) {
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
  }
  const { cmproductId } = await params;
  console.log({ cmproductId });
  try {
    const sendData = await Comment.find({ productId: cmproductId }).sort({
      _id: -1,
    });
  
    return NextResponse.json({ data: sendData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
  }
}
