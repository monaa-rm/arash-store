"use client";

import InputTextSection from "@/components/elements/input-text-section";
import { setDashboardActiveItem, setUserDashboardActiveItem } from "@/features/globalSlice";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CategoryBox from "../category-box";
import PropertiesBox from "../properties-box";
import DescriptionBox from "../description-box";
import ProductImages from "../productImages";
import { useSession } from "next-auth/react";
import Image from "next/image";

const AdminEditPage = ({ user , activeItem ,rolePath }) => {
  const [name, setName] = useState(user?.name);
  const [lastName, setlastName] = useState(user?.lastName);
  const [phone, setPhone] = useState(user?.phone);
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [errorArray, setErrorArray] = useState([]);
  const [finallyText, setFinallyText] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: session, status , update } = useSession();
  const path = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    if(rolePath == "admin"){
      dispatch(
        setDashboardActiveItem(activeItem)
      )
    }else if(rolePath == "user"){
            dispatch(
        setUserDashboardActiveItem(activeItem)
      )
    }
  }, [path]);
  //   const productPriceHandler = (value) => {
  //     setFinallyText("");
  //     let newvalue = value.replace(/[^0-9\-]/g, "");
  //     // قبول فقط یک صفر
  //     if (newvalue === "00") {
  //       newvalue = "0";
  //     }

  //     // حذف صفر ابتدایی اگر عدد دیگری بعد از آن وارد شود
  //     if (newvalue.length > 1 && newvalue.startsWith("0")) {
  //       newvalue = newvalue.substring(1);
  //     }

  //     setProductPrice(newvalue);
  //   };
  console.log("object");
  const AdminEdithandler = async () => {
    const newErrorArray = [];
    setErrorArray([]);
    setLoading(true);
    setFinallyText("");
    try {
      if (!phone.length) {
        newErrorArray.push("phone-user");

        setErrorArray((prevErrorArray) => [
          ...prevErrorArray,
          ...newErrorArray,
        ]); // Update using callback
        setFinallyText("شماره موبایل را وارد کنید");
      } else {
        const formData = {
          name,
          lastName,
          phone,
          password,
          repassword,
        };
        const res = await fetch(`/api/user/edit/${user._id}`, {
          method: "PATCH",
          body: JSON.stringify(formData),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (!res.ok) {
          console.log(data);
          setFinallyText(data?.error);
        } else {
            await update({phone : data?.phone})
          setPassword("");
          setRePassword("");
          router.push(`/dashboard/${rolePath}`)
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
    <div className=" w-full flex flex-col gap-8 p-4">
      <InputTextSection
        id="name-user"
        name="name-user"
        errorArray={errorArray}
        value={name}
        setValue={setName}
        type="text"
        label={"نام"}
        finallyText={finallyText}
        setFinallyText={setFinallyText}
      />
      <InputTextSection
        id="lastName-user"
        name="lastName-user"
        errorArray={errorArray}
        value={lastName}
        type="text"
        setValue={setlastName}
        label={"نام خانوادگی"}
        finallyText={finallyText}
        setFinallyText={setFinallyText}
      />
      <InputTextSection
        id="phone-user"
        name="phone-user"
        errorArray={errorArray}
        value={phone}
        type="text"
        setValue={setPhone}
        label={"شماره موبایل"}
        finallyText={finallyText}
        setFinallyText={setFinallyText}
      />
      <div className="flex flex-col gap-6 px-4">
        <h3 className="font-bold border-b pb-2 -mr-4">تعویض رمز عبور</h3>
        <InputTextSection
          id="passwordd-user"
          name="passwordd-user"
          errorArray={errorArray}
          value={password}
          type="password"
          setValue={setPassword}
          label={"رمز عبور فعلی"}
          finallyText={finallyText}
          setFinallyText={setFinallyText}
        />
        <InputTextSection
          id="repasswordd-user"
          name="repasswordd-user"
          errorArray={errorArray}
          value={repassword}
          type="password"
          setValue={setRePassword}
          label={"رمز عبور جدید"}
          finallyText={finallyText}
          setFinallyText={setFinallyText}
        />
      </div>

      <div className="w-full">
        <div
          className={`${
            finallyText.length ? "flex" : "hidden"
          } text-rose-600  pb-0.5 text-sm`}
        >
          {finallyText}
        </div>
        <button
          type="button"
          onClick={() => AdminEdithandler()}
          className="relative cursor-pointer w-full py-2 flex gap-2 justify-center items-center
         text-gray-100 text-sm md:text-base font-bold overflow-hidden bg-gradient-to-r from-blue-600
          to-blue-950 rounded-[8px] transition-all duration-400 ease-in-out
           shadow-md hover:scale-100 hover:text-white hover:shadow-lg   z-[5] active:scale-90 
           before:absolute before:top-0 before:-left-full before:w-full before:h-full
    before:bg-gradient-to-r before:from-blue-700 before:to-blue-950 before:transition-all 
    before:duration-500 before:ease-in-out before:z-[-1] before:rounded-[8px]
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
        </button>
      </div>
    </div>
  );
};

export default AdminEditPage;
