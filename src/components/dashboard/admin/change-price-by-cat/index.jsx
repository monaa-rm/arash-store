import InputTextSection from "@/components/elements/input-text-section";
import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { categorydata } from "../categories-page";

const ChangePriceByCategory = ({}) => {
  const [openAllProduct, setOpenAllProduct] = useState(false);
  const [allproductprice, setAllproductprice] = useState(0);
  const [searchedCat, setSearchedCat] = useState("");
  const [searchedList, setsearchedList] = useState([]);
  const [selectedCat, setSelectedCat] = useState({});
  const [showcat, setShowcat] = useState(false);
  const searchCatHandler = (e) => {
    setSearchedCat(e?.target?.value);
    const catListSearch = categorydata?.filter(
      (item) =>
        item?.name?.includes(searchedCat) || item?.link?.includes(searchedCat)
    );
    setsearchedList(catListSearch);
  };

  useEffect(() => {
    const handleClick = (event) => {
      if (!event.target.closest("#selectCat")) {
        setShowcat(false);
      }
    };

    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, []);
  const productPriceHandler = (value) => {
    let newvalue = value.replace(/[^0-9\-]/g, "");

    // قبول فقط یک صفر
    if (newvalue === "00") {
      newvalue = "0";
    }

    // حذف صفر ابتدایی اگر عدد دیگری بعد از آن وارد شود
    if (newvalue.length > 1 && newvalue.startsWith("0")) {
      newvalue = newvalue.substring(1);
    }

    setAllproductprice(newvalue);
  };
  return (
    <div
      className={`w-full  ${
        openAllProduct ? "" : "overflow-hidden"
      } border rounded-xl  p-4 transition-all duration-500  ${
        openAllProduct ? "h-52 sm:h-44" : "h-12"
      }`}
    >
      <div className="flex  justify-between items-center pb-6">
        <h3 className="font-bold">تغییر قیمت بر اساس دسته بندی</h3>
        <FaChevronDown
          className={`w-6 h-6 cursor-pointer  ${
            openAllProduct ? "rotate-180" : "rotate-0"
          } transition-all duration-500 `}
          onClick={() => setOpenAllProduct(!openAllProduct)}
        />
      </div>
      <div className=" bg-slate-100 rounded-lg relative px-2">
        <div
          className={`cursor-pointer w-full`}
          onClick={() => setShowcat(true)}
        >
        {selectedCat?.name ? selectedCat.name : "انتخاب دسته"}
        </div>
        <div
        id="selectCat"
          className={`bg-white absolute  left-0 right-0 z-[2] p-4 border rounded-lg transition-all duration-500 ${showcat ? "top-full opacity-100": "top-auto opacity-0 pointer-events-none"}`}
        >
          <div
            className="flex w-full top-0  items-center border-b-2 h-10  focus-within:border-indigo-500
           transition duration-300 px-3 gap-2  border-gray-500/30 py-2
            "
          >
            <input
              type="search"
              placeholder="جستجوی دسته بندی"
              value={searchedCat}
              onChange={(e) => searchCatHandler(e)}
              className="w-full bg-transparent h-full pl-4 outline-none placeholder-gray-500 text-sm"
            />
          </div>
          <div className=" w-full grid pt-1 grid-cols-2 sm:grid-cols-3 md:grid-cols-5 h-40 overflow-y-scroll lg:grid-cols-6 gap-2">
            {searchedCat && searchedList?.length ? (
              searchedList?.map((cat, i) => (
                <div
                  onClick={() => setSelectedCat(cat)}
                  key={i}
                  className={`text-sm  cursor-pointer hover:text-blue-600  ${
                    selectedCat?.name == cat.name ? "text-blue-600" : ""
                  } transition-all duration-300`}
                >
                  {cat?.name}
                </div>
              ))
            ) : searchedCat && !searchedList?.length ? (
              <div className="pb-4 text-sm text-gray-500">دسته ای یافت نشد</div>
            ) : (
              categorydata?.map((cat, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedCat(cat)}
                  className={`text-sm cursor-pointer hover:text-blue-600 ${
                    selectedCat?.name == cat.name ? "text-blue-600" : ""
                  } transition-all duration-300 `}
                >
                  {cat?.name}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <div className="w-full pt-6 flex flex-col sm:flex-row justify-between items-center  ">
        <div className="w-full sm:w-1/2">
          <InputTextSection
            id="allproductprice"
            name="allproductprice"
            value={allproductprice}
            type="text"
            setValue={productPriceHandler}
            label={"میزان تغییر قیمت"}
          />
        </div>
        <div className={`w-full sm:w-1/2 pt-4 sm:pt-0 transition-all duration-500 ${openAllProduct ? "top-full opacity-100": "top-auto opacity-0 pointer-events-none"}`}>
          <div className="flex justify-center gap-4 items-center w-full  ">
            <button className=" font-bold w-32 h-10 rounded bg-blue-600 text-white relative overflow-hidden group z-[1] hover:text-white duration-1000">
              <span className="absolute bg-blue-700 w-40 h-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
              <span className="absolute bg-blue-800 w-40 h-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
              افزایش
            </button>
            <button className=" font-bold w-32 h-10 rounded bg-blue-600 text-white relative overflow-hidden group z-[1] hover:text-white duration-1000">
              <span className="absolute bg-blue-700 w-40 h-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
              <span className="absolute bg-blue-800 w-40 h-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-[1] group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
              کاهش
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePriceByCategory;
