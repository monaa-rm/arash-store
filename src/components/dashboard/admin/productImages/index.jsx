"use client";
import React, { useState, useRef, useEffect } from "react";
import { LuImagePlus, LuX } from "react-icons/lu";
import { FiUploadCloud } from "react-icons/fi";
import Image from "next/image";

const ProductImages = ({
  files,
  setFiles,
  productImgs,
  setProductImgs,
  errorArray,
  title,
}) => {
  const [uploadProgress, setUploadProgress] = useState({});
  const fileInputRef = useRef(null);
  const [uploadedFiles, setUploadedFiles] = useState([]); // فایل های اپلود شده
  const [errormsg, setErrormsg] = useState("");

  const handleFileChange = (e) => {
    console.log(files?.length + e.target?.files?.length)
    if (files?.length + e.target?.files?.length  < 7) {
    const newFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }

  };

  const handleRemoveFile = async (file, index) => {
    try {
      console.log(file)
      // const fileToRemove = productImgs[index].file;
      // console.log(fileToRemove);
      setProductImgs((prevFiles) => {
        const newFiles = [...prevFiles];
        const result = newFiles.filter(item =>{
          console.log(item , file.name ,item?.file?.name !== file.name)

          return item?.name !== file.name})
        // newFiles.splice(imgIndex, 1);
        return result;
      });
      setFiles((prevFiles) => {
        const newFiles = [...prevFiles];
        const result = newFiles.filter(item => item?.name !== file?.name)
        // newFiles.splice(imgIndex, 1);
        return result;
      });
      setUploadedFiles((prevFiles) => {
        let newFiles = [...prevFiles];
        const removeFromUpload = newFiles.filter((item) => item !== file?.name);
        console.log({ removeFromUpload });
        return removeFromUpload;
      });
      const res = await fetch("/api/product/delete-image", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl: file?.file }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Error deleting file");
      }

      // ... (بعد از حذف موفقیت‌آمیز، کارهایی انجام بدید، مثلاً آپدیت state)
      console.log("Image deleted successfully");
    } catch (error) {
      console.error("Error deleting file:", error);
      // ... (نمایش پیام خطا به کاربر)
    }
  };

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/product/upload-image", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Error uploading file");
      }

      const data = await res.json();
      // console.log("Upload successful:", data);
      setUploadedFiles((prevUploadedFiles) => [
        ...prevUploadedFiles,
        file.name,
      ]); // اضافه کردن به لیست اپلود شده ها
      setProductImgs((prevImages) => [
        ...prevImages,
        { file: data?.data, name: data?.name },
      ]);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  useEffect(() => {
    console.log({files})
    console.log({productImgs})
    console.log({uploadedFiles})
    const filesToUpload = files.filter(
      (file) => !uploadedFiles.includes(file.name)
    ); // فیلتر کردن فایل های جدید

    filesToUpload.forEach((file) => {
      handleUpload(file);
    });

    // console.log("images", productImgs);
  }, [files]); // وقتی files یا uploadedFiles تغییر کنه اجرا شه

  return (
    <div className="w-full">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {title}
      </label>
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-">
            <LuImagePlus className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">برای انتخاب عکس اینجا کلیک کنید</span> 
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              PNG, JPG, JPEG
            </p>
          </div>
          <input
            ref={fileInputRef}
            id="dropzone-file"
            type="file"
            className="hidden"
            multiple
            onChange={handleFileChange}
          />
        </label>
      </div>
      {productImgs && productImgs.length > 0 && (
        <div className="mt-4">
          <h4 className="text-md font-semibold mb-2">عکس های انتخاب شده</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 lg:gap-4 ">
            {productImgs.map((file, index) => (
              <div key={index} className="flex justify-center items-center">
                <div className="relative rounded-lg w-full max-w-[340px] h-52 flex justify-center items-center border bg-slate-100">
                  <Image
                    fill
                    src={file.file}
                    // src={URL.createObjectURL(file)}
                    alt={file.file}
                    className="rounded-lg object-cover overflow-hidden "
                  />
                  <button
                    onClick={() => handleRemoveFile(file, index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    <LuX />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductImages;
