"use client";

import { setShowLoginBox } from "@/features/globalSlice";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";

const Login = ({
  phoneNumber,
  setPhoneNumber,
  password,
  setPassword,
  setEnterWithSms,
  setShowSignUp,
  smsMessage,
  setSmsMessage,
  smsError,
  setSmsError,
}) => {
  const [loading, setLoading] = useState(false);
  const [dataMessage, setDataMessage] = useState("");
  const dispatch = useDispatch();
  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      if ((phoneNumber, password)) {
        setDataMessage("");
        setLoading(true);
        // const formData = { phone: phoneNumber, password };
        const res = await signIn("credentials", {
          phone: phoneNumber,
          password: password,
          loginWithCode: false,
          redirect: false,
        });
        console.log(res);
        // const data = await res.json();
        if (res.error) {
          console.log("error-", res.error);
          setDataMessage(res.error);
        } else {
          dispatch(setShowLoginBox(false));
          setPhoneNumber("");
          setPassword("");
          // console.log("success-", data.message);
        }
      }
    } catch (error) {
      setDataMessage("خطایی رخ داده است");
    } finally {
      setLoading(false);
    }
  };
  const logingWithSms = async () => {
    setEnterWithSms(true);
    const res = await fetch(`/api/auth/sms/send-sms`, {
      method: "POST",
      body: JSON.stringify({ phone: phoneNumber }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (res.ok) {
      console.log(data.data);
      setSmsMessage(data.data);
      setSmsError(false);
    } else {
      console.log(data.error);
      setSmsMessage(data.error);
      setSmsError(true);
    }
  };
  return (
    <div className="w-full h-full ">
      <h2 className="text-2xl text-sky-900 font-bold mb-6"> صفحه ورود</h2>

      <div>
        <div className="mb-4">
          <label
            className="block text-sm font-bold text-gray-600"
            htmlFor="name"
          >
            شماره موبایل
          </label>
          <input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            type="number"
            placeholder="9123456789"
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
        <div className="flex justify-between items-center">
          <span
            onClick={() => setShowSignUp(true)}
            className="text-xs font-bold text-blue-500 cursor-pointer hover:text-blue-700 transition-all duration-300"
          >
            ایجاد حساب کاربری
          </span>
          <span
            onClick={() => logingWithSms()}
            className="text-xs font-bold text-violet-500 cursor-pointer hover:text-violet-700 transition-all duration-300"
          >
            ورود با رمز یک بار مصرف
          </span>
        </div>
        <div className="flex w-full h-14 pt-6 mt-2 relative">
          <div className="absolute top-0 flex justify-center items-center">
            <span className="text-xs text-rose-600">{dataMessage}</span>
          </div>
          <button
            disabled={!phoneNumber || !password}
            onClick={(e) => loginHandler(e)}
            className="[background:linear-gradient(144deg,#af40ff,#5b42f3_50%,#00ddeb)] text-white px-4 
            py-2 font-bold rounded-md hover:opacity-80 w-full flex justify-center items-center gap-1"
            type="button"
          >
            ورود
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
    </div>
  );
};

export default Login;
