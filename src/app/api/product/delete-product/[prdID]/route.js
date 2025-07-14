import { NextResponse } from "next/server";
import Product from "../../../../../../models/Product";
import connectDB from "@/utiles/connectDB";
import mongoose from "mongoose";

export async function DELETE(req, { params }) {
  // تغییر export default به export async function DELETE
  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
  }
  try {
    const { prdID } = await params;
    if (!mongoose.Types.ObjectId.isValid(prdID)) {
      return NextResponse.json(
        { error: "ایدی نامعتبر است" },
        { status: 400 }
      );
    }
    const existingProduct = await Product.findOne({ _id: prdID });
    if (!existingProduct) {
      return NextResponse.json(
        { error: "چنین محصولی موجود نیست" },
        { status: 422 }
      );
    }
    const images = existingProduct.imageSrc;

    // استفاده از Promise.all برای اطمینان از حذف تمامی تصاویر قبل از حذف محصول
    await Promise.all(
      images.map(async (element) => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/product/delete-image`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ imageUrl: element?.file }),
          }
        );
        if (!response.ok) {
          throw new Error("خطا در حذف عکس"); // پرتاب خطا برای مدیریت بهتر
        }
      })
    );

    // حذف محصول پس از حذف تمامی تصاویر
    await Product.findByIdAndDelete(prdID);
    return NextResponse.json({ data: "محصول پاک شد" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
  }
}
