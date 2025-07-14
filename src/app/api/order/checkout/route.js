import { NextResponse } from "next/server";
import connectDB from "@/utiles/connectDB";
import User from "../../../../../models/User";
import Order from "../../../../../models/order";

export async function POST(req) {
  try {
    await connectDB();
  } catch (error) {
    console.log("khata1");
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
    console.log({
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
      allCost,
      items,
      client,
    });
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
    const existingUser = await User.findOne({ phone: client?.phone });
    if (!existingUser) {
      return NextResponse.json({ error: "لطفا ثبت نام کنید" }, { status: 403 });
    }
    // if (existingUser?.role !== "admin") {
    //   return NextResponse.json(
    //     { error: "تنها ادمین به این بخش دسترسی دارد" },
    //     { status: 403 }
    //   );
    // }
    const sendData = {
      name : clientName,
      lastName : clientLastName,
      province: clientProvince,
      city : clientCity,
      address : clientAddress,
      postalCode : clientPostalCode,
      phoneNumber : clientPhoneNumber,
      mobileNumber : clientMobileNumber,
      email : clientEmail,
      additionalInfo : clientAdditionalInfo,
      items,
      allCost,
      client: existingUser._id,
    };
    await Order.create(sendData)
    //     // console.log(    productTitle,
    //     //   productId,
    //     //   productPrice,
    //     //   productCat,
    //     //   productInsocks,
    //     //   productUnit,
    //     //   productProperties,
    //     //   productDesc,
    //     //   productImgs,
    //     //   client);

    return NextResponse.json({ data: "خرید انجام شد" }, { status: 201 });
  } catch (error) {
    console.log("khata 2", error);
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
  }
}
