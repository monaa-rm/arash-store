"use client";

import InputTextSection from "@/components/elements/input-text-section";
import { setDashboardActiveItem } from "@/features/globalSlice";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaImage } from "react-icons/fa";
import { FaFileCirclePlus } from "react-icons/fa6";
import { IoClose, IoCloudUploadOutline } from "react-icons/io5";
import { MdDone } from "react-icons/md";
import { useDispatch } from "react-redux";
import BlogImage from "../BlogImage";
import { useSession } from "next-auth/react";
import Image from "next/image";

const AddBlogPage = () => {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogDesc, setBlogDesc] = useState("");
  const [files, setFiles] = useState("");
  const [errorArray, setErrorArray] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [productImgs, setProductImgs] = useState([]);
  const [finallyText, setFinallyText] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();

  const router = useRouter();
  const path = usePathname();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setDashboardActiveItem({ title: "افزودن وبلاگ", link: "add-blog" })
    );
  }, [path]);

  const addBlogHandler = async () => {
    const newErrorArray = [];
    setErrorArray([]);
    try {
      if (!blogTitle?.length || !blogDesc?.length || !files?.length) {
        if (!blogTitle.length) {
          newErrorArray.push("blogTitle");
        }
        if (!blogDesc.length) {
          newErrorArray.push("blogDesc");
        }
        if (!files.length) {
          newErrorArray.push("files");
        }
        setErrorArray((prevErrorArray) => [
          ...prevErrorArray,
          ...newErrorArray,
        ]);
        console.log({ blogTitle, blogDesc, files });
      } else {
        console.log("//////////////////");
        setLoading(true);
        const formData = {
          title: blogTitle,
          description: blogDesc,
          file: files,
          creator: session.user,
        };
        const res = await fetch("/api/blog/new-blog", {
          method: "POST",
          body: JSON.stringify(formData),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        console.log(data);
        if (!res.ok) {
          console.log(data);
          setFinallyText(data?.error);
        } else {
          router.push("/dashboard/admin/blogs");
        }
      }
    } catch (error) {
      console.log(error);
      setFinallyText("خطا در ارسال اطلاعات");
    } finally {
      setLoading(false);
    }
  };
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
        setFinallyText={setFinallyText}
      />
      <div className="relative w-full">
        <textarea
          id="blogDesc"
          name="blogDesc"
          rows={1}
          type="text"
          value={blogDesc}
          onChange={(e) => {
            setBlogDesc(e.target.value);
            setFinallyText("");
          }}
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

        <BlogImage
          errorArray={errorArray}
          files={files}
          setFiles={setFiles}
          productImgs={productImgs}
          setProductImgs={setProductImgs}
          title={`انتخاب عکس وبلاگ`}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          setFinallyText={setFinallyText}
        />
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
        {loading ? (
          <Image
            src={"/images/spinner.svg"}
            alt="spinner"
            width={25}
            height={25}
          />
        ) : null}
      </div>
    </div>
  );
};

export default AddBlogPage;
