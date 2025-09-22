import ProductRating from "@/components/elements/product-rating";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IoCheckmark } from "react-icons/io5";

const SetCommentSection = ({ showCm, setShowCm, id ,comments , setComments }) => {
  const [rating, setRating] = useState(0);
  const [cmText, setCmText] = useState("");
  const [cmName, setCmName] = useState("");
  const [cmEmail, setCmEmail] = useState("");
  const [saveCmDetail, setSaveCmDetail] = useState(false);
  const [finallyText, setFinallyText] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorArray, setErrorArray] = useState([]);
  const { data: session, status } = useSession();

  useEffect(() => {
    try {
      const cmdetails = localStorage.getItem("commentDetail");
      if (cmdetails) {
        const details = JSON.parse(cmdetails);
        setCmName(details?.name);
        setCmEmail(details?.email);
        setSaveCmDetail(true);
      
      }
    } catch (error) {
      console.log(error);
    }
  }, []);
  const addCmHandler = async () => {
    setFinallyText("")
    const newErrorArray = [];
    setErrorArray([]);
    setLoading(true);
    try {
      if (saveCmDetail) {
        const cmdetails = localStorage.setItem(
          "commentDetail",
          JSON.stringify({ name: cmName, email: cmEmail })
        );
      }
      if (!cmText.length || !cmName.length || !cmEmail.length) {
        if (!productTitle.length) {
          newErrorArray.push("cmText");
        }
        if (!productId.length) {
          newErrorArray.push("cmName");
        }
        if (!productUnit.length) {
          newErrorArray.push("cmEmail");
        }

        setErrorArray((prevErrorArray) => [
          ...prevErrorArray,
          ...newErrorArray,
        ]); // Update using callback
        console.log(errorArray);
        setFinallyText("اطلاعات کامل نیست");
      } else {
        const formData = {
          cmText,
          cmEmail,
          cmName,
          rating,
          productId: id,
          creator: session?.user,
        };
        const res = await fetch("/api/comment/add", {
          method: "POST",
          body: JSON.stringify(formData),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (!res.ok) {
          console.log(data);
          setFinallyText(data?.error);
        }
         else {
           setComments([ data?.data,...comments ,])
           setCmText("")
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
    <div
      className={`w-full border-t pt-2 absolute flex flex-col gap-4  h-[600px] md:h-[450px] transition-all duration-500 ease-in-out ${
        showCm ? "top-4" : "-top-[600px] md:-top-[450px]"
      } `}
    >
      <div className="text-sm">
        نشانی ایمیل شما منتشر نخواهد شد. بخش‌های موردنیاز علامت‌گذاری شده‌اند{" "}
        <span className="text-rose-600">*</span>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center gap-4">
          <h3>
            دیدگاه شما <span className="text-rose-600">*</span>
          </h3>
          <div className="w-24">
            <ProductRating
              rating={rating}
              setRating={setRating}
              readOnly={false}
            />
          </div>
        </div>
        <textarea
          value={cmText}
          rows={5}
          onChange={(e) => setCmText(e.target.value)}
          className=" outline-none border rounded-[8px] p-4 max-h-52"
        />
      </div>
      <div className="flex w-full flex-col md:flex-row gap-4">
        <div className="flex w-full md:w-1/2 flex-col gap-2">
          <h3>
            نام <span className="text-rose-600">*</span>
          </h3>
          <input
            type="text"
            value={cmName}
            onChange={(e) => setCmName(e.target.value)}
            className="outline-none border rounded-[8px] w-full p-4 h-10"
          />
        </div>
        <div className="flex w-full md:w-1/2 flex-col gap-2">
          <h3>
            ایمیل <span className="text-rose-600">*</span>
          </h3>
          <input
            type="email"
            value={cmEmail}
            onChange={(e) => setCmEmail(e.target.value)}
            className="outline-none border rounded-[8px] w-full p-4 h-10"
          />
        </div>
      </div>
      <div className="w-full" dir="rtl">
        <label
          className="relative flex cursor-pointer items-center justify-start  gap-[1em]"
          htmlFor="tick"
        >
          <p className=" text-sm text-zinc-500 [user-select:none] pr-8 ">
            ذخیره نام، ایمیل من در مرورگر برای زمانی که دوباره دیدگاهی می‌نویسم.
          </p>
          <input
            className="peer appearance-none relative bg-yellow-500"
            id="tick"
            name="tick"
            type="checkbox"
            value={saveCmDetail}
            onChange={() => {
              setSaveCmDetail(!saveCmDetail);
              console.log(!saveCmDetail);
            }}
          />
          
          <span className={`absolute right-[-20px] top-2 md:top-1/2 h-5   w-5 -translate-x-full -translate-y-1/2
             rounded-[0.25em] border-[2px] border-zinc-500 border-opacity-70`} ></span>
          <IoCheckmark className={`absolute -right-0 top-0 h-5 text-zinc-500 z-[1]  ${saveCmDetail ? "w-5" : " w-0"}`} />

        </label>
      </div>
      <div className="w-full flex flex-col justify-start  pt-2">
        <div
          className={`${
            finallyText.length ? "flex" : "hidden"
          } text-rose-600  pb-0.5 text-sm`}
        >
          {finallyText}
        </div>
        <button
          onClick={() => addCmHandler()}
          className="bg-blue-700 text-white flex justify-center items-center w-36  max-w-52 border border-blue-600 border-b-4 font-medium  overflow-hidden relative px-4 py-2 rounded-[8px] hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
        >
          <span className="bg-blue-500  shadow-blue-600 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-[8px] opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
          ثبت دیدگاه
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

export default SetCommentSection;
