import connectDB from "@/utiles/connectDB";
import { NextResponse } from "next/server";
import Comment from "../../../../../models/Comment";

export async function GET(req) {
  try {
    await connectDB();
    console.log("ok");
  } catch (error) {
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
  }
  try {
    // const data = await req.json();

    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page")) || 1;
    const limit = parseInt(url.searchParams.get("limit")) || 10;

    const indexOfLast = page * limit;
    const indexOfFirst = indexOfLast - limit;
    const pipeline = [];
    pipeline.push({ $unwind: "$productId" });
    pipeline.push({
      $lookup: {
        from: "products",
        let: { itemId: "$productId" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: [
                  "$_id",
                  { $toObjectId: "$$itemId" }, // تبدیل ID به ObjectId
                ],
              },
            },
          },
          {
            $project: { _id: 1, title: 1 }, // فقط imageSrc رو برگردون
          },
        ],
        as: "productDetails",
      },
    });
    pipeline.push({
      $unwind: {
        path: "$productDetails",
        preserveNullAndEmptyArrays: true, // اگه محصولی پیدا نشد، آیتم رو حذف نکن
      },
    });
    // مرتب‌سازی
    pipeline.push({
      $sort: {
        _id: -1, // برای نظم بیشتر در صورت یکسان بودن isPending
      },
    });
    pipeline.push({
      $facet: {
        // برای پیاده‌سازی pagination در aggregate
        data: [{ $skip: indexOfFirst }, { $limit: limit }],
        totalCount: [{ $count: "totalComments" }],
      },
    });
    const data = await Comment.aggregate(pipeline);
    console.log({ result: data[0].data });
    // const sendComments = await Comment.find() // Post مدل Mongoose شماست
    //   .sort({ _id: -1 })
    //   .skip(indexOfFirst)
    //   .limit(limit)
    //   .exec();
    const totalComments = await Comment.countDocuments();
    const totalPages = Math.ceil(totalComments / limit);
    return NextResponse.json(
      { data: { sendComments: data[0].data, totalPages, totalComments } },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
  }
}
