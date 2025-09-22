import { NextResponse } from "next/server";
import { hashPassword, verifyPassword } from "@/utiles/auth";
import connectDB from "@/utiles/connectDB";
import {
  isValidPhoneNumber,
  parsePhoneNumberWithError,
} from "libphonenumber-js";
import User from "../../../../../../models/User";

export async function PATCH(req, { params }) {
  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json(
      { error: "خطا در اتصال به سرور" },
      { status: 500 }
    );
  }
  try {
    const { userId } = await params;
    const { name, lastName, phone, password, repassword } = await req.json();
    console.log({ name, lastName, phone, password, repassword });
    if (!phone) {
      return NextResponse.json(
        { error: "لطفا شماره موبایل را وارد کنید" },
        { status: 422 }
      );
    }

    const phoneNumber = parsePhoneNumberWithError(phone, "IR");
    if (!isValidPhoneNumber(phoneNumber?.nationalNumber, "IR")) {
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

    // if (repassword !== password) {
    //   return NextResponse.json(
    //     { error: "رمز عبور و تکرار رمز عبور متفاوت است" },
    //     { status: 422 }
    //   );
    // }
    // // if (password?.length < 6) {
    // //   return NextResponse.json(
    // //     { error: "رمز عبور باید بیشتر از 6 کاراکتر باشد" },
    // //     { status: 422 }
    // //   );
    // // }
    const existUser = await User.findOne({ _id: userId });
    if (!existUser) {
      return NextResponse.json(
        { error: "حساب کاربری موجود نیست" },
        { status: 403 }
      );
    }
    console.log(phone == existUser?.phone)
    if (phone !== existUser?.phone) {
      const existingPhone = await User.findOne({ phone: phone });
      if (existingPhone) {
        return NextResponse.json(
          { error: "این شماره موبایل قبلا ثبت نام کرده است" },
          { status: 422 }
        );
      }
    }
    if (password?.length && repassword?.length) {
      console.log("ramze obor", password?.length, repassword?.length);
      if (password == repassword) {
        return NextResponse.json(
          { error: "رمز عبور جدید و رمز عبور قبلی یکسان است" },
          { status: 400 }
        );
      } else {
        const isvalid = await verifyPassword(
          password,
          existUser?.password
        );
        if (!isvalid) {
          return NextResponse.json(
            { error: "رمز عبور قبلی اشتباه است" },
            { status: 400 }
          );
        } else {
          if (repassword?.length < 6) {
            return NextResponse.json(
              { error: "رمز عبور باید بیشتر از 6 کاراکتر باشد" },
              { status: 422 }
            );
          }
          const hashedPassword = await hashPassword(repassword);
          const updates = { name, lastName, phone, password: hashedPassword };
          await User.findByIdAndUpdate(userId, updates, {
            new: true,
            runValidators: true,
          });
          return NextResponse.json(
            { message: "حساب کاربری ویرایش شد"  , phone},
            { status: 200 }
          );
        }
      }
    } else {
      const updates = { name, lastName, phone };
      await User.findByIdAndUpdate(userId, updates, {
        new: true,
        runValidators: true,
      });
      return NextResponse.json(
        { message: "حساب کاربری ویرایش شد"  , phone},
        { status: 200 }
      );
    }
  } catch (error) {
    console.log("edit", error);
    return NextResponse.json(
      { error: "مشکلی در سرور رخ داده است" },
      { status: 500 }
    );
  }
}
