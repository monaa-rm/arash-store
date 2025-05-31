"use client";

import InputTextSection from "@/components/elements/input-text-section";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai"; // یا هر آیکون حذف دیگری که دوست داری
import { FaPlus } from "react-icons/fa";
import { IoMdRemoveCircleOutline } from "react-icons/io";

const PropertiesBox = ({ productProperties, setProductProperties , title , placeholder }) => {
  const [text, setText] = useState("");
  //   const [productProperties, setProductProperties] = useState([]);

  const handleAddTodo = () => {
    if (text.trim() !== "") {
      setProductProperties([...productProperties, text]);
      setText(""); // پاک کردن اینپوت بعد از افزودن
    }
  };

  const handleDeleteTodo = (index) => {
    const newproductProperties = [...productProperties];
    newproductProperties.splice(index, 1);
    setProductProperties(newproductProperties);
  };

  return (
    <div className="flex flex-col gap-4 ">
      <h3 className="py-2 font-bold">{title}</h3>
      <div className="flex  flex-col sm:flex-row items-center gap-2">
        <InputTextSection
          id={`${productProperties}`}
          name={`${productProperties}`}
          value={text}
          type="text"
          setValue={setText}
          label={placeholder}
        />

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

      <div className="flex flex-col gap-1">
        {productProperties?.map((todo, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-slate-50 px-2 py-1 rounded-md"
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
    </div>
  );
};

export default PropertiesBox;
