import { NextResponse } from "next/server";
import connectDB from "@/utiles/connectDB";
import SiteSetting from "../../../../models/SiteSetting";
import User from "../../../../models/User";

export async function POST(req) {
  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
  }
  console.log("start44444444444444");
  try {
    const {
      title,
      desc,
      phone,
      address,
      email,
      telegram,
      instagram,
      whatsapp,
      youtube,
      siteImages,
      editor,
    } = await req.json();
    console.log({
      title,
      desc,
      phone,
      address,
      email,
      telegram,
      instagram,
      whatsapp,
      youtube,
      siteImages,
      editor,
    });
    if (
      !title.length ||
      !desc.length ||
      //   !address?.length ||
      //   !phone.length ||
      !email.length ||
      !siteImages.length ||
      !editor
    ) {
      return NextResponse.json({ error: "اطلاعات کامل نیست" }, { status: 422 });
    }
    const existingUser = await User.findOne({ phone: editor?.phone });
    if (!existingUser) {
      return NextResponse.json(
        { error: "ارسال کننده محصول معتبر نیست" },
        { status: 403 }
      );
    }
    if (existingUser?.role !== "admin") {
      return NextResponse.json(
        { error: "تنها ادمین به این بخش دسترسی دارد" },
        { status: 403 }
      );
    }
    const sendData = {
      welcomeTitle: title,
      welcomeDescription: desc,
      phone,
      address,
      email,
      telegramLink: telegram,
      instagramLink: instagram,
      whatsappLink: whatsapp,
      youtubeLink: youtube,
      welcomeImages: siteImages,
    };
    const existingSetting = await SiteSetting.findOne();
    if (existingSetting) {
      await SiteSetting.findByIdAndUpdate(existingSetting._id, sendData);
      return NextResponse.json({ data: "اطلاعات ویرایش شد" }, { status: 201 });
    } else {
      await SiteSetting.create(sendData);
      return NextResponse.json({ data: "اطلاعات ویرایش شد" }, { status: 201 });
    }
  } catch (error) {
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
  }
}
