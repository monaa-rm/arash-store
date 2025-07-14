"use client";

import { useDispatch } from "react-redux";
import {
  setClientAdditionalInfo,
  setClientAddress,
  setClientCity,
  setClientEmail,
  setClientLastName,
  setClientMobileNumber,
  setClientName,
  setClientPhoneNumber,
  setClientPostalCode,
  setClientProvince,
} from "@/features/orderSlice";

const InputTextSection = ({
  id,
  name,
  value,
  setValue,
  type,
  label,
  errorArray,
  setFinallyText,
  placeholder,
  usedStore,
}) => {
  const dispatch = useDispatch();
  return (
    <div className=" w-full flex items-center justify-center">
      <div className="relative w-full">
        <input
          autoComplete="off"
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={(e) => {
            if (usedStore) {
              dispatch(setValue(e.target.value));
            } else {
              setValue(e.target.value);
            }
            setFinallyText("");
          }}
          placeholder={placeholder ? placeholder : ""}
          className={`border-b w-full text-sm  placeholder:text-xs placeholder:opacity-0 focus:placeholder:opacity-50 md:text-base  border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 
          transition-colors  focus:outline-none peer bg-inherit ${
            errorArray?.includes(name) && !value?.length
              ? " border-b border-rose-600 focus:border-b-2 focus:border-rose-600 "
              : null
          } `}
        />
        <label
          htmlFor={id}
          className={`absolute font-bold -top-3 text-xs right-0 cursor-text peer-focus:text-xs peer-focus:-top-3 
          transition-all peer-focus:text-blue-700 peer-placeholder-shown:top-1   ${
            errorArray?.includes(name) && !value?.length
              ? " text-rose-600 peer-focus:text-rose-600"
              : null
          } 
          peer-placeholder-shown:text-sm`}
        >
          {label}
        </label>
      </div>
    </div>
  );
};

export default InputTextSection;
