export const dynamic = "force-dynamic";
import connectDB from "@/utiles/connectDB";
import { NextResponse } from "next/server";
import TrezSMSClient from "trez-sms-client";
import User from "../../../../../../models/User";

export async function POST(req) {
  try {
    console.log("Starttttttt0000000");
    await connectDB();
    console.log("111111111");
    const { phone } = await req.json();
    console.log("22222222222");
    if (phone.startsWith("0")) {
      return NextResponse.json(
        { error: "شماره موبایل را بدون 0 وارد کنید" },
        { status: 401 }
      );
    }
    const userFullData = await User.findOne({ phone });
    console.log("33333333333");

    const userPhone = userFullData?.phone?.startsWith("0")
      ? userFullData?.phone
      : "0" + userFullData?.phone;
    console.log("4444", userPhone);
    if (!userFullData) {
      return NextResponse.json({ error: "لطفا ثبت نام کنید" }, { status: 401 });
    }
    // if (userFullData.active_code_number < 1) {
    //   return NextResponse.json(
    //     { data: "شما فقط 5 بار میتوانید درخواست پیامک کنید" },
    //     { status: 401 }
    //   );
    // }else{

    const client = new TrezSMSClient(
      process.env.SMS_USERNAME,
      process.env.SMS_PASSWORD
    );
    console.log("5555555555");

    const messageId = await client.autoSendCode(userPhone, "فروشگاه آرش");
    console.log("66666666666");

    //USER ACTIVE CODE NUMBER SHOULD BE DECREASED
    // const new_active_cn = userFullData.active_code_number - 1;
    // const newData = {
    //   active_code_number: new_active_cn,
    // };
    // await User.findByIdAndUpdate(user_id, newData, { new: true });

    // }

    return NextResponse.json(
      { data: "لطفا تلفن همراه خود را چک کنید" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "خطا در ارسال پیامک" }, { status: 500 });
  }
}
