import { NextResponse } from "next/server";
import connectDB from "@/utiles/connectDB";
import mongoose from "mongoose";
import Comment from "../../../../../../models/Comment";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "../../../../../../models/User";
import Product from "../../../../../../models/Product";

export async function DELETE(req, { params }) {
  // تغییر export default به export async function DELETE
  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
  }
  try {
    const { commentId } = await params;
    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return NextResponse.json({ error: "ایدی نامعتبر است" }, { status: 400 });
    }

    const existingComment = await Comment.findOne({ _id: commentId });
    if (!existingComment) {
      return NextResponse.json(
        { error: "چنین دیدگاهی موجود نیست" },
        { status: 422 }
      );
    }
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "لاگین نیستید" }, { status: 403 });
    }
    console.log({session})
    const existingUser = await User.findOne({ phone: session?.user?.phone });
    console.log(session?.user?.role !== "admin"  , existingComment?.userId !== existingUser?._id.toString() )
    if (
      session?.user?.role !== "admin" &&
      existingComment?.userId !== existingUser?._id.toString()
    ) {
      return NextResponse.json({ error: "عدم دسترسی" }, { status: 403 });
    }
console.log("111",existingUser)
    const existingProduct = await Product.findOne({
      _id: existingComment?.productId,
    });
 if (!existingProduct ) {
      return NextResponse.json({ error: "عدم دسترسی" }, { status: 403 });
    }
        if (existingComment?.rating > 0 && existingComment?.rating < 6  ) {
          console.log("444444444")
          const oldScores = +existingProduct.scoreNumber * +existingProduct.score;
          const newScores = oldScores - existingComment?.rating;
          const newScore = newScores / (+existingProduct.scoreNumber - 1);
          console.log({ oldScores, newScores, newScore });
          const updates = {
            score: newScore,
            scoreNumber: +existingProduct.scoreNumber - 1,
            commentsNumber: +existingProduct.commentsNumber - 1,
          };
          await Product.findByIdAndUpdate(existingProduct?._id, updates, {
            new: true,
            runValidators: true,
          });
        } else {
          console.log("55555")
          const updates = {
            commentsNumber: +existingProduct.commentsNumber - 1,
          };
          await Product.findByIdAndUpdate(existingProduct?._id, updates, {
            new: true,
            runValidators: true,
          });
        }
    const updates = { commentsNumber : +existingProduct?.commentsNumber -1 ,
      scoreNumber : existingComment?.rating == 0 ? existingProduct.scoreNumber : +existingProduct.scoreNumber -1,

    }
    await Comment.findByIdAndDelete(commentId);
    return NextResponse.json({ data: "دیدگاه پاک شد" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting cm:", error);
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
  }
}
