import connectDB from "@/utiles/connectDB";
import Category from "../../../../../models/Category";
import { NextResponse } from "next/server";
import User from "../../../../../models/User";

export async function POST(req) {
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
    const { name, link, creatorInfo } = await req.json();
    console.log("33333333333333");
    if (!name || !link || !creatorInfo) {
      return NextResponse.json({ error: "اطلاعات کامل نیست" }, { status: 422 });
    }
    console.log("4444444444444", { creatorInfo });
    const existingUser = await User.findOne({ phone: creatorInfo });
    console.log("555555555555555");
    if (!existingUser || existingUser.role !== "admin") {
      return NextResponse.json(
        { error: "فقط ادمین به این قسمت دسترسی دارد" },
        { status: 403 }
      );
    }
    console.log("66666666666666");
    const existingCat = await Category.findOne({ $or: [{ name : name }, { link : link }] });
if(!existingCat){
    await Category.create({
        name,
        link,
        creatorId: existingUser._id,
      });
      console.log("77777777777777");
      return NextResponse.json(
        { data: `دسته ${name} ایجاد شد` },
        { status: 201 }
      );
}else {
    return NextResponse.json(
        { error: `این دسته از قبل وجود دارد`},
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
