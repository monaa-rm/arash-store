import { NextResponse } from "next/server";
import connectDB from "@/utiles/connectDB";
import Blog from "../../../../../models/Blog";
import User from "../../../../../models/User";
import Product from "../../../../../models/Product";
import { Types } from "mongoose";

export async function POST(req) {
  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
  }
  const { orders } = await req.json();
  if (!orders || !Array.isArray(orders) || orders.length === 0) {
    return NextResponse.json(
      { data: { localOrders: [], productsData: [] } },
      { status: 200 }
    );
  }

  const localOrders = [];
  const productsData = [];

  try {
    // ۱. جمع‌آوری شناسه‌های محصولات
    const productIds = orders.map((order) => order.id);
    // ۲. دریافت محصولات مربوطه از دیتابیس
    // از populate برای گرفتن اطلاعات مدل‌های مرتبط (مثل category) استفاده کنید اگر لازم دارید
    const productsFromDB = await Product.find({
      _id: { $in: productIds },
    });
    // .populate('category') // اگر می‌خواهید اطلاعات category را هم بگیرید
    // .populate('creator') // اگر می‌خواهید اطلاعات creator را هم بگیرید
    //   .select("productId title price instock imageSrc"); // فقط فیلدهای مورد نیاز را انتخاب کنید

    // ایجاد یک Map برای دسترسی سریعتر به محصولات بر اساس productId
    const productMap = new Map(
      productsFromDB.map((product) => [product._id.toString(), product])
    );

    // ۳. پردازش هر سفارش
    for (const order of orders) {
      // console.log(";;;;;;;;;;;;;;;;;" , order)
      // const objectId = Types.ObjectId.createFromHexString(order.id)
      // console.log({id:order.id , obj : objectId })
      const product = productMap.get(order.id);
      console.log("product", product);
      // اگر محصول در دیتابیس پیدا نشد (نباید اتفاق بیفتد اگر داده‌ها درست باشند)
      if (!product) {
        console.warn(`Product with ID ${order.id} not found in database.`);
        continue;
      }

      const instock = product.instock;
      let requestedQuantity = order.quantity;

      if (instock === 0) {
        // اگر موجودی صفر است، این محصول را از لیست حذف کن
        continue; // از حلقه رد شو
      } else if (requestedQuantity > instock) {
        // اگر مقدار درخواستی بیشتر از موجودی است، مقدار درخواستی را برابر موجودی کن
        requestedQuantity = instock;
      }

      // اگر پس از اعمال تغییرات، مقدار سفارش هنوز معتبر است (بزرگتر از 0)
      if (requestedQuantity > 0) {
        localOrders.push({
          id: order.id,
          quantity: requestedQuantity, 
          // اطلاعات اضافی برای نمایش در فرانت
          title: product.title,
          price: product.price.howMuch,
          // image:
          //   product?.imageSrc && product?.imageSrc.length > 0
          //     ? product.imageSrc[0].file
          //     : "/default-image.jpg",
        });
        // اطلاعات محصول اصلی را نیز می‌توانیم جمع‌آوری کنیم (در صورت نیاز به نمایش جزئیات بیشتر)
        productsData.push({
          _id: product._id,
          productId: product.productId,
          title: product.title,
          instock: product.instock,
          price: product.price.howMuch,
          unit: product.unit,
          category: product.category,
          quantity: requestedQuantity,
          image:
            product?.imageSrc && product?.imageSrc.length > 0
              ? product?.imageSrc[0].file
              : "/default-image.jpg",
        });
      }
    }
console.log("........................")
console.log({ localOrders, productsData })
    return NextResponse.json({ localOrders, productsData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
  }
}
