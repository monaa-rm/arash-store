import { NextResponse } from "next/server";
import { existsSync, mkdirSync } from "fs";
import fs from "fs/promises";
import path from "path";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import sanitizeFilename from "sanitize-filename";
import connectDB from "@/utiles/connectDB";

const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const creatorRole = formData.get("creatorRole");
    const saveIn = formData.get("saveIn");
    console.log({ file, creatorRole, saveIn });
    const fileName = file?.name;
    const fileExtension = fileName?.split(".").pop().toLowerCase();
    ///// اسم saveIn برای تنظیمات کلی رو  global گذاشتم
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "لطفا وارد حساب کاربری خود شوید" },
        { status: 401 }
      );
    }
    if (creatorRole !== "admin") {
      return NextResponse.json(
        { error: "فقط ادمین میتواند به این قسمت دسترسی داشته باشد" },
        { status: 403 }
      );
    }
    if (!file) {
      return NextResponse.json({ error: "قایلی موجود نیست" }, { status: 400 });
    }
    if (file.size < 1) {
      return NextResponse.json(
        { error: "لطفا عکس را انتخاب کنید" },
        { status: 400 }
      );
    }
    // آرایه ای از پسوندهای مجاز
    const allowedExtensions = ["jpeg", "jpg", "png"];
    // بررسی کنید که آیا پسوند فایل در لیست پسوندهای مجاز وجود دارد یا نه
    if (!allowedExtensions.includes(fileExtension)) {
      return NextResponse.json(
        {
          error:
            "فرمت فایل غیر مجاز است. فقط فایل‌های با فرمت JPEG، JPG و PNG مجاز هستند.",
        },
        { status: 415 }
      );
    }

    const destinationDirPath = path.join(process.cwd(), "public/uploads");
    const newname = Date.now() + file.name;
    const filePath = path.join(destinationDirPath, newname); // مسیر کامل فایل
    // const fileUrl = `/uploads/${newname}`; // URL فایل

    // بررسی وجود دایرکتوری و ایجاد آن در صورت عدم وجود
    // if (!existsSync(destinationDirPath)) {
    //   await fs.mkdir(destinationDirPath, { recursive: true });
    // }
    console.log("1111111111111111");
    // if (file?.name?.toLowerCase().includes(".heic") || file?.name?.toLowerCase().includes(".heif")) {
    //   // پردازش فایل HEIC/HEIF
    //   const { default: heic2any } = await import("heic2any");
    //   console.log("Uploading HEIC... ", filePath);
    //   console.log("12222222222222")

    //   const fileBuffer = Buffer.from(await file.arrayBuffer());
    //   console.log("33333333333")

    //   // تبدیل به JPEG با استفاده از heic2any
    //   const convertedBuffer = await heic2any({ blob: fileBuffer, toType: 'image/jpeg', quality: 0.8 }); // کیفیت 0.8 معادل 80 درصد
    //   console.log("44444444444444")

    //   // ذخیره‌سازی تصویر تبدیل شده
    //   await fs.writeFile(filePath, convertedBuffer);
    //   console.log("555555555555555")

    //   console.log("Uploaded and converted image successfully:", filePath);
    // } else {
    // اگر نه HEIC و نه HEIF باشد، فایل را مستقیم ذخیره کنید

    const fileArrayBuffer = await file.arrayBuffer();
    // await fs.writeFile(filePath, Buffer.from(fileArrayBuffer));
    // }
    const uniqueSuffix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    let originalFilename = file.name.replace(/\.[^/.]+$/, "");
    const sanitizedFilename = sanitizeFilename(originalFilename);
    if (originalFilename.length > 255) {
      originalFilename = originalFilename.slice(0, 255);
    }
    const filename = `${sanitizedFilename}_${uniqueSuffix}.${fileExtension}`;

    const client = new S3Client({
      region: "default",
      endpoint: process.env.LIARA_ENDPOINT,
      credentials: {
        accessKeyId: process.env.LIARA_ACCESS_KEY,
        secretAccessKey: process.env.LIARA_SECRET_KEY,
      },
    });
    const params = {
      Body: fileArrayBuffer,
      Bucket: process.env.LIARA_BUCKET_NAME,
      // Key: "saveIn/" + filename,
      Key: saveIn + "/" + filename,
    };
    await client.send(new PutObjectCommand(params));
    // callback
    client.send(new PutObjectCommand(params), (error, data) => {
      if (error) {
        console.log(error);
        return NextResponse.json(
          { error: "ذخیره تصویر با مشکل مواجه شد" },
          { status: 500 }
        );
      } else {
        console.log(data);
      }
    });
    const fileUrl = `${process.env.GOAL_HOST_URL}/${saveIn}/${filename}`;

    return NextResponse.json(
      { data: fileUrl, name: file.name, type: file.type },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error uploading file:", error); // افزودن لاگ برای دیباگ
    return NextResponse.json({ error: "خطا در آپلود عکس" }, { status: 500 });
  }
}
