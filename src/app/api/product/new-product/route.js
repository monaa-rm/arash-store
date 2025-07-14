import { NextResponse } from "next/server";
import User from "../../../../../models/User";
import Product from "../../../../../models/Product";
import connectDB from "@/utiles/connectDB";

export async function POST(req) {
  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 }); 
  }
  try {
    const {
      productTitle,
      productId,
      productPrice,
      productCat,
      productInsocks,
      productUnit,
      productProperties,
      productDesc,
      productImgs,
      creator,
    } = await req.json();
    console.log({
      productTitle,
      productId,
      productPrice,
      productCat,
      productInsocks,
      productUnit,
      productProperties,
      productDesc,
      productImgs,
      creator,
    })
    if (
      !productTitle ||
      !productId ||
      !productPrice ||
      // !productCat ||
      !productInsocks ||
      !productUnit ||
      !productImgs ||
      !creator
    ) {
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
      title: productTitle,
      productId,
      price: {howMuch : +productPrice , date : Date.now() },
      category: productCat,
      instock: productInsocks,
      unit: productUnit,
      properties: productProperties,
      description: productDesc,
      imageSrc: productImgs,
      creator: existingUser._id,
    };
await Product.create(sendData)
    // console.log(    productTitle,
    //   productId,
    //   productPrice,
    //   productCat,
    //   productInsocks,
    //   productUnit,
    //   productProperties,
    //   productDesc,
    //   productImgs,
    //   creator);

    return NextResponse.json({ data: "محصول اضافه شد" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
  }
}
