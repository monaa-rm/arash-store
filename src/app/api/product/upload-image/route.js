import { NextResponse } from "next/server";
import { existsSync } from "fs";
import fs from "fs/promises";
import path from "path";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const file = formData.get("file");
    console.log("1" , file)
    if (!file) {
      return NextResponse.json({}, { status: 400 });
    }
    if (file.size < 1) {
      return NextResponse.json({ data: "please enter file" }, { status: 400 });
    }

    const destinationDirPath = path.join(process.cwd(), "public/uploads");
    const fileArrayBuffer = await file.arrayBuffer();

    if (!existsSync(destinationDirPath)) {
      await fs.mkdir(destinationDirPath, { recursive: true });
    }

    const newname = Date.now() + file.name;
    const filePath = path.join(destinationDirPath, newname); // مسیر کامل فایل
    const fileUrl = `/uploads/${newname}`; // URL فایل

    await fs.writeFile(
      filePath,
      Buffer.from(fileArrayBuffer)
    );

    return NextResponse.json({ data: fileUrl , name: file.name , type: file.type}, { status: 201 });
  } catch (error) {
    console.error("Error uploading file:", error); // افزودن لاگ برای دیباگ
    return NextResponse.json(
      { error: "error at upload file" },
      { status: 500 }
    );
  }
}
