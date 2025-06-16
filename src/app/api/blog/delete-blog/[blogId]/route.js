import { NextResponse } from "next/server";
import connectDB from "@/utiles/connectDB";
import Blog from "../../../../../../models/Blog";

export async function DELETE(req, { params }) {
  // تغییر export default به export async function DELETE
  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
  }
  try {
    const { blogId } = await params;
    console.log({blogId})
    const existingBlog = await Blog.findOne({ _id: blogId });
    if (!existingBlog) {
      return NextResponse.json(
        { error: "چنین وبلاگی موجود نیست" },
        { status: 422 }
      );
    }


        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/product/delete-image`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ imageUrl: existingBlog?.imageSrc }),
          }
        );
        if (!response.ok) {
          throw new Error("خطا در حذف عکس"); // پرتاب خطا برای مدیریت بهتر
        }


    // حذف محصول پس از حذف تمامی تصاویر
    await Blog.findByIdAndDelete(blogId);
    return NextResponse.json({ data: "وبلاگ پاک شد" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting Blog:", error);
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
  }
}
