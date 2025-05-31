import ProductRating from "@/components/elements/product-rating";
import { useState } from "react";

const SetCommentSection = ({ showCm, setShowCm }) => {
  const [rating, setRating] = useState(0);
  const [cmText, setCmText] = useState("");
  const [cmName, setCmName] = useState("");
  const [cmEmail, setCmEmail] = useState("");
  const [saveCmDetail, setSaveCmDetail] = useState(false);

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
          className=" outline-none border rounded-lg p-4 max-h-52"
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
            className="outline-none border rounded-lg w-full p-4 h-10"
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
            className="outline-none border rounded-lg w-full p-4 h-10"
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
            className="peer appearance-none"
            id="tick"
            name="tick"
            type="checkbox"
            value={saveCmDetail}
            onChange={() => {
              setSaveCmDetail(!saveCmDetail);
              console.log(!saveCmDetail);
            }}
          />
          <span className="absolute right-[-20px] top-2 md:top-1/2 h-5 w-5 -translate-x-full -translate-y-1/2 rounded-[0.25em] border-[2px] border-zinc-500 border-opacity-70"></span>
          <svg
            viewBox="0 0 69 89"
            className="absolute right-[-20px] top-2 md:top-1/2 h-5 w-5  -translate-x-full -translate-y-1/2 duration-500 ease-out [stroke-dasharray:100] [stroke-dashoffset:100] peer-checked:[stroke-dashoffset:0]"
            fill="none"
            height="50"
            width="50"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M.93 63.984c3.436.556 7.168.347 10.147 2.45 4.521 3.19 10.198 8.458 13.647 12.596 1.374 1.65 4.181 5.922 5.598 8.048.267.4-1.31.823-1.4.35-5.744-30.636 9.258-59.906 29.743-81.18C62.29 2.486 63.104 1 68.113 1"
              strokeWidth="6px"
              stroke="#1d4ed8"
              pathLength="100"
            ></path>
          </svg>
        </label>
      </div>
      <div className="w-full flex justify-start  pt-2">
        <button className="bg-blue-700 text-white  max-w-52 border border-blue-600 border-b-4 font-medium  overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
          <span className="bg-blue-500 shadow-blue-600 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
          ثبت دیدگاه
        </button>
      </div>
    </div>
  );
};

export default SetCommentSection;
