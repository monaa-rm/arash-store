import { NextResponse } from "next/server";
import connectDB from "@/utiles/connectDB";
import User from "../../../../../models/User";
import Product from "../../../../../models/Product";

export async function PATCH(req) {
  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
  }

  try {
    const { adjustmentValue, operation, session, categoryLink } =
      await req.json(); // دریافت categoryLink از ریکوئست
    console.log({ adjustmentValue, operation, session, categoryLink });
    const user = await User.findOne({ phone: session?.phone });

    if (!session?.phone?.length) {
      return NextResponse.json(
        { error: "لطفا وارد سایت شوید" },
        { status: 401 }
      );
    }

    if (!user) {
      return NextResponse.json({ error: "کاربر یافت نشد" }, { status: 404 });
    }

    if (user.role !== "admin") {
      return NextResponse.json(
        { error: "تنها ادمین به این بخش دسترسی دارد" },
        { status: 403 }
      );
    }

    // اعتبارسنجی adjustmentValue و تبدیل به عدد
    const parsedAdjustmentValue = Number(adjustmentValue);
    if (isNaN(parsedAdjustmentValue)) {
      return NextResponse.json(
        { error: "مقدار افزایش/کاهش معتبر نیست" },
        { status: 400 }
      );
    }

    if (operation !== "add" && operation !== "subtract") {
      return NextResponse.json(
        { error: "اطلاعات نامعتبر است" },
        { status: 400 }
      );
    }

    // ساختن فیلتر برای دسته‌بندی
    const filter = { "category.link": categoryLink }; // فیلتر بر اساس categoryLink
    let updateOperation;
    if (operation === "add") {
      updateOperation = {
        $inc: { "price.howMuch": +adjustmentValue }, // افزایش/کاهش howMuch
        $set: { "price.date": Date.now }, // تاریخ جدید
      };
    } else if (operation === "subtract") {
      updateOperation = {
        $inc: { "price.howMuch": -+adjustmentValue }, // افزایش/کاهش howMuch
        $set: { "price.date": Date.now() }, // تاریخ جدید
      };
    } else {
      return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
    }

    // آپدیت محصولات بر اساس فیلتر دسته‌بندی
    const result = await Product.updateMany(filter, updateOperation);

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { error: "هیچ محصولی با این دسته‌بندی یافت نشد" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { data: "عملیات با موفقیت انجام شد" },
      { status: 200 }
    );
  } catch (error) {
    console.error("خطا در آپدیت محصولات:", error);
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
  }
}
