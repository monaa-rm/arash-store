import connectDB from "@/utiles/connectDB";
import { NextResponse } from "next/server";
import Order from "../../../../../models/order";

export async function GET(req) {
  try {
    await connectDB();
    console.log("Connected to DB successfully!");
  } catch (error) {
    return NextResponse.json(
      { error: "خطا در اتصال به دیتابیس" },
      { status: 500 }
    );
  }

  try {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page")) || 1;
    const limit = parseInt(url.searchParams.get("limit")) || 50; // تعداد سفارشات در هر صفحه
    const statuses = url.searchParams.get("statuses")
      ? url.searchParams.get("statuses").split(",")
      : ["pending", "shipped", "delivered"];

    // مرحله اول: پیدا کردن و فیلتر کردن سفارشات بر اساس وضعیت
    const pipeline = [
      {
        $match: {
          status: { $in: ["pending", "shipped", "delivered"] },
        },
      },
      {
        $sort: { createdAt: -1 }, // مرتب سازی بر اساس تاریخ ایجاد (جدیدترین اول)
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, // گروه‌بندی بر اساس تاریخ (روز)
          orders: { $push: "$$ROOT" }, // اضافه کردن تمام سند سفارش به آرایه orders
          dailyTotalCost: { $sum: "$allCost" },
        },
      },
      {
        $sort: { _id: -1 }, // مرتب سازی گروه‌ها بر اساس تاریخ (جدیدترین روز اول)
      },
      // مرحله برای صفحه‌بندی
      {
        $skip: (page - 1) * limit,
      },
      {
        $limit: limit,
      },
    ];

    const ordersByDate = await Order.aggregate(pipeline);

    // برای محاسبه تعداد کل گروه‌ها (روزها) برای pagination
    const totalGroupsPipeline = [
      {
        $match: {
          status: { $in: ["pending", "shipped", "delivered"] },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        },
      },
      {
        $count: "totalGroups",
      },
    ];

    const totalGroupsResult = await Order.aggregate(totalGroupsPipeline);
    const totalGroups =
      totalGroupsResult.length > 0 ? totalGroupsResult[0].totalGroups : 0;
    const totalPages = Math.ceil(totalGroups / limit);
    console.log("lllllllll", totalGroupsResult);
    return NextResponse.json(
      {
        data: {
          ordersByDate,
          page,
          limit,
          totalPages,
          totalGroups,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "خطا از سمت سرور در دریافت سفارشات" },
      { status: 500 }
    );
  }
}
