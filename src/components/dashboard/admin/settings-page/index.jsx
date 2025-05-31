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
import EditImages from "../edit-images";
import ProductImages from "../productImages";
import PropertiesBox from "../properties-box";

const SettingsPage = ({ data }) => {
  const [title, setTitle] = useState(data?.title || "");
  const [desc, setDesc] = useState(data?.desc || "");
  const [prevFiles, setPrevFiles] = useState(data?.images || []);
  const [files, setFiles] = useState([]);
  const [errorArray, setErrorArray] = useState("");
  const [address, setAddress] = useState([]);
  const [phone, setPhone] = useState([]);
  const [telegram, setTelegram] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [youtube, setYoutube] = useState("");
  const [instagram, setInstagram] = useState("");

  const fileInputRef = useRef(null);
  const path = usePathname();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setDashboardActiveItem({ title: "تنظیمات سایت", link: "settings" })
    );
  }, [path]);

  const addBlogHandler = () => {
    const newErrorArray = [];
    setErrorArray([]);
    if (!title.length) {
      newErrorArray.push("title");
    }
    if (!desc.length) {
      newErrorArray.push("desc");
    }
    if (!files.length && !prevFiles.length) {
      newErrorArray.push("files");
    }
    setErrorArray((prevErrorArray) => [...prevErrorArray, ...newErrorArray]);
    console.log({ title, desc, files });
  };
  return (
    <div className="w-full flex flex-col gap-8 p-4">
      <InputTextSection
        id="title"
        name="title"
        errorArray={errorArray}
        value={title}
        setValue={setTitle}
        type="text"
        label={"عنوان خوش آمد گویی"}
      />
      <div className="relative w-full">
        <textarea
          id="desc"
          name="desc"
          rows={3}
          type="text"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder=""
          className={`border-b w-full text-sm min-h-10 md:text-base border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 
          transition-colors  focus:outline-none peer bg-inherit ${
            errorArray?.includes("desc") && !desc?.length
              ? " border-b border-rose-600 focus:border-b-2 focus:border-rose-600 "
              : null
          } `}
        />
        <label
          htmlFor="desc"
          className={`absolute font-bold -top-3 text-xs right-0 cursor-text peer-focus:text-xs peer-focus:-top-3 
          transition-all peer-focus:text-blue-700 peer-placeholder-shown:top-1   ${
            errorArray?.includes("desc") && !desc?.length
              ? " text-rose-600 peer-focus:text-rose-600"
              : null
          } 
          peer-placeholder-shown:text-sm`}
        >
          توضیحات خوش آمد گویی
        </label>
      </div>
      <PropertiesBox
        productProperties={address}
        setProductProperties={setAddress}
        title={"آدرس ها"}
        placeholder={"اضافه کردن آدرس"}
      />
      <PropertiesBox
        productProperties={phone}
        setProductProperties={setPhone}
        title={"شماره های تماس"}
        placeholder={"اضافه کردن شماره تماس"}
      />

      <div className="w-full flex flex-col gap-2">
        <h3 className="py-2 font-bold">انتخاب عکس خوش آمد گویی</h3>
        {prevFiles?.length ? <EditImages images={prevFiles} /> : null}
        <ProductImages
          errorArray={errorArray}
          files={files}
          setFiles={setFiles}
          title={"انتخاب عکس"}
        />
      </div>
      <div className="w-full flex flex-col gap-2">
      <h3 className="py-2 font-bold">لینک ها</h3>
        <div className="w-full flex flex-col gap-8">
          <InputTextSection
            id="telegram"
            name="telegram"
            errorArray={errorArray}
            value={telegram}
            setValue={setTelegram}
            type="text"
            label={"لینک telegram"}
          />
          <InputTextSection
            id="instagram"
            name="instagram"
            errorArray={errorArray}
            value={instagram}
            setValue={setInstagram}
            type="text"
            label={"لینک instagram"}
          />
          <InputTextSection
            id="whatsapp"
            name="whatsapp"
            errorArray={errorArray}
            value={whatsapp}
            setValue={setWhatsapp}
            type="text"
            label={"لینک whatsapp"}
          />
          <InputTextSection
            id="youtube"
            name="youtube"
            errorArray={errorArray}
            value={youtube}
            setValue={setYoutube}
            type="text"
            label={"لینک youtube"}
          />
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
        ویرایش
      </div>
    </div>
  );
};

export default SettingsPage;
