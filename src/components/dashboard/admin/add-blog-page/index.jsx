"use client";

import InputTextSection from "@/components/elements/input-text-section";
import { setDashboardActiveItem } from "@/features/globalSlice";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaImage } from "react-icons/fa";
import { FaFileCirclePlus } from "react-icons/fa6";
import { IoClose, IoCloudUploadOutline } from "react-icons/io5";
import { MdDone } from "react-icons/md";
import { useDispatch } from "react-redux";

const AddBlogPage = () => {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogDesc, setBlogDesc] = useState("");
  const [files, setFiles] = useState("");
  const [errorArray, setErrorArray] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  const fileInputRef = useRef(null);
  const path = usePathname();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setDashboardActiveItem({ title: "افزودن وبلاگ", link: "add-blog" })
    );
  }, [path]);

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files;
    setSelectedFile(droppedFile);
    setFiles(droppedFile); // به روز رسانی فایل ها با یک آرایه تک عضوی
  };

  const handleUpload = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.onprogress = (event) => {
        const progress = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(progress);
      };

      reader.onload = (event) => {
        // Handle the file content (e.g., upload to server)
        console.log("File loaded:", file.name);
        resolve();
      };

      reader.readAsDataURL(file); // Or use readAsArrayBuffer for binary data
    });
  };


  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    setSelectedFile(selectedFile);
    setFiles(selectedFile); // به روز رسانی فایل ها با یک آرایه تک عضوی
  };



  useEffect(() => {
    if (selectedFile) {
      handleUpload(selectedFile);
    }
  }, [selectedFile]);
  
