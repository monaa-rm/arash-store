import { NextResponse } from "next/server";
import connectDB from "@/utiles/connectDB";
import mongoose from "mongoose";
import Product from "../../../../../../models/Product";
import Blog from "../../../../../../models/Blog";

export async function GET(req, { params }) {
  // تغییر export default به export async function DELETE
  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
  }
  try {
    const { blogId } = await params;
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return NextResponse.json({ error: "ایدی نامعتبر است" }, { status: 400 });
    }
    const existingBlog = await Blog.findOne({ _id: blogId });
    if (!existingBlog) {
      return NextResponse.json(
        { error: "چنین محصولی موجود نیست" },
        { status: 422 }
      );
    }
    if (!existingBlog?.title) {
      return NextResponse.json(
        { error: "چنین وبلاگی موجود نیست" },
        { status: 422 }
      );
    }

    return NextResponse.json({ data: existingBlog }, { status: 200 });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
  }
}
