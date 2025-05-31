import { setShowLoginBox } from "@/features/globalSlice";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch } from "react-redux";

const EnterWithSms = ({
  phoneNumber,
  setPhoneNumber,
  enterwhitSms,
  setEnterWithSms,
  smsMessage,
  setSmsMessage,
  smsError,
  setSmsError,
}) => {
  const [loginCode, setLoginCode] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  // useEffect(() => {
  // const sendSms = async () => {
  //   const res = await fetch(`/api/auth/sms/send-sms`,{
  //     method:"POST",
  //     body: {phone: phoneNumber},
  //     headers: {"Content-Type" : "application/json"}
  //   })
  //   console.log(res)
  // }
  // enterwhitSms && sendSms()

  // }, [enterwhitSms]);
  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      if ((phoneNumber, loginCode)) {
        setSmsError(false);
        setSmsMessage("");
        setLoading(true);
        const res = await signIn("credentials", {
          phone: phoneNumber,
          // password: password,
          loginWithCode: true,
          loginCode: loginCode,
          redirect: false,
        });
        console.log(res);
        if (res.error) {
          console.log("error-", res.error);
          setSmsMessage(res.error);
        } else {
          dispatch(setShowLoginBox(false));
          setPhoneNumber("");
        }
      }
    } catch (error) {
      console.log(error)
      setSmsMessage("خطایی رخ داده است");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full h-full flex flex-col gap-4 ">
      <div className="flex justify-end">
        <button
          onClick={() => setEnterWithSms(false)}
          className="[background:linear-gradient(144deg,#af40ff,#5b42f3_50%,#00ddeb)] text-white  py-2 font-bold rounded-md hover:opacity-80 w-10 h-8 flex justify-center items-center"
        >
          <FaArrowLeft className="text-white w-6 h-6" />
        </button>
      </div>
      <div className="font-bold">
        یک کد برای شماره موبایل {`0${phoneNumber}`} ارسال شده است.آن را وارد
        کنید.
      </div>
      <input
        className="mt-1 p-2 w-full border rounded-md"
        name="loginCode"
        id="loginCode"
        value={loginCode}
        onChange={(e) => setLoginCode(e.target.value)}
        type="text"
        aria-autocomplete="off"
      />
      <div className="flex w-full h-14 pt-6 mt-2 relative">
        <div className="absolute top-0 flex justify-center items-center">
          <span
            className={`text-xs ${
              smsError ? "text-rose-600" : "text-orange-500"
            } `}
          >
            {smsMessage}
          </span>
        </div>
        <button
            disabled={!phoneNumber || !loginCode}
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
  );
};

export default EnterWithSms;
