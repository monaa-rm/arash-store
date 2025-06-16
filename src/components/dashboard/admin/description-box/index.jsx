"use client";

import InputTextSection from "@/components/elements/input-text-section";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai"; // یا هر آیکون حذف دیگری که دوست داری
import { FaPlus } from "react-icons/fa";
import { IoMdRemoveCircleOutline } from "react-icons/io";

const DescriptionBox = ({
  productDesc,
  setProductDesc,
  finallyText,
  setFinallyText,
}) => {
  const [textTitle, setTextTitle] = useState("");
  const [descText, setDeskText] = useState("");
  const [descList, setDescList] = useState([]);

  const handleAddTodo = () => {
    if (descText.trim() !== "") {
      setDescList([...descList, descText]);
      setDeskText(""); // پاک کردن اینپوت بعد از افزودن
    }
  };

  const handleDeleteTodo = (index) => {
    const newDescList = [...descList];
    newDescList.splice(index, 1);
    setDescList(newDescList);
  };
  const handleDeleteItem = (index) => {
    const newProductDesc = [...productDesc];
    newProductDesc.splice(index, 1);
    setProductDesc(newProductDesc);
  };
  const handleProductDesc = () => {
    const newDesc = { title: textTitle, desc: descList };
    setProductDesc([...productDesc, newDesc]);
    console.log(newDesc);
    setTextTitle("");
    setDeskText("");
    setDescList([]);
  };
  return (
    <div className="flex flex-col gap-4 w-full">
      <h3 className="py-2 font-bold">توضیحات محصول</h3>
      <div className=" flex flex-col gap-8 items-center w-full">
        <InputTextSection
          id="textTitle"
          name="textTitle"
          value={textTitle}
          type="text"
          setValue={setTextTitle}
          label={"عنوان"}
          finallyText={finallyText}
          setFinallyText={setFinallyText}
        />
        <div className="flex w-full items-center gap-2">
          <div className="relative w-full">
            <textarea
              id="productDescId"
              name="productDescId"
              rows={1}
              value={descText}
              onChange={(e) => setDeskText(e.target.value)}
              placeholder=""
              className="border-b w-full min-h-10 text-sm  md:text-base border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 
          transition-colors focus:outline-none peer bg-inherit"
            />
            <label
              htmlFor="productDescId"
              className="absolute font-bold -top-3 text-xs right-0 cursor-text peer-focus:text-xs peer-focus:-top-3 
          transition-all peer-focus:text-blue-700 peer-placeholder-shown:top-1 
          peer-placeholder-shown:text-sm"
            >
              توضیح
            </label>
          </div>
          <button
            onClick={handleAddTodo}
            className="bg-blue-950 flex justify-center items-center gap-2  hover:bg-slate-800 transition-all duration-300
           text-white outline-none font-bold w-full sm:w-8 h-8 py-1 sm:py-0
          rounded-md "
          >
            <span className="flex sm:hidden">افزودن</span>
            <FaPlus />
          </button>
        </div>
        {descList.length ? (
          <div className="flex flex-col w-full gap-2 bg-blue-100  py-1 rounded-md">
            {textTitle ? (
              <div className="flex justify-between items-center gap-2 px-2 font-bold">
                <span>{textTitle}</span>
                <button
                  onClick={() => setTextTitle("")}
                  className="text-red-500"
                >
                  <IoMdRemoveCircleOutline />
                </button>
              </div>
            ) : null}
            {descList?.map((todo, index) => (
              <div
                key={index}
                className="flex items-center justify-between  px-2"
              >
                <span>{todo}</span>
                <button
                  onClick={() => handleDeleteTodo(index)}
                  className="text-red-500"
                >
                  <IoMdRemoveCircleOutline />
                </button>
              </div>
            ))}
          </div>
        ) : null}

        <button
          onClick={handleProductDesc}
          className="bg-blue-950 flex justify-center items-center gap-2  hover:bg-slate-800 transition-all duration-300
           text-white outline-none font-bold w-full  h-8 py-1 sm:py-0
          rounded-md "
        >
          <span className="flex ">افزودن</span>
          <FaPlus />
        </button>
      </div>
      <div className="flex flex-col w-full gap-1">
        {productDesc?.map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 bg-slate-50 px-2 py-1 rounded-md"
          >
            {item?.title ? (
              <div className="flex justify-between items-center gap-2 font-bold">
                <span>{item?.title}</span>
                <button
                  onClick={() => handleDeleteItem(index)}
                  className="text-red-500"
                >
                  <IoMdRemoveCircleOutline />
                </button>
              </div>
            ) : null}
            {item?.desc?.map((desc, i) => (
              <div
                key={i}
                className="flex justify-between items-center text-gray-500 text-sm gap-2"
              >
                <span>{desc}</span>
                {!item?.title ? (
                  <button
                    onClick={() => handleDeleteItem(index)}
                    className="text-red-500"
                  >
                    <IoMdRemoveCircleOutline />
                  </button>
                ) : null}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DescriptionBox;
