import { NextResponse } from "next/server";
import connectDB from "@/utiles/connectDB";
import User from "../../../../../models/User";
import Product from "../../../../../models/Product";
import mongoose from "mongoose";

export async function PATCH(req, { params }) {
  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
  }
  try {
    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "ایدی نامعتبر است" },
        { status: 400 }
      );
    }
    const { newstock, newprice, session } = await req.json();
    console.log(newstock < 1, newprice < 1, session);
    if (newprice < 1 || newstock < 1) {
      return NextResponse.json(
        { error: "اطلاعات معتبر نیست" },
        { status: 401 }
      );
    }
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
    const existingProduct = await Product.findOne({ _id: id }).select({
      instock: 1,
      price: 1,
    });
    if (existingProduct) {
      existingProduct.instock = +newstock;
      existingProduct.price = {howMuch : +newprice , date: Date.now() };
      existingProduct.save();
      return NextResponse.json({ data: "ooooo" }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'محصول یافت نشد' }, { status: 404 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
  }
}
