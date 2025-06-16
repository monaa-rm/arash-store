
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function DELETE(req) {
  try {
    const { imageUrl } = await req.json(); // گرفتن اسم فایل از body
    console.log("imageUrl:", imageUrl);

    // بررسی اینکه آیا imageUrl وجود دارد یا نه
    if (!imageUrl) {
      return NextResponse.json(
        { error: "Image URL is required" },
        { status: 400 }
      );
    }

    // ساخت مسیر فایل
    const filePath = path.join(process.cwd(), "public", imageUrl);

    try {
      // بررسی وجود فایل
      await fs.access(filePath);
      // اگر فایل وجود داشته باشد، آن را حذف کنید
      await fs.unlink(filePath);
      return NextResponse.json(
        { message: "File deleted successfully" },
        { status: 200 }
      );
    } catch (error) {
      if (error.code === "ENOENT") {
        // اگر فایل وجود ندارد، بدون هیچ خطا فقط پیام موفقیت برگردانید
        console.log("File does not exist, nothing to delete.");
        return NextResponse.json(
          { message: "File does not exist, nothing to delete." },
          { status: 200 }
        );
      } else {
        // در صورت بروز هر خطای دیگری
        console.error("Error deleting file:", error);
        return NextResponse.json(
          { error: "Error deleting file" },
          { status: 500 }
        );
      }
    }
  } catch (error) {
    console.error("Error parsing request body:", error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}

// import { NextResponse } from "next/server";
// import fs from "fs/promises";
// import path from "path";

// export async function DELETE(req) {
//   try {
//     const { imageUrl } = await req.json(); // گرفتن اسم فایل از body
//     console.log("imageUrl", imageUrl);
//     // بک‌اسلش به عنوان یه کاراکتر escape استفاده می‌شه
//     // const newName = imageUrl.replace("G:\\projects\\arash-store\\public","")
//     // console.log("newName" ,newName)
//     if (!imageUrl) {
//       return NextResponse.json(
//         { error: "Image URL is required" },
//         { status: 400 }
//       );
//     }

//     const filePath = path.join(process.cwd(), "public", imageUrl);

//     try {
//       await fs.access(filePath);
//       await fs.unlink(filePath);
//       return NextResponse.json(
//         { message: "File deleted successfully" },
//         { status: 200 }
//       );
//     } catch (error) {
//       console.error("Error deleting file:", error);
//       return NextResponse.json(
//         { error: "Error deleting file" },
//         { status: 500 }
//       );
//     }
//   } catch (error) {
//     console.error("Error parsing request body:", error);
//     return NextResponse.json(
//       { error: "Invalid request body" },
//       { status: 400 }
//     );
//   }
// }