const addBlogHandler = () => {
    const newErrorArray = [];
    setErrorArray([]);
    if (!blogTitle.length) {
        newErrorArray.push("blogTitle");
      }
      if (!blogDesc.length) {
        newErrorArray.push("blogDesc");
      }
      if (!files.length) {
        newErrorArray.push("files");
      }
      setErrorArray((prevErrorArray) => [...prevErrorArray, ...newErrorArray]); 
      console.log({blogTitle , blogDesc , files})
}
  return (
    <div className="w-full flex flex-col gap-8 p-4">
      <InputTextSection
        id="blogTitle"
        name="blogTitle"
        errorArray={errorArray}
        value={blogTitle}
        setValue={setBlogTitle}
        type="text"
        label={"عنوان"}
      />
      <div className="relative w-full">
        <textarea
          id="blogDesc"
          name="blogDesc"
          rows={1}
          type="text"
          value={blogDesc}
          onChange={(e) => setBlogDesc(e.target.value)}
          placeholder=""
          className={`border-b w-full text-sm min-h-10 md:text-base border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 
          transition-colors  focus:outline-none peer bg-inherit ${
            errorArray?.includes("blogDesc") && !blogDesc?.length
              ? " border-b border-rose-600 focus:border-b-2 focus:border-rose-600 "
              : null
          } `}
        />
        <label
          htmlFor="blogDesc"
          className={`absolute font-bold -top-3 text-xs right-0 cursor-text peer-focus:text-xs peer-focus:-top-3 
          transition-all peer-focus:text-blue-700 peer-placeholder-shown:top-1   ${
            errorArray?.includes("blogDesc") && !blogDesc?.length
              ? " text-rose-600 peer-focus:text-rose-600"
              : null
          } 
          peer-placeholder-shown:text-sm`}
        >
          توضیحات
        </label>
      </div>
      <div className="w-full flex flex-col gap-2">
        <h3 className="py-2 font-bold">انتخاب عکس بلاگ</h3>
        <div className="group relative w-full ">
          <div
            className={`relative overflow-hidden rounded-2xl border-2 border-dashed  shadow-2xl 
        transition-all duration-300  hover:shadow-cyan-500/10 ${
          errorArray?.includes("files") && files == ""
            ? "  border-rose-600"
            : null
        }`}
          >
            <div className="absolute -left-16 -top-16 h-32 w-32 rounded-full bg-gradient-to-br from-cyan-500/20 to-sky-500/0 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-70"></div>
            <div className="absolute -right-16 -bottom-16 h-32 w-32 rounded-full bg-gradient-to-br from-sky-500/20 to-cyan-500/0 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-70"></div>

            <div className="relative p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    آپلود عکس
                  </h3>
                  <p className="text-sm text-slate-400">
                    عکس ها را انتخاب کنبد
                  </p>
                </div>
                <div className="rounded-lg bg-cyan-500/10 p-2">
                  <IoCloudUploadOutline className="w-7 h-7 text-cyan-500" />
                </div>
              </div>

              <div
                className="group/dropzone mt-6"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <div className="relative rounded-xl border-2 border-dashed border-slate-700 bg-slate-100/50 p-8 transition-colors group-hover/dropzone:border-cyan-500/50">
                  <input
                    type="file"
                    className="absolute inset-0 z-50 h-full w-full cursor-pointer opacity-0"
                    onChange={handleFileSelect}
                    ref={fileInputRef}
                  />
                  <div className="space-y-6 text-center">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-950">
                      <FaFileCirclePlus className="w-8 h-8 text-cyan-500" />
                    </div>

                    <div className="space-y-2">
                      <p className="text-base font-medium text-gray-400">
                        برای بارگذاری فایل، اینجا کلیک کنید
                      </p>
                      {/* <p className="text-sm text-slate-400">JPG,JPEG,HEIC</p> */}
                      <p className="text-xs text-slate-400">
                        بیشترین حجم فایل: 3 مگابایت
                      </p>
                      <p className="text-xs text-slate-400">
                        پس از ثبت امکان ویرایش تصاویر وجود ندارد
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {selectedFile && (
                  <div className="rounded-xl bg-slate-100/50 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-cyan-500/10 p-2">
                          <FaImage className="h-6 w-6 text-cyan-500" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-500">
                            {selectedFile.name}
                          </p>
                          <p className="text-xs text-slate-400">
                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB •{" "}
                            {selectedFile.type.split("/")[1].toUpperCase()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {uploadProgress !== 100 && uploadProgress > 0 && (
                          <span className="text-sm font-medium text-cyan-500">
                            {uploadProgress}%
                          </span>
                        )}

                        {uploadProgress === 100 && (
                          <>
                            <MdDone className="h-5 w-5 text-emerald-500" />

                            <span className="text-sm font-medium text-emerald-500">
                              Complete
                            </span>
                          </>
                        )}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedFile(null);
                            setFiles("");
                            setUploadProgress(0);
                          }}
                          className="text-slate-400 transition-colors hover:text-slate-600"
                        >
                          <IoClose className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    {uploadProgress !== 100 && uploadProgress > 0 && (
                      <div className="mt-3 h-1 overflow-hidden rounded-full bg-slate-800">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-sky-500"
                          style={{ width: `${uploadProgress}%` }}
                        >
                          <div className="h-full w-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/25 to-transparent"></div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* <div className="mt-6 grid grid-cols-2 gap-4">
                <button
                  className="group/btn relative overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 p-px font-medium text-white shadow-[0_1000px_0_0_hsl(0_0%_100%_/_0%)_inset] transition-colors hover:shadow-[0_1000px_0_0_hsl(0_0%_100%_/_2%)_inset]"
                  onClick={handleUploadMore}
                  disabled={selectedFile}
                >
                  <span className="relative flex items-center justify-center gap-2 rounded-xl bg-slate-950/50 px-4 py-2 transition-colors group-hover/btn:bg-transparent">
                    آپلود بیشتر
                    <IoCloudUploadOutline className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </span>
                </button>
                <button
                  className="flex items-center justify-center gap-2 rounded-xl bg-blue-950 px-4 py-2 font-medium text-white transition-colors hover:bg-slate-800"
                  onClick={(e) => handleClearAll(e)}
                >
                  پاک کردن
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={() => addBlogHandler()}
        className="relative cursor-pointer w-full py-2 flex justify-center items-center
         text-gray-100 text-sm font-bold overflow-hidden bg-gradient-to-r from-blue-600
          to-blue-950 rounded-lg transition-all duration-400 ease-in-out
           shadow-md hover:scale-100 hover:text-white hover:shadow-lg   z-[5] active:scale-90 
           before:absolute before:top-0 before:-left-full before:w-full before:h-full
    before:bg-gradient-to-r before:from-blue-700 before:to-blue-950 before:transition-all 
    before:duration-500 before:ease-in-out before:z-[-1] before:rounded-lg
     hover:before:left-0"
      >
        ثبت نهایی وبلاگ
      </div>
    </div>
  );
};

export default AddBlogPage;
