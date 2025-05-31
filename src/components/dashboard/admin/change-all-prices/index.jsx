import InputTextSection from "@/components/elements/input-text-section"
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa"

const ChangeAllPrices = ({}) => {
    const [openAllProduct, setOpenAllProduct] = useState(false);
    const [allproductprice, setAllproductprice] = useState(0);
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
    className={`w-full  overflow-hidden border rounded-xl  p-4 transition-all duration-500  ${
      openAllProduct ? "h-44 sm:h-32" : "h-12"
    }`}
  >
    <div className="flex  justify-between items-center">
      <h3 className="font-bold">تغییر قیمت همه محصولات</h3>
      <FaChevronDown
        className={`w-6 h-6 cursor-pointer  ${
          openAllProduct ? "rotate-180" : "rotate-0"
        } transition-all duration-500 `}
        onClick={() => setOpenAllProduct(!openAllProduct)}
      />
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
      <div className="w-full sm:w-1/2 pt-4 sm:pt-0">
        <div className="flex justify-center gap-4 items-center w-full  ">
          <button className=" font-bold w-32 h-10 rounded bg-blue-600 text-white relative overflow-hidden group z-10 hover:text-white duration-1000">
            <span className="absolute bg-blue-700 w-40 h-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
            <span className="absolute bg-blue-800 w-40 h-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
            افزایش
          </button>
          <button className=" font-bold w-32 h-10 rounded bg-blue-600 text-white relative overflow-hidden group z-10 hover:text-white duration-1000">
            <span className="absolute bg-blue-700 w-40 h-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
            <span className="absolute bg-blue-800 w-40 h-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
            کاهش
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default ChangeAllPrices
