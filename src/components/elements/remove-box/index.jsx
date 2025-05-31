"use client";
import { useEffect, useState } from "react";

const RemoveBox = ({
  showRemove,
  setShowRemove,
  catToRemove,
  setCatToRemove,
  reload,
  setReload,
}) => {
  const [loading, setLoading] = useState(false);
  const [errormsg, setErrormsg] = useState("");
  useEffect(() => {
    const handleClick = (event) => {
      if (!event.target.closest("#rmBox")) {
        setShowRemove(false);
      }
    };
    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, []);
  const removeHandler = async () => {
    console.log("start")
    try {
      const res = await fetch(`/api/category/${catToRemove._id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setShowRemove(false);
        setCatToRemove(false);
        setReload(reload * -1);
      } else {
        setErrormsg(data?.error);
      }
    } catch (error) {
      setErrormsg("خطایی رخ داده است");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className={`fixed z-[1] top-0  pt-[240px] lg:pr-[200px] bottom-0 left-0 right-0 flex justify-center items-start   ${
        showRemove ? "opacity-100" : "opacity-0 pointer-events-none"
      } transition-opacity duration-300`}
    >
      <div
        id="rmBox"
        className="  h-52  w-72  bg-slate-50 border rounded-lg shadow-md flex flex-col justify-between gap-8 px-4 py-8"
      >
        <span>آیا از پاک کردن دسته {catToRemove?.name} مطمئنید؟</span>
        <div className=" flex justify-center items-center gap-2">
          <button
            onClick={() => removeHandler()}
            className="relative  w-36 h-8 font-bold rounded-md isolation-auto z-[1] text-white border-2 bg-blue-600 border-blue-500
        before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full
         before:-right-full before:hover:right-0 before:rounded-full  before:bg-blue-950 before:-z-10 
          before:aspect-square before:hover:scale-150 text-sm md:text-base overflow-hidden before:hover:duration-700
           flex justify-center items-center gap-2"
          >
            <span>پاک کردن</span>
          </button>
          <button
            onClick={() => {
              setShowRemove(false);
              setCatToRemove(null);
            }}
            className="relative w-36 h-8 font-bold rounded-md isolation-auto z-[1] text-white border-2 bg-rose-600 border-rose-500
        before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full
         before:-right-full before:hover:right-0 before:rounded-full  before:bg-rose-950 before:-z-10 
          before:aspect-square before:hover:scale-150 text-sm md:text-base  overflow-hidden before:hover:duration-700
           flex justify-center items-center gap-2"
          >
            <span>انصراف</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveBox;
