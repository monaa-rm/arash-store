"use client";
import { provinceList } from "@/utiles/provinces";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const SelectLocation = ({
  value,
  setValue,
  setFinallyText,
  errorArray,
  id,
  name,
  list,
  title,
  available,
}) => {
  const [showBox, setShowBox] = useState(false);
  const [searchedValue, setSearchedValue] = useState("");
  const [searchedList, setSearchedList] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const handleClick = (event) => {
      if (!event.target?.closest(`#${id}`)) {
        setSearchedValue("");
        setShowBox(false);
      }
    };

    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, []);
  // const cityProvince = (id) => {
  //   const nameprov = provinceList.find((prov) => prov.id == id);
  //  if(nameprov) return nameprov?.name;
  // };
  const searchHandler = (e) => {
    setSearchedValue(e?.target?.value);
    const listSearch = list?.filter((item) =>
      item?.title?.includes(searchedValue)
    );
    setSearchedList(listSearch);
  };
  const listHandler = (item) => {
    setFinallyText("");
    dispatch(setValue(item));
    setShowBox(false);
  };

  return (
    <div className="w-full relative">
      <div className="relative  h-7 w-full ">
        <div
          onClick={() => {
            if (available) setShowBox(true);
          }}
          className={`border-b w-full text-sm cursor-pointer flex justify-start items-center right-0 peer-focus:text-xs
               ${
                 showBox ? " border-b-2 border-blue-700" : "border-gray-300 "
               }  ${value?.id ? "h-8 " : "h-5"}
          transition-all  bg-inherit
           ${
             errorArray?.includes(name) && !value?.id
               ? "  border-b border-rose-600 focus:border-b-2 focus:border-rose-600 "
               : null
           }`}
        >
          <div className="text-[#5c5c5c]">
            {value?.title} - {/* {cityProvince(value?.province_id)} */}{value?.stateTitle}
          </div>
        </div>
        <div
          onClick={() => {
            if (available) setShowBox(true);
          }}
          className={`absolute cursor-pointer flex gap-1  h-8  font-bold right-0
          transition-all ${showBox ? " text-blue-700 text-xs " : "text-sm"} ${
            value?.id ? "text-xs -top-3   " : " text-sm -top-1 "
          }  peer-placeholder-shown:top-1  ${
            errorArray?.includes(name) && !value?.id ? "  text-rose-600 " : null
          }
          `}
        >
          {title}

          <svg
            className={`w-4 h-4 mt-0.5 transition-all duration-300 ${
              showBox ? "rotate-180" : "rotate-0"
            }`}
          >
            <use href="/sprite.svg#dropdown_icon" />
          </svg>
        </div>
      </div>
      <div
        id={`${id}`}
        className={` absolute z-[1] top-10 w-full sm:w-96 flex flex-col gap-4 border  rounded-[8px] bg-slate-50 
            h-52 overflow-y-scroll   ${
              showBox ? "opacity-100" : "opacity-0 pointer-events-none"
            } transition-opacity duration-300 `}
      >
        <div
          className="flex sticky w-full top-0 items-center border-b-2 h-10  focus-within:border-indigo-500
           transition duration-300 px-3 gap-2 bg-white border-gray-500/30 py-2
            "
        >
          <input
            type="search"
            placeholder="جستجو"
            value={searchedValue}
            onChange={(e) => searchHandler(e)}
            className="w-full h-full pl-4 outline-none placeholder-gray-500 text-sm"
          />
        </div>

        <div className="w-full flex flex-col">
          {searchedValue && searchedList?.length ? (
            searchedList?.map((item, i) => (
              <div
                onClick={() => listHandler(item)}
                key={i}
                className={`text-sm   p-2 border-b
  ${
    value?.id == item?.id
      ? "bg-blue-600 text-white"
      : "bg-inherit hover:text-blue-600 hover:bg-gray-100"
  }
                } cursor-pointer  transition-all duration-300`}
              >
                {item?.title} - {/* {cityProvince(item?.province_id)} */} {item?.stateTitle}
              </div>
            ))
          ) : searchedValue && !searchedValue?.length ? (
            <div className="pb-4 text-sm text-gray-500">دسته ای یافت نشد</div>
          ) : (
            list?.map((item, i) => (
              <div
                key={i}
                onClick={() => listHandler(item)}
                className={`text-sm  p-2 border-b
                    ${
                      value?.id == item?.id
                        ? "bg-blue-600 text-white"
                        : "bg-inherit hover:text-blue-600 hover:bg-gray-100"
                    }
                 cursor-pointer  transition-all duration-300 `}
              >
                {item?.title} - {item?.stateTitle}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectLocation;
