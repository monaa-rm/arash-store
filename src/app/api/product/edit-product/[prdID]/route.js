import { NextResponse } from "next/server";
import connectDB from "@/utiles/connectDB";
import User from "../../../../../../models/User";
import Product from "../../../../../../models/Product";

export async function PATCH(req, { params }) {
  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
  }
  try {
    const { prdID } = await params;
    console.log({prdID})
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
      editor,
    } = await req.json();
    const existingProduct = await Product.findOne({_id : prdID});
    if(!existingProduct){
      return NextResponse.json({ error: "چنین محصولی موجود نیست" }, { status: 422 });
    }
    if (
      !productTitle ||
      !productId ||
      !productPrice ||
      !productCat ||
      !productInsocks ||
      !productUnit ||
      !productImgs ||
      !editor
    ) {
      console.log({prdID})
      return NextResponse.json({ error: "اطلاعات کامل نیست" }, { status: 422 });
    }
    const existingUser = await User.findOne({ phone: editor?.phone });
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

    const updates = {
      title: productTitle,
      productId,
      price: { howMuch: +productPrice, date: Date.now() },
      category: productCat,
      instock: productInsocks,
      unit: productUnit,
      properties: productProperties,
      description: productDesc,
      imageSrc: productImgs,
      // editor: existingUser._id,
    };
     await  Product.findByIdAndUpdate(prdID, updates, { new: true, runValidators: true });

    // console.log(    productTitle,
    //   productId,
    //   productPrice,
    //   productCat,
    //   productInsocks,
    //   productUnit,
    //   productProperties,
    //   productDesc,
    //   productImgs,
    //   editor);

    return NextResponse.json({ data: "محصول ویرایش شد" }, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
  }
}
