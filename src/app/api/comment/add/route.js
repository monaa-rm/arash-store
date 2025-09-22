import { NextResponse } from "next/server";
import User from "../../../../../models/User";
import connectDB from "@/utiles/connectDB";
import Comment from "../../../../../models/Comment";
import Product from "../../../../../models/Product";

export async function POST(req) {
  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
  }
  try {
    const { cmText, cmEmail, cmName, rating, productId, creator } =
      await req.json();
    console.log({
      cmText,
      cmEmail,
      cmName,
      rating,
      productId,
      creator,
    });
    if (
      !cmText.length ||
      !cmEmail.length ||
      !cmName.length ||
      rating < 0 ||
      !productId.length
    ) {
      return NextResponse.json({ error: "اطلاعات کامل نیست" }, { status: 422 });
    }
    const existingUser = await User.findOne({ phone: creator?.phone });
    const existingProduct = await Product.findOne({ _id: productId });
    if (!existingProduct) {
      return NextResponse.json({ error: "محصول موجود نیست" }, { status: 403 });
    }
    // if (existingUser?.role !== "admin") {
    //   return NextResponse.json(
    //     { error: "تنها ادمین به این بخش دسترسی دارد" },
    //     { status: 403 }
    //   );
    // }
    const sendData = {
      text: cmText,
      email: cmEmail,
      name: cmName,
      rating,
      productId,
      userId: existingUser ? existingUser._id : "",
    };
    if (rating > 0 && rating < 6  ) {
      const oldScores = +existingProduct.scoreNumber * +existingProduct.score;
      const newScores = oldScores + rating;
      const newScore = newScores / (+existingProduct.scoreNumber + 1);
      console.log({ oldScores, newScores, newScore });
      const updates = {
        score: newScore,
        scoreNumber: +existingProduct.scoreNumber + 1,
        commentsNumber: +existingProduct.commentsNumber + 1,
      };
      await Product.findByIdAndUpdate(productId, updates, {
        new: true,
        runValidators: true,
      });
    } else {
      const updates = {
        commentsNumber: +existingProduct.commentsNumber + 1,
      };
      await Product.findByIdAndUpdate(productId, updates, {
        new: true,
        runValidators: true,
      });
    }
   const newComment = await Comment.create(sendData);
    return NextResponse.json({ data: newComment }, { status: 201 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
  }
}
