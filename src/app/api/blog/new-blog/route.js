import { NextResponse } from "next/server";
import connectDB from "@/utiles/connectDB";
import Blog from "../../../../../models/Blog";
import User from "../../../../../models/User";

export async function POST(req) {
  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
  }
  try {
    const { title, description, file, creator } = await req.json();
    if (!title || !description || !file || !creator) {
      return NextResponse.json({ error: "اطلاعات کامل نیست" }, { status: 422 });
    }
    const existingUser = await User.findOne({ phone: creator?.phone });
    if (!existingUser) {
      return NextResponse.json(
        { error: "ارسال کننده محصول معتبر نیست" },
        { status: 403 }
      );
    }
    if (existingUser?.role !== "admin") {
      return NextResponse.json(
        { error: "تنها ادمین به این بخش دسترسی دارد" },
        { status: 403 }
      );
    }

    const sendData = {
      title,
      description,
      imageSrc: file,
      creator: existingUser._id,
    };
    await Blog.create(sendData);


    return NextResponse.json({ data: "محصول اضافه شد" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
  }
}
