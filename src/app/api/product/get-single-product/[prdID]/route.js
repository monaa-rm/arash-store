import { NextResponse } from "next/server";
import connectDB from "@/utiles/connectDB";
import Product from "../../../../../../models/Product";

export async function GET(req, { params }) {
  // تغییر export default به export async function DELETE
  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
  }
  try {
    const { prdID } = await params;
    const existingProduct = await Product.findOne({ _id: prdID });
    if (!existingProduct) {
      return NextResponse.json(
        { error: "چنین محصولی موجود نیست" },
        { status: 422 }
      );
    }
    return NextResponse.json({ data: existingProduct }, { status: 200 });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
  }
}
