import connectDB from "@/utiles/connectDB";
import UserListSinglePage from "@/components/elements/user-list-single-page"; // کامپوننت نمایش دهنده

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import User from "../../../../../../models/User";
import Order from "../../../../../../models/order";
export const metadata = {
  title: "داشبورد ادمین",
  description: "صفحه کاربر",
  robots: {
    index: false,
    follow: false,
  },
};
const UserListSingle = async ({ params }) => {
  const { userId } = params;

  // بررسی احراز هویت و نقش کاربر (فقط ادمین مجاز است)
  const session = await getServerSession(authOptions);
  if (!session || session?.user?.role !== "admin") {
    return notFound();
  }

  // اتصال به پایگاه داده
  await connectDB();

  try {
    // دریافت اطلاعات کاربر
    const user = await User.findById(userId);
    if (!user) {
      // اگر کاربر پیدا نشد، صفحه 404 نمایش داده شود
      return notFound();
    }
    const pipeline = [];
    pipeline.push({
      $match: {
        client: userId,
      },
    });
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
    const orders = await Order.aggregate(pipeline);
    console.log(orders);

    return (
      <UserListSinglePage
        user={JSON.parse(JSON.stringify(user))}
        orders={JSON.parse(JSON.stringify(orders))}
      />
    );
  } catch (error) {
    // ثبت خطا در کنسول سرور
    console.error("Error fetching user or orders:", error);
    // در صورت بروز خطا، صفحه 404 نمایش داده شود
    return notFound();
  }
};

export default UserListSingle;
