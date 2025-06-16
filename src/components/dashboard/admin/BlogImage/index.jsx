"use client";
import React, { useState, useRef, useEffect } from "react";
import { LuImagePlus, LuX } from "react-icons/lu";
import { FiUploadCloud } from "react-icons/fi";
import Image from "next/image";
// import heic2any from "heic2any";
import { normalizeFileName } from "@/utiles/utils-func";
import { useSession } from "next-auth/react";

const ProductImages = ({
  files,
  setFiles,
  productImgs,
  setProductImgs,
  errorArray,
  title,
  setFinallyText,
  selectedFile,
  setSelectedFile,
}) => {
  const fileInputRef = useRef(null);
  const [errormsg, setErrormsg] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();

  const handleFileChange = async (e) => {
    console.log(e.target.files);
    const file = e.target.files[0];
    if (file) {
      try {
        setErrormsg("");
        setFinallyText("");
        // setSelectedFile(file);
        setLoading(true);
        const fileName = file?.name;
        const allowedExtensions = ["jpeg", "jpg", "png", "heic", "heif"];
        const fileExtension = fileName.split(".").pop().toLowerCase();
        console.log(fileExtension);
        let finallyFile = file;
        if (allowedExtensions.includes(fileExtension)) {
          console.log("ggggggggggg");
          if (
            file?.name?.toLowerCase().includes(".heic") ||
            file?.name?.toLowerCase().includes(".heif")
          ) {
            try {
              const heic2any = (await import("heic2any")).default;
              const blob = new Blob([file], { type: file.type });

              const convertedBlob = await heic2any({
                blob,
                toType: "image/jpeg",
                quality: 0.8,
              });

              const newName = normalizeFileName(
                file.name.replace(/\.[^/.]+$/, "")
              );
              finallyFile = new File([convertedBlob], `${newName}.jpg`, {
                type: "image/jpeg",
                prevname: file?.name,
              });
              console.log("ding", finallyFile);
            } catch (convertError) {
              console.error("Conversion error:", convertError);
              throw new Error("Failed to convert HEIC file");
            }
          }
          const formData = new FormData();
          formData.append("file", finallyFile);
          formData.append("creatorRole", session?.user.role);
          formData.append("saveIn", "blogs");
          try {
            const res = await fetch("/api/product/upload-image", {
              method: "POST",
              body: formData,
            });

            if (!res.ok) {
              const errorData = await res.json();
              setErrormsg(errorData.error || "خطایی رخ داده است");
            }

            const data = await res.json();
            setFiles(data?.data);
            console.log(data);
          } catch (error) {
            console.error("Error uploading file:", error);
            setErrormsg("خطایی رخ داده است");
          } finally {
            setLoading(false);
          }
        } else {
          console.log("falseeeeeee");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        setErrormsg("خطایی رخ داده است");
      } finally {
        setLoading(false);
        e.target.value = "";
      }
    }
  };
  const handleRemoveFile = async () => {
    setErrormsg("");
    console.log(files)
    if (files?.length) {
      try {
        setLoading(true);
        const res = await fetch("/api/product/delete-image", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ imageUrl: files }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          setErrormsg(errorData.error || "خطایی رخ داده است");
          // throw new Error(errorData.error || "خطایی رخ داده است");
        } else {
          // setSelectedFile(null);
          setFiles("");
        }

        // ... (بعد از حذف موفقیت‌آمیز، کارهایی انجام بدید، مثلاً آپدیت state)
        console.log("Image deleted successfully");
      } catch (error) {
        console.error("Error deleting file:", error);
        setErrormsg("خطایی رخ داده است");
        setFiles("");
        // setSelectedFile(null);
        // ... (نمایش پیام خطا به کاربر)
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <div className="w-full ">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {title}
      </label>
      <div className="flex items-center justify-center w-full  h-64 relative overflow-hidden ">
        <div
          className={`${
            loading ? "flex" : "hidden"
          } absolute top-1/2 left-1/2 -translate-x-1/2  w-full flex justify-center items-center gap-2`}
        >
          <span className="font-bold text-blue-900">در حال انجام عملیات</span>
          <div className="flex flex-row gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-900 animate-bounce"></div>
            <div className="w-3 h-3 rounded-full bg-blue-900 animate-bounce [animation-delay:-.3s]"></div>
            <div className="w-3 h-3 rounded-full bg-blue-900 animate-bounce [animation-delay:-.5s]"></div>
          </div>
        </div>
        <div
          className={`w-full h-full loading animated fadeIn  border-2
            ${
              errorArray.includes("files") && !files?.length
                ? "border-rose-600"
                : " border-gray-300 "
            } border-dashed rounded-lg cursor-pointer `}
        >
          <label
            htmlFor="dropzone-file"
            className={`  flex flex-col items-center justify-center h-full cursor-pointer
             dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600
              dark:hover:border-gray-500 dark:hover:bg-gray-600 ${
                loading ? "upload_bg w-[150%] " : " bg-gray-50  w-full"
              } `}
          >
            <div
              className={` ${
                loading ? "hidden" : "flex"
              }  flex-col items-center justify-center pt-5 pb-6 `}
            >
              <LuImagePlus className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">
                  برای انتخاب عکس اینجا کلیک کنید
                </span>
              </p>
              <p className="text-xs text-red-500 dark:text-red-400">
                {errormsg}
              </p>
            </div>
            <input
              ref={fileInputRef}
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>
      </div>
      {files?.length > 0 && (
        <div className="mt-4 w-full">
          <h4 className="text-md font-semibold mb-2 w-full">عکس انتخاب شده</h4>
          <div className="w-full">
            <div className="flex justify-center items-center w-full">
              <div className="relative rounded-lg w-96 h-60 sm:h-72 flex justify-center items-center border bg-slate-100">
                <Image
                  fill
                  src={files}
                  alt={files}
                  className={`rounded-lg object-fill overflow-hidden `}
                />
                <button
                  onClick={() => handleRemoveFile()}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  <LuX />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductImages;
