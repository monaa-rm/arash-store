import { setFreeSending } from "@/features/globalSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AdminSendingFree = ({ sub, title }) => {
  const freeSending =
    useSelector((store) => store.globalSlice.freeSending) || false;
  const dispatch = useDispatch();
  const [errText, setErrorText] = useState("");

  const setFreeSendingHandler = async () => {
    console.log("ok")
    dispatch(setFreeSending(!freeSending));
    setErrorText("");
    try {
      const res = await fetch("/api/stock-price/free-sending", {
        method: "POST",
        body: JSON.stringify({ freeSending: !freeSending }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(setFreeSending(freeSending));
        setErrorText("خطا");
      }
    } catch (error) {
      setErrorText("خطا");
      dispatch(setFreeSending(freeSending));
    }
  };

  return (
    <div className="flex justify-between items-center w-full sm:w-96 border rounded-[10px] p-2 ">
      <h3 className="py-2 font-bold">ارسال رایگان</h3>
      <div className="flex justify-end items-center gap-2">
        <span className="text-rose-600 text-sm">{errText}</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            value={freeSending}
            onChange={() => setFreeSendingHandler()}
            className="sr-only peer"
            checked={freeSending}
          />
          <div
            className="group peer ring-0  bg-gradient-to-bl from-neutral-800 via-neutral-700
to-neutral-600  rounded-full outline-none duration-1000 after:duration-300 w-20 h-8 
shadow-md  peer-focus:outline-none  after:content-[''] after:rounded-full after:absolute 

after:[background:#0D2B39]   peer-checked:after:rotate-180 
after:[background:conic-gradient(from_135deg,_#b2a9a9,_#b2a8a8,_#ffffff,_#d7dbd9_,_#ffffff,_#b2a8a8)] 
after:outline-none after:h-7 after:w-7 after:top-0.5 after:left-1   peer-checked:after:translate-x-12
peer-hover:after:scale-95 peer-checked:bg-gradient-to-r peer-checked:from-blue-500
peer-checked:to-blue-900"
          ></div>
        </label>
      </div>
    </div>
  );
};

export default AdminSendingFree;
