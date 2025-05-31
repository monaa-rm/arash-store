"use client";

import SignUpSectionImages from "@/components/elements/produc-brif-images";
import { setShowLoginBox } from "@/features/globalSlice";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Login from "./login";
import EnterWithSms from "./Enter-with-sms";
import SignUp from "./sign-up";

const SignUpSection = () => {
  const [enterwhitSms, setEnterWithSms] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showSignUp, setShowSignUp] = useState(false);
  const [smsMessage, setSmsMessage] = useState("");
  const [smsError, setSmsError] = useState(false);

  const showLoginBox = useSelector((store) => store.globalSlice.showLoginBox);
  const SignUpSectionItem =
    useSelector((store) => store.globalSlice.SignUpSectionItem) || null;
  const dispatch = useDispatch();
  const innerDivRef = useRef(null);
  useEffect(() => {
    const handleClick = (event) => {
      if (!event.target.closest("#SignUpSection")) {
        dispatch(setShowLoginBox(false));
        setEnterWithSms(false);
        setShowSignUp(false);
      }
    };

    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, []);
  useEffect(() => {
    if (SignUpSectionItem) {
      //inja serahc konam etelaat ro bgirm
    }
  }, [SignUpSectionItem]);
  useEffect(() => {
    if (showLoginBox && innerDivRef.current) {
      innerDivRef.current.scrollTop = 0; // این خط اسکرول را به بالا تنظیم می‌کند
    }
  }, [showLoginBox]);

  return (
    <div
      className={`fixed flex justify-center items-center top-0 right-0 left-0 bottom-0 bg-black bg-opacity-50 z-20 ${
        showLoginBox ? "opacity-100" : "opacity-0 pointer-events-none"
      } transition-opacity duration-300`}
    >
      <div
        id="SignUpSection"
        className="   w-10/12 sm:w-[400px]  min-h-72  mx-auto relative overflow-hidden z-10 bg-white p-6
         rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-500 
         before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute
          after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12"
      >
        <div ref={innerDivRef} className="   border-gray-300  relative ">
          {showSignUp && !enterwhitSms ? (
            <SignUp setShowSignUp={setShowSignUp} />
          ) : !enterwhitSms && !showSignUp ? (
            <Login
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              password={password}
              setPassword={setPassword}
              setEnterWithSms={setEnterWithSms}
              setShowSignUp={setShowSignUp}
              smsError={smsError}
              setSmsError={setSmsError}
              smsMessage={smsMessage}
              setSmsMessage={setSmsMessage}
            />
          ) : enterwhitSms && !showSignUp ? (
            <EnterWithSms
              phoneNumber={phoneNumber}
              setEnterWithSms={setEnterWithSms}
              enterwhitSms={enterwhitSms}
              smsError={smsError}
              setSmsError={setSmsError}
              smsMessage={smsMessage}
              setSmsMessage={setSmsMessage}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SignUpSection;
