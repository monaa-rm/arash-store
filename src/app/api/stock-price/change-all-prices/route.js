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
    const { adjustmentValue, operation, session } = await req.json();
    console.log(adjustmentValue, operation, session);
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

    if (
      typeof +adjustmentValue !== "number" ||
      (operation !== "add" && operation !== "subtract")
    ) {
      return NextResponse.json(
        { error: "اطلاعات معتبر نیست" },
        { status: 400 }
      );
    }

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

    await Product.updateMany({}, updateOperation);

    return NextResponse.json(
      { data: "عملیات با موفقیت انجام شد" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
  }
}
