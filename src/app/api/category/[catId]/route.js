import connectDB from "@/utiles/connectDB";
import Category from "../../../../../models/Category";
import { NextResponse } from "next/server";
import User from "../../../../../models/User";

export async function PATCH(req, { params }) {
  const { catId } = params;
  try {
    await connectDB();
    console.log("1111111111");
  } catch (error) {
    return NextResponse.json(
      { error: "خطا در اتصال به سرور" },
      { status: 500 }
    );
  }
  try {
    console.log("2222222222");
    const { name, link, editorInfo } = await req.json();
    console.log("33333333333333");
    if (!name || !link || !editorInfo) {
      return NextResponse.json({ error: "اطلاعات کامل نیست" }, { status: 422 });
    }
    console.log("4444444444444", { editorInfo });
    const existingUser = await User.findOne({ phone: editorInfo });
    console.log("555555555555555");
    if (!existingUser || existingUser.role !== "admin") {
      return NextResponse.json(
        { error: "فقط ادمین به این قسمت دسترسی دارد" },
        { status: 403 }
      );
    }
    console.log("66666666666666", catId);
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

    // } else {
    //   console.log("8888888888");
    //   return NextResponse.json(
    //     { error: "این شماره از قبل ثبت نام کرده است" },
    //     { status: 409 }
    //   );
    // }
  } catch (error) {
    console.log("falsleeeeeeeeee");
    return NextResponse.json(
      { error: "مشکلی در سرور رخ داده است" },
      { status: 500 }
    );
  }
}
export async function DELETE(req, { params }) {
  const { catId } = params;
  try {
    await connectDB();
    console.log("1111111111");
  } catch (error) {
    return NextResponse.json(
      { error: "خطا در اتصال به سرور" },
      { status: 500 }
    );
  }
  try {
    const existingCat = await Category.findOne({ _id: catId });
    if (existingCat) {
      await Category.findByIdAndDelete(catId);

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
