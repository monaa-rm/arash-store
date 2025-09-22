import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import connectDB from "@/utiles/connectDB";
import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";

export async function DELETE(req) {
  try {
    await connectDB();
    const { imageUrl } = await req.json(); // گرفتن اسم فایل از body
    const url = new URL(req.url);
    const saveIn = url.searchParams.get("saveIn") || "";
    console.log("imageUrl:", saveIn);

    // بررسی اینکه آیا imageUrl وجود دارد یا نه
    if (!imageUrl) {
      return NextResponse.json(
        { error: "Image URL is required" },
        { status: 400 }
      );
    }

    // ساخت مسیر فایل
    // const filePath = path.join(process.cwd(), "public", imageUrl);

    // try {
    //   // بررسی وجود فایل
    //   await fs.access(filePath);
    //   // اگر فایل وجود داشته باشد، آن را حذف کنید
    //   await fs.unlink(filePath);
    //   return NextResponse.json(
    //     { message: "File deleted successfully" },
    //     { status: 200 }
    //   );
    // } catch (error) {
    //   if (error.code === "ENOENT") {
    //     // اگر فایل وجود ندارد، بدون هیچ خطا فقط پیام موفقیت برگردانید
    //     console.log("File does not exist, nothing to delete.");
    //     return NextResponse.json(
    //       { message: "File does not exist, nothing to delete." },
    //       { status: 200 }
    //     );
    //   } else {
    //     // در صورت بروز هر خطای دیگری
    //     console.error("Error deleting file:", error);
    //     return NextResponse.json(
    //       { error: "Error deleting file" },
    //       { status: 500 }
    //     );
    //   }
    // }
    const baseUrl = `${process.env.GOAL_HOST_URL}/${saveIn}/`;
    const modifiedUrl = imageUrl?.replace(baseUrl, "");
    console.log({ imageUrl });
    console.log({ modifiedUrl });
    try {
      const client = new S3Client({
        region: "default",
        endpoint: process.env.LIARA_ENDPOINT,
        credentials: {
          accessKeyId: process.env.LIARA_ACCESS_KEY,
          secretAccessKey: process.env.LIARA_SECRET_KEY,
        },
      });
      const params = {
        Bucket: process.env.LIARA_BUCKET_NAME,
        Key: `${saveIn}/${modifiedUrl}`,
      };
      await client.send(new DeleteObjectCommand(params));
      return NextResponse.json(
        { message: "File deleted successfully" },
        { status: 200 }
      );
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.error("Error parsing request body:", error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
