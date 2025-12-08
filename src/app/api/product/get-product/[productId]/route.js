import { NextResponse } from "next/server";
import connectDB from "@/utiles/connectDB";
import mongoose from "mongoose";
import Product from "../../../../../../models/Product";

export async function GET(req, { params }) {
  // تغییر export default به export async function DELETE
  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
  }
  try {
    const { productId } = await params;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return NextResponse.json({ error: "ایدی نامعتبر است" }, { status: 400 });
    }
    const existingProduct = await Product.findOne({ _id: productId });
    if (!existingProduct) {
      return NextResponse.json(
        { error: "چنین محصولی موجود نیست" },
        { status: 422 }
      );
    }
    if (existingProduct?.title) {
      existingProduct.view = existingProduct?.view + 1;
      await existingProduct?.save();
    } else {
      return NextResponse.json(
        { error: "چنین محصولی موجود نیست" },
        { status: 422 }
      );
    }
    const categoryIds = existingProduct?.category?.map((cat) => cat._id);
    const similiarProducts = await Product.find({
      category: {
        $elemMatch: {
          _id: { $in: categoryIds },
        },
      },
    });
    return NextResponse.json({ data: existingProduct , similiarProducts}, { status: 200 });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
  }
}
