import InputTextSection from "@/components/elements/input-text-section";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const ChangeAllPrices = ({ reload, setReload }) => {
  const [openAllProduct, setOpenAllProduct] = useState(false);
  const [allproductprice, setAllproductprice] = useState(0);
  const [finallyText, setFinallyText] = useState("");
  const [loading, setLoading] = useState(false);
  const [operation, setOperation] = useState(null);
  const { data: session } = useSession();
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
  const changePriceHandler = async (value) => {
    try {
      setLoading(true);
      const formData = {
        operation: value,
        adjustmentValue: allproductprice,
        session: session?.user,
      };
      const res = await fetch(`/api/stock-price/change-all-prices`, {
        method: "PATCH",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });
      const errorData = await res.json();
      if (!res.ok) {
        setFinallyText(errorData.error || "خطایی رخ داده است");
      } else {
        setReload(reload * -1);
        setFinallyText("");
        setAllproductprice(0);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setFinallyText("خطایی رخ داده است");
    }
  };
  return (
    <div
      className={`w-full  overflow-hidden border rounded-xl  p-4 transition-all duration-500  ${
        openAllProduct ? "h-44 sm:h-36" : "h-12"
      }`}
    >
      <div
        onClick={() => setOpenAllProduct(!openAllProduct)}
        className="flex cursor-pointer  justify-between items-center"
      >
        <h3 className="font-bold">تغییر قیمت همه محصولات</h3>

        <FaChevronDown
          className={`w-6 h-6 cursor-pointer  ${
            openAllProduct ? "rotate-180" : "rotate-0"
          } transition-all duration-500 `}
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
            label={"میزان تغییر قیمت (تومان)"}
            finallyText={finallyText}
            setFinallyText={setFinallyText}
          />
        </div>
        <div className="w-full sm:w-1/2 pt-4 sm:pt-0">
          <div className="flex justify-center gap-4 items-center w-full  ">
            <button
              disabled={!allproductprice.length}
              onClick={() => {
                setOperation("add");
                changePriceHandler("add");
              }}
              className=" font-bold w-32 h-10 rounded bg-blue-600 text-white relative overflow-hidden group z-[1] hover:text-white duration-1000"
            >
              <span className="absolute bg-blue-700 w-40 h-36 rounded-full group-hover:scale-100 scale-0 -z-[1] -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
              <span className="absolute bg-blue-800 w-40 h-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-[1] group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
              <div className="flex justify-center w-full items-center gap-2">
                افزایش
                {loading && operation == "add" ? (
                  <Image
                    src={"/images/spinner.svg"}
                    alt="spinner"
                    width={25}
                    height={25}
                  />
                ) : null}
              </div>
            </button>
            <button
              disabled={!allproductprice.length}
              onClick={() => {
                setOperation("subtract");
                changePriceHandler("subtract");
              }}
              className=" font-bold w-32 h-10 rounded bg-blue-600 text-white relative overflow-hidden group z-[1] hover:text-white duration-1000"
            >
              <span className="absolute bg-blue-700 w-40 h-36 rounded-full group-hover:scale-100 scale-0 -z-[1] -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
              <span className="absolute bg-blue-800 w-40 h-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-[1] group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
              <div className="flex justify-center w-full items-center gap-2">
                کاهش
                {loading && operation == "subtract" ? (
                  <Image
                    src={"/images/spinner.svg"}
                    alt="spinner"
                    width={25}
                    height={25}
                  />
                ) : null}
              </div>
            </button>
          </div>
        </div>
      </div>
      <div
        className={`${
          finallyText.length
            ? "flex text-rose-600 text-sm text-center pt-2"
            : "hidden"
        }`}
      >
        {finallyText}
      </div>
    </div>
  );
};

export default ChangeAllPrices;
