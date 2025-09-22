import connectDB from "@/utiles/connectDB";
import { NextResponse } from "next/server";
import Order from "../../../../../models/order";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import User from "../../../../../models/User";

export async function GET(req , ) {
  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
  }
  try {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page")) || 1;
    const limit = parseInt(url.searchParams.get("limit")) || 10;
    const searchQuery = url.searchParams.get("query") || "";

    const indexOfLastOrder = page * limit;
    const indexOfFirstOrder = indexOfLastOrder - limit;
    const session = await getServerSession(authOptions)
    if(!session) {
          return NextResponse.json({ error: "خطا" }, { status: 403 });  
    }
    const existingUser = await User.findOne({phone : session?.user?.phone})
        if(!existingUser) {
          return NextResponse.json({ error: "خطا" }, { status: 403 });  
    }
    const userId = existingUser?._id.toString();
    const pipeline = [];
    pipeline.push({
      $match: {client : userId},
    });

    // مرحله 1: $unwind برای باز کردن items
    pipeline.push({ $unwind: "$items" });

    // مرحله 2: $lookup برای گرفتن اطلاعات محصول
    pipeline.push({
      $lookup: {
        from: "products",
        let: { itemId: "$items.id" },
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
            $project: { _id: 0, imageSrc: 1 }, // فقط imageSrc رو برگردون
          },
        ],
        as: "productDetails",
      },
    });

    // مرحله 3: $unwind برای دسترسی به productDetails
    pipeline.push({
      $unwind: {
        path: "$productDetails",
        preserveNullAndEmptyArrays: true, // اگه محصولی پیدا نشد، آیتم رو حذف نکن
      },
    });

    // مرحله 4: $addFields برای اضافه کردن imageSrc به آیتم
    pipeline.push({
      $addFields: {
        "items.imageSrc": "$productDetails.imageSrc", // اضافه کردن imageSrc به آیتم
      },
    });

    // مرحله 5: $group برای جمع‌آوری مجدد items (اختیاری)
    pipeline.push({
      $group: {
        _id: "$_id",
        name: { $first: "$name" },
        lastName: { $first: "$lastName" },
        status: { $first: "$status" },
        client: { $first: "$client" },
        items: { $push: "$items" }, // جمع‌آوری مجدد items
        createdAt: { $first: "$createdAt" },
        updatedAt: { $first: "$updatedAt" },
        __v: { $first: "$__v" },
      },
    });
    pipeline.push({
      $addFields: {
        isPending: {
          $cond: { if: { $eq: ["$status", "pending"] }, then: 0, else: 1 },
        },
      },
    });
    // مرتب‌سازی
    pipeline.push({
      $sort: {
        isPending: 1, // مرتب‌سازی بر اساس فیلد محاسبه شده
        _id: -1, // برای نظم بیشتر در صورت یکسان بودن isPending
      },
    });
    pipeline.push({
      $facet: {
        // برای پیاده‌سازی pagination در aggregate
        data: [{ $skip: indexOfFirstOrder }, { $limit: limit }],
        totalCount: [{ $count: "totalOrders" }],
      },
    });
    const results = await Order.aggregate(pipeline);
    const sendOrders = results[0]?.data || [];
    const totalOrders = results[0]?.totalCount[0]?.totalOrders || 0;
    const totalPages = Math.ceil(totalOrders / limit);
    console.log({ results });
    return NextResponse.json(
      { data: { sendOrders, totalPages, totalOrders } },
      { status: 200 }
    );
} catch (error) {
    console.log(error);
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
  }
}
