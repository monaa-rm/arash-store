import connectDB from "@/utiles/connectDB";
import { NextResponse } from "next/server";
import SiteSetting from "../../../../../models/SiteSetting";
import Product from "../../../../../models/Product";
import Order from "../../../../../models/order";
import Blog from "../../../../../models/Blog";

export async function GET(req) {
  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
  }
  try {
    const welcomeData = await SiteSetting.findOne();
    const newproducts = await Product.find().limit(6).sort({ _id: -1 });
    const suggestions = await Product.find({ suggest: true }).limit(6);
    const randomProduct = await Product.aggregate([
      { $sample: { size: 5 } },
      {
        $project: {
          _id: 1,
          title: 1,
          imageSrc: 1,
        },
      },
    ]);

    ///////////////////////////////////////////////////////////////////
    const bestSellingProducts = await Order.aggregate([
      // مرحله 1: باز کردن آرایه `items`
      { $unwind: "$items" },

      // مرحله جدید: تبدیل 'items.id' از رشته به ObjectId
      {
        $addFields: {
          // یک فیلد جدید به نام `convertedItemId` ایجاد می‌کنیم
          // که 'items.id' رو به ObjectId تبدیل می‌کنه.
          convertedItemId: { $toObjectId: "$items.id" },
        },
      },

      // مرحله 2: گروه بندی بر اساس `convertedItemId` و شمردن تکرارها
      {
        $group: {
          _id: "$convertedItemId", // حالا بر اساس ObjectId گروه بندی می‌کنیم
          totalSold: { $sum: "$items.quantity" },
        },
      },

      // مرحله 3: مرتب سازی بر اساس `totalSold` نزولی
      { $sort: { totalSold: -1 } },

      // مرحله 4: محدود کردن تعداد نتایج
      { $limit: 10 },

      // مرحله 5: پیوست کردن اطلاعات کامل محصول از کالکشن `Product`
      {
        $lookup: {
          from: Product.collection.name,
          localField: "_id", // حالا _id در این مرحله ObjectId هست
          foreignField: "_id", // و این هم ObjectId هست، پس match میشه
          as: "productDetails",
        },
      },

      // مرحله 6: باز کردن آرایه `productDetails`
      { $unwind: "$productDetails" },

      // مرحله 7: انتخاب فیلدهای مورد نیاز و تغییر نام
      {
        $project: {
          _id: "$productDetails._id",
          productId: "$productDetails.productId",
          title: "$productDetails.title",
          price: "$productDetails.price",
          imageSrc: "$productDetails.imageSrc",
          // image: { $arrayElemAt: ['$productDetails.imageSrc.file', 0] },
          instock: "$productDetails.instock",
          unit: "$productDetails.unit",
          totalSold: 1,
        },
      },
    ]);
  const blogData = await Blog.find().limit(3).sort({ _id: -1 });

    return NextResponse.json(
      { data: { welcomeData, newproducts, suggestions, bestSellingProducts  , blogData} },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
  }
}
