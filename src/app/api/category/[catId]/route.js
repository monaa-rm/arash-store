import connectDB from "@/utiles/connectDB";
import Category from "../../../../../models/Category";
import { NextResponse } from "next/server";
import User from "../../../../../models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

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
    console.log(error)
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
    const existingCat = await Category.findOne({ _id: catId });
    const session = await getServerSession(authOptions);
    console.log({session})
    if (existingCat) {
      // await Category.findByIdAndDelete(catId);

      return NextResponse.json(
        { data: `دسته حذف شد` },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: `این دسته وجود ندارد` },
        { status: 409 }
      );
    }
  } catch (error) {

      return NextResponse.json(
        { error: "خطایی رخ داده است" },
        { status: 409 }
      );
    }
}
