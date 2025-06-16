import { NextResponse } from "next/server";
import { existsSync, mkdirSync } from "fs";
import fs from "fs/promises";
import path from "path";

// export async function POST(req) {
//   try {
//     const formData = await req.formData();
//     const file = formData.get("file");

//     if (!file) {
//       return NextResponse.json({}, { status: 400 });
//     }
//     if (file.size === 0) {
//       return NextResponse.json({ error: "please enter file" }, { status: 400 });
//     }

//     const destinationDirPath = path.join(process.cwd(), "public/uploads");

//     // Create the uploads directory if it doesn't exist
//     if (!existsSync(destinationDirPath)) {
//       mkdirSync(destinationDirPath, { recursive: true });
//     }

//     const fileName = `${Date.now()}-${file.name}`;
//     const filePath = path.join(destinationDirPath, fileName);

//     // Critical: Prevent directory traversal attacks
//     if (!filePath.startsWith(path.join(process.cwd(), "public/uploads"))) {
//         return NextResponse.json({ error: "Invalid file path" }, { status: 400 });
//     }
// console.log("filesss", file)
//     // Use sharp for image optimization and conversion
//     const optimizedImage = await sharp(await file.arrayBuffer())
//       .resize(800) // Adjust resize dimensions as needed
//       .toFormat('jpeg') // Specify the desired format
//       .jpeg({ quality: 80 }) // Adjust quality (0-100, 80 is a good balance)
//       .toFile(filePath);

//     // // Send the optimized file to the API for cloud storage
//     // const apiUrl = "YOUR_API_ENDPOINT_FOR_UPLOAD"; // Replace with your API endpoint
//     // const response = await fetch(apiUrl, {
//     //   method: "POST",
//     //   body: fs.createReadStream(filePath), // Send the file as a stream
//     //   headers: {
//     //     "Content-Type": "application/octet-stream", // Important for file uploads
//     //   },
//     // });

//     // if (!response.ok) {
//     //   // Handle API errors
//     //   const errorData = await response.json();
//     //   console.error("API upload error:", errorData);
//     //   return NextResponse.json({ error: "API upload failed" }, { status: response.status });
//     // }

//     // Remove the temporary file after successful upload
//     await fs.unlink(filePath);
//     return NextResponse.json({ message: "Image uploaded successfully" });

//   } catch (error) {
//     console.error("Error:", error);
//     return NextResponse.json({ error: "An error occurred" }, { status: 500 });
//   }
// }

// import { NextResponse } from "next/server";
// import { existsSync } from "fs";
// import fs from "fs/promises";
// import path from "path";

// export async function POST(req) {
//   try {
//     const formData = await req.formData();

//     const file = formData.get("file");
//     console.log("1", file);
//     if (!file) {
//       return NextResponse.json({}, { status: 400 });
//     }
//     if (file.size < 1) {
//       return NextResponse.json({ data: "please enter file" }, { status: 400 });
//     }

//     const destinationDirPath = path.join(process.cwd(), "public/uploads");
//     const newname = Date.now() + file.name;
//     const filePath = path.join(destinationDirPath, newname); // مسیر کامل فایل
//     const fileUrl = `/uploads/${newname}`; // URL فایل
//     if (!existsSync(destinationDirPath)) {
//       await fs.mkdir(destinationDirPath, { recursive: true });
//     }

//     if (file?.name?.includes(".HEIC") || file?.name?.includes(".HEIF")) {
//       ////////////
//       console.log("upload heic 111111111" , filePath);
//       const fileBuffer = Buffer.from(await file.arrayBuffer());
//       const optimizedImage = await sharp(fileBuffer)
//         .resize(800) // Adjust resize dimensions as needed
//         .toFormat("jpeg") // Specify the desired format
//         .jpeg({ quality: 80 }) // Adjust quality (0-100, 80 is a good balance)
//         .toFile(filePath);
//       console.log("upload 2222222" , optimizedImage);

//     } else {
//       const fileArrayBuffer = await file.arrayBuffer();

//       await fs.writeFile(filePath, Buffer.from(fileArrayBuffer));

//       return NextResponse.json(
//         { data: fileUrl, name: file.name, type: file.type },
//         { status: 201 }
//       );
//     }
//   } catch (error) {
//     console.error("Error uploading file:", error); // افزودن لاگ برای دیباگ
//     return NextResponse.json(
//       { error: "error at upload file" },
//       { status: 500 }
//     );
//   }
// }

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const creatorRole = formData.get("creatorRole");
    const saveIn = formData.get("saveIn");
    console.log({file,creatorRole , saveIn})
    const fileName = file?.name;
    const fileExtension = fileName?.split(".").pop().toLowerCase();

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
 
    console.log("00000000000");

    const destinationDirPath = path.join(process.cwd(), "public/uploads");
    const newname = Date.now() + file.name;
    const filePath = path.join(destinationDirPath, newname); // مسیر کامل فایل
    const fileUrl = `/uploads/${newname}`; // URL فایل

    // بررسی وجود دایرکتوری و ایجاد آن در صورت عدم وجود
    if (!existsSync(destinationDirPath)) {
      await fs.mkdir(destinationDirPath, { recursive: true });
    }
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

    console.log("666666666666");
    const fileArrayBuffer = await file.arrayBuffer();
    await fs.writeFile(filePath, Buffer.from(fileArrayBuffer));
    // }

    return NextResponse.json(
      { data: fileUrl, name: file.name, type: file.type },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error uploading file:", error); // افزودن لاگ برای دیباگ
    return NextResponse.json({ error: "خطا در آپلود عکس" }, { status: 500 });
  }
}
