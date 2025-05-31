"use client";

import { formatNumberToPersian } from "@/utiles/utils-func";
import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { getTrackBackground, Range } from "react-range";

const STEP = 1000;
const MIN = 0;
const MAX = 2000000;
const rtl = true;
const SearchPriceFilter = () => {
  const [values, setValues] = useState([0, 2000000]);
  return (
    <div className="h-52 w-full max-w-80 rounded-lg border bg-white  py-4 px-4">
      <h1 className="font-bold">فیلتر بر اساس قیمت:</h1>
      <div className="flex justify-center px-2 pt-4 flex-wrap">
        <Range
          draggableTrack
          values={values}
          step={STEP}
          min={MIN}
          max={MAX}
          rtl={rtl}
          onChange={(values) => {
            setValues(values);
          }}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
                height: "36px",
                display: "flex",
                width: "100%",
                padding:"0 10px"
              }}
            >
              <div
                ref={props.ref}
                style={{
                  height: "3px",
                  width: "100%",
                  borderRadius: "4px",
                  background: getTrackBackground({
                    values,
                    colors: ["#ccc", "#548BF4", "#ccc"],
                    min: MIN,
                    max: MAX,
                    rtl,
                  }),
                  alignSelf: "center",
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props, isDragged }) => (
            <div
              {...props}
              key={props.key}
              style={{
                ...props.style,
                height: "25px",
                width: "25px",
                borderRadius: "25px",
                backgroundColor: "#FFF",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0px 2px 6px #AAA",
              }}
            >
              <div
                style={{
                  height: "16px",
                  width: "5px",
                  backgroundColor: isDragged ? "#548BF4" : "#CCC",
                }}
              />
            </div>
          )}
        />
        <output
          className=" pt-2 flex justify-between w-full  text-sm"
          id="output"
        >
          <span> {formatNumberToPersian(values[0])} تومان</span>
          <span> {formatNumberToPersian(values[1])} تومان</span>
        </output>
      </div>
      <button className="bg-blue-800 mt-6 flex justify-center items-center gap-2 w-full text-white border border-blue-700 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
        <span className="bg-blue-700 shadow-blue-700 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
        <FaFilter />
        صافی
      </button>
    </div>
  );
};

export default SearchPriceFilter;
