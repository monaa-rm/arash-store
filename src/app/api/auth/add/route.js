import { NextResponse } from "next/server";
import User from "../../../../../models/User";
import { hashPassword } from "@/utiles/auth";
import connectDB from "@/utiles/connectDB";
import { isValidPhoneNumber, parsePhoneNumberWithError } from "libphonenumber-js";

export async function POST(req) {
  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json(
      { error: "خطا در اتصال به سرور" },
      { status: 500 }
    );
  }
  try {
    const { phone, password, repeatPassword } = await req.json();
    console.log({ phone, password, repeatPassword });
    console.log("1111111");
    if (!phone || !repeatPassword || !password) {
      return NextResponse.json(
        { error: "لطفا اطلاعات معتبر وارد کنید" },
        { status: 422 }
      );
    }

    const phoneNumber = parsePhoneNumberWithError(phone, "IR");
console.log("phone numbbbbb" , phoneNumber)
    if (!isValidPhoneNumber(phoneNumber?.nationalNumber , "IR")) {
      return NextResponse.json(
        { error: "شماره موبایل معتبر نیست." },
        { status: 422 }
      );
    }

    const nationalNumber = phoneNumber?.nationalNumber;

    // Check if the number starts with 9 (common Iranian mobile prefix)
    if (!/^(9)/.test(nationalNumber)) {
      return NextResponse.json(
        { error: "شماره موبایل باید با 09 یا 9 شروع شود." },
        { status: 422 }
      );
    }


    console.log("222222");
    if (repeatPassword !== password) {
      return NextResponse.json(
        { error: "رمز عبور و تکرار رمز عبور متفاوت است" },
        { status: 422 }
      );
    }
    console.log("33333333");
    if (password?.length < 8) {
      return NextResponse.json(
        { error: "رمز عبور باید بیشتر از 6 کاراکتر باشد" },
        { status: 422 }
      );
    }
    console.log("44444444444444444");
    const existingUser = await User.findOne({ phone: phone });
    console.log("5555555555555");
    if (!existingUser) {
      const hashedPassword = await hashPassword(password);
      console.log("66666666666666");
      await User.create({
        phone,
        password: hashedPassword,
      });
      console.log("77777777777777");
      return NextResponse.json(
        { message: "حساب کاربری ایجاد شد" },
        { status: 201 }
      );
    } else {
      console.log("8888888888");
      return NextResponse.json(
        { error: "این شماره از قبل ثبت نام کرده است" },
        { status: 409 }
      );
    }
  } catch (error) {
    console.log("sign up", error);
    return NextResponse.json(
      { error: "مشکلی در سرور رخ داده است" },
      { status: 500 }
    );
  }
}
