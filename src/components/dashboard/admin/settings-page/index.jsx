"use client";

import InputTextSection from "@/components/elements/input-text-section";
import { setDashboardActiveItem } from "@/features/globalSlice";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ProductImages from "../productImages";
import PropertiesBox from "../properties-box";
import { useSession } from "next-auth/react";
import Image from "next/image";

const SettingsPage = ({ data }) => {
  const [title, setTitle] = useState(data?.welcomeTitle || "");
  const [desc, setDesc] = useState(data?.welcomeDescription || "");
  const [errorArray, setErrorArray] = useState("");
  const [address, setAddress] = useState(data?.address || []);
  const [phone, setPhone] = useState(data?.phone || []);
  const [telegram, setTelegram] = useState(data?.telegramLink || "");
  const [whatsapp, setWhatsapp] = useState(data?.whatsappLink || "");
  const [youtube, setYoutube] = useState(data?.youtubeLink || "");
  const [instagram, setInstagram] = useState(data?.instagramLink || "");
  const [email, setEmail] = useState(data?.email || "");
  const [files, setFiles] = useState([]);
  const [siteImages, setSiteImages] = useState(data?.welcomeImages || []);
  const [finallyText, setFinallyText] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();
  const path = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setDashboardActiveItem({ title: "تنظیمات سایت", link: "settings" })
    );
  }, [path]);

  const addBlogHandler = async () => {
    const newErrorArray = [];
    setErrorArray([]);
    setLoading(true);
    try {
      if (
        !title.length ||
        !desc.length ||
        // !address?.length ||
        // !phone.length ||
        !email.length ||
        !siteImages.length
      ) {
        if (!title.length) {
          newErrorArray.push("title");
        }
        if (!desc.length) {
          newErrorArray.push("desc");
        }
        // if (!address.length) {
        //   newErrorArray.push("address");
        // }
        // if (!phone.length) {
        //   newErrorArray.push("phone");
        // }
        if (!email.length) {
          newErrorArray.push("email");
        }
        if (!siteImages.length) {
          newErrorArray.push("files");
        }

        setErrorArray((prevErrorArray) => [
          ...prevErrorArray,
          ...newErrorArray,
        ]); // Update using callback
        console.log(errorArray);
        setFinallyText("اطلاعات کامل نیست");
      } else {
        const formData = {
          title,
          desc,
          phone,
          address,
          email,
          telegram,
          instagram,
          whatsapp,
          youtube,
          siteImages,
          editor: session.user,
        };
        const res = await fetch(`/api/setting`, {
          method: "POST",
          body: JSON.stringify(formData),
          headers: { "Content-Type": "application/json" },
        });
        const result = await res.json();
        if (!res.ok) {
          console.log(result);
          setFinallyText(result?.error);
        } else {
          router.push("/dashboard/admin");
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
        id="title"
        name="title"
        errorArray={errorArray}
        value={title}
        setValue={setTitle}
        type="text"
        label={"عنوان خوش آمد گویی"}
        finallyText={finallyText}
        setFinallyText={setFinallyText}
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
        finallyText={finallyText}
        setFinallyText={setFinallyText}
      />
      <PropertiesBox
        productProperties={phone}
        setProductProperties={setPhone}
        title={"شماره های تماس"}
        placeholder={"اضافه کردن شماره تماس"}
        finallyText={finallyText}
        setFinallyText={setFinallyText}
      />
      <InputTextSection
        id="email"
        name="email"
        errorArray={errorArray}
        value={email}
        setValue={setEmail}
        type="text"
        label={"ایمیل"}
        finallyText={finallyText}
        setFinallyText={setFinallyText}
      />
      <div className="w-full flex flex-col gap-2">
        <h3 className="py-2 font-bold">انتخاب عکس خوش آمد گویی</h3>
        {/* {prevFiles?.length ? <EditImages images={prevFiles} /> : null} */}
        <ProductImages
          errorArray={errorArray}
          files={files}
          setFiles={setFiles}
          productImgs={siteImages}
          setProductImgs={setSiteImages}
          title={`انتخاب عکس محصول`}
          setFinallyText={setFinallyText}
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
            finallyText={finallyText}
            setFinallyText={setFinallyText}
          />
          <InputTextSection
            id="instagram"
            name="instagram"
            errorArray={errorArray}
            value={instagram}
            setValue={setInstagram}
            type="text"
            label={"لینک instagram"}
            finallyText={finallyText}
            setFinallyText={setFinallyText}
          />
          <InputTextSection
            id="whatsapp"
            name="whatsapp"
            errorArray={errorArray}
            value={whatsapp}
            setValue={setWhatsapp}
            type="text"
            label={"لینک whatsapp"}
            finallyText={finallyText}
            setFinallyText={setFinallyText}
          />
          <InputTextSection
            id="youtube"
            name="youtube"
            errorArray={errorArray}
            value={youtube}
            setValue={setYoutube}
            type="text"
            label={"لینک youtube"}
            finallyText={finallyText}
            setFinallyText={setFinallyText}
          />


        </div>
      </div>
      <div className="w-full">
        <div
          className={`${
            finallyText.length ? "flex" : "hidden"
          } text-rose-600  pb-0.5 text-sm`}
        >
          {finallyText}
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
    </div>
  );
};

export default SettingsPage;
