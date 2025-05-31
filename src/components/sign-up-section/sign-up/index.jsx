"use client";
import { setShowLoginBox } from "@/features/globalSlice";
import Image from "next/image";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch } from "react-redux";

const SignUp = ({ setShowSignUp }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [dataMessage, setDataMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const signUpHandler = async (e) => {
    e.preventDefault();

    try {
      if ((phoneNumber, password, repeatPassword)) {
        setDataMessage("")
        setLoading(true);
        const formData = { phone: phoneNumber, password, repeatPassword };
        const res = await fetch("/api/auth/add", {
          method: "POST",
          body: JSON.stringify(formData),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (res.ok) {
          dispatch(setShowLoginBox(false))
          setPhoneNumber("")
          setPassword("")
          setRepeatPassword("")
          console.log("success-", data.message);
        } else {
          console.log("error-", data.error);
          setDataMessage(data?.error);
        }
      }
    } catch (error) {
      setDataMessage("خطایی رخ داده است")
    }finally {
      setLoading(false)
    }
  };
  return (
    <div className="w-full h-full">
      <div className="flex justify-between">
        <h2 className="text-2xl text-sky-900 font-bold mb-6">صفحه ثبت نام</h2>
        <button
          onClick={() => setShowSignUp(false)}
          className="[background:linear-gradient(144deg,#af40ff,#5b42f3_50%,#00ddeb)] text-white  py-2 font-bold rounded-md hover:opacity-80 w-10 h-8 flex justify-center items-center"
        >
          <FaArrowLeft className="text-white w-6 h-6" />
        </button>
      </div>
      <div className="w-full flex flex-col gap-4 ">
        <div className="mb-4">
          <label
            className="block text-sm font-bold text-gray-600"
            htmlFor="name"
          >
            شماره موبایل
          </label>
          <input
            name="phoneNumber"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            type="number"
            autoComplete="off"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-bold text-gray-600"
            htmlFor="password"
          >
            رمز عبور
          </label>
          <input
            className="mt-1 p-2 w-full border rounded-md"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            autoComplete="off"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-bold text-gray-600"
            htmlFor="repeatPassword"
          >
            تکرار رمز عبور
          </label>
          <input
            className="mt-1 p-2 w-full border rounded-md"
            name="repeatPassword"
            id="repeatPassword"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            type="password"
            autoComplete="off"
          />
        </div>
        <div className="flex w-full h-14 pt-6 relative">
          <div className="absolute top-0 flex justify-center items-center">
            <span className="text-xs text-rose-600">{dataMessage}</span>
          </div>
          <button
            disabled={!phoneNumber || !repeatPassword || !phoneNumber}
            onClick={(e) => signUpHandler(e)}
            className="[background:linear-gradient(144deg,#af40ff,#5b42f3_50%,#00ddeb)] text-white px-4 
            py-2 font-bold rounded-md hover:opacity-80 w-full flex justify-center items-center gap-1"
            type="button"
          >
            ثبت نام
            {loading ? <Image src={"/images/spinner.svg"} alt="spinner" width={25} height={25} /> : null}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
