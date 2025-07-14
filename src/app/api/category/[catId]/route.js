import connectDB from "@/utiles/connectDB";
import Category from "../../../../../models/Category";
import { NextResponse } from "next/server";
import User from "../../../../../models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import Product from "../../../../../models/Product";
import mongoose from "mongoose";

export async function PATCH(req, { params }) {
  const { catId } = params;
  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json(
      { error: "خطا در اتصال به سرور" },
      { status: 500 }
    );
  }
  try {
    const { name, link, editorInfo } = await req.json();
    if (!mongoose.Types.ObjectId.isValid(catId)) {
      return NextResponse.json({ error: "ایدی نامعتبر است" }, { status: 400 });
    }
    if (!name || !link || !editorInfo) {
      return NextResponse.json({ error: "اطلاعات کامل نیست" }, { status: 422 });
    }
    const existingUser = await User.findOne({ phone: editorInfo });
    if (!existingUser || existingUser.role !== "admin") {
      return NextResponse.json(
        { error: "فقط ادمین به این قسمت دسترسی دارد" },
        { status: 403 }
      );
    }
    const existingCat = await Category.findOne({ _id: catId });
    if (existingCat) {
      await Category.findByIdAndUpdate(catId, { name, link });

      return NextResponse.json(
        { data: `دسته ${name} ویرایش شد` },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: `این دسته وجود ندارد` },
        { status: 409 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "مشکلی در سرور رخ داده است" },
      { status: 500 }
    );
  }
}
export async function DELETE(req, { params }) {
  const { catId } = await params;
  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json(
      { error: "خطا در اتصال به سرور" },
      { status: 500 }
    );
  }
  try {
    if (!mongoose.Types.ObjectId.isValid(catId)) {
      return NextResponse.json({ error: "ایدی نامعتبر است" }, { status: 400 });
    }
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "لطفا وارد سایت شوید" },
        { status: 403 }
      );
    }

    const existingUser = await User.findOne({ phone: session?.user?.phone });
    if (!existingUser || existingUser.role !== "admin") {
      return NextResponse.json(
        { error: "فقط ادمین به این قسمت دسترسی دارد" },
        { status: 403 }
      );
    }
    const existingCat = await Category.findOne({ _id: catId });

    if (existingCat) {
      await Product.updateMany(
        { "category._id": catId }, // فیلتر: محصولاتی که category با این شناسه دارند
        {
          $pull: {
            category: { _id: catId }, // عملگر pull: حذف category با این شناسه
          },
        }
      );
      await Category.findByIdAndDelete(catId);
      return NextResponse.json({ data: `دسته حذف شد` }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: `این دسته وجود ندارد` },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: "خطایی رخ داده است" }, { status: 500 });
  }
}
