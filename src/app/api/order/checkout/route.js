import { NextResponse } from "next/server";
import connectDB from "@/utiles/connectDB";
import User from "../../../../../models/User";
import Order from "../../../../../models/order";
import Product from "../../../../../models/Product";

export async function POST(req) {
  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
  }
  try {
    const {
      clientName,
      clientLastName,
      clientProvince,
      clientCity,
      clientAddress,
      clientPostalCode,
      clientPhoneNumber,
      clientMobileNumber,
      clientEmail,
      clientAdditionalInfo,
      items,
      allCost,
      client,
    } = await req.json();

    if (!items?.length) {
      return NextResponse.json(
        { error: "هیچ محصولی انتخاب نکرده اید" },
        { status: 422 }
      );
    }
    if (
      !clientName?.length ||
      !clientLastName?.length ||
      !clientProvince?.id ||
      !clientCity?.id ||
      !clientAddress?.length ||
      !clientPostalCode?.length ||
      !clientMobileNumber?.length ||
      !client?.phone
    ) {
      return NextResponse.json({ error: "اطلاعات کامل نیست" }, { status: 422 });
    }
    if (clientName?.length > 50 || clientLastName?.length > 50) {
      return NextResponse.json(
        { error: "نام یا نام خانوادگی طولانی است" },
        { status: 422 }
      );
    }
    const existingUser = await User.findOne({ phone: client?.phone });
    if (!existingUser) {
      return NextResponse.json({ error: "لطفا ثبت نام کنید" }, { status: 403 });
    }
    // بررسی موجودی قبل از ایجاد سفارش (یک مرحله مهم دیگر)
    // این قسمت اختیاری است ولی به شدت توصیه می‌شود
    // برای جلوگیری از Over-selling
    for (const item of items) {
      const product = await Product.findById(item?.id);
      if (!product || product?.instock < item?.quantity) {
        return NextResponse.json(
          {
            error: `موجودی کافی برای محصول ${
              product?.title || item.id
            } وجود ندارد.`,
          },
          { status: 409 } // Conflict
        );
      }
    }
    const sendData = {
      name: clientName,
      lastName: clientLastName,
      province: clientProvince,
      city: clientCity,
      address: clientAddress,
      postalCode: clientPostalCode,
      phoneNumber: clientPhoneNumber,
      mobileNumber: clientMobileNumber,
      email: clientEmail,
      additionalInfo: clientAdditionalInfo,
      items,
      allCost,
      client: existingUser._id,
    };
    await Order.create(sendData);
    // **********************************************
    // await Promise.all(
    //   items.map(async (item) => {
    //     // برای هر محصول در سفارش:
    //     // 1. با استفاده از _id محصول، آن را در کالکشن Product پیدا می‌کنیم.
    //     // 2. با استفاده از عملگر $inc (increment/decrement)، مقدار inStock را به اندازه quantity کاهش می‌دهیم.
    //     await Product.findByIdAndUpdate(
    //       item?.id,
    //       { $inc: { instock: -item?.quantity } }, // -item.quantity یعنی کم کردن از موجودی
    //       { new: true } // {new: true} باعث می‌شود که سند به‌روز شده برگردانده شود (اختیاری)
    //     );
    //   })
    // );
     await Promise.all(
      items.map(async (item) => {
        await Product.findByIdAndUpdate(
          item._id,
          // از یک pipeline به روزرسانی استفاده می‌کنیم تا مطمئن شویم inStock منفی نمی‌شود
          [
            {
              $set: {
                inStock: {
                  // $max: [0, {$subtract: ["$inStock", item.quantity]}]
                  // این یعنی: inStock جدید برابر است با مقدار بزرگتر بین 0 و (inStock فعلی منهای quantity سفارش شده)
                  // به این ترتیب، اگر نتیجه کم کردن منفی شد، مقدار 0 انتخاب می‌شود.
                  $max: [0, { $subtract: ["$instock", +item?.quantity] }],
                },
              },
            },
          ],
          { new: true } // {new: true} باعث می‌شود که سند به‌روز شده برگردانده شود (اختیاری)
        );
      })
    );
    // **********************************************

    if (!existingUser?.name.length || !existingUser?.lastName.length) {
      if (!existingUser?.name.length) existingUser.name = clientName;
      if (!existingUser?.lastName.length)
        existingUser.lastName = clientLastName;
      existingUser.save();
    }

    return NextResponse.json({ data: "خرید انجام شد" }, { status: 201 });
  } catch (error) {
    console.log("khata 2", error);
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
  }
}
