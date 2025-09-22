import { NextResponse } from "next/server";
import connectDB from "@/utiles/connectDB";

import mongoose from "mongoose";
import Product from "../../../../../../models/Product";
import User from "../../../../../../models/User";

export async function PATCH(req, { params }) {
  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
  }
  try {
    const { suggestId } = await params;
    console.log(suggestId)
    if (!mongoose.Types.ObjectId.isValid(suggestId)) {
      return NextResponse.json({ error: "ایدی نامعتبر است" }, { status: 400 });
    }
    const {
      user,
    } = await req.json();
    console.log(user)
    const existingProduct = await Product.findOne({ _id: suggestId });
    if (!existingProduct) {
      return NextResponse.json(
        { error: "چنین محصولی موجود نیست" },
        { status: 422 }
      );
    }
console.log("ooooooooooooooooooooo")
    const existingUser = await User.findOne({ phone: user?.phone });
    if (!existingUser) {
      return NextResponse.json(
        { error: "ارسال کننده محصول معتبر نیست" },
        { status: 403 }
      );
    }
    console.log({existingUser})
    if (existingUser?.role !== "admin") {
      return NextResponse.json(
        { error: "تنها ادمین به این بخش دسترسی دارد" },
        { status: 403 }
      );
    }
console.log({existingUser})
    const updates = {
      suggest: !existingProduct?.suggest,
    };
    await Product.findByIdAndUpdate(suggestId, updates, {
      new: true,
      runValidators: true,
    });

    return NextResponse.json({ data: "محصول ویرایش شد" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
  }
}
