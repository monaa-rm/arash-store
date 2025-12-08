"use client";

import InputTextSection from "@/components/elements/input-text-section";
import SelectProvince from "@/components/elements/select-location";
import SendFree from "@/components/elements/send-free";
import { useEffect, useState } from "react";
import YourOrders from "../your-orders";
import { useDispatch, useSelector } from "react-redux";
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
  setOrderProducts,
} from "@/features/orderSlice";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { citiesList } from "@/utiles/cities";

const ChackoutPage = ({ snapCitites }) => {
  const [cost, setCost] = useState(0);
  const orderProducts =
    useSelector((store) => store.orderSlice.orderProducts) || [];
  const [postcost, setPostCost] = useState(0);
  const clientName = useSelector((store) => store.orderSlice.clientName) || "";
  const clientLastName =
    useSelector((store) => store.orderSlice.clientLastName) || "";
  const clientProvince =
    useSelector((store) => store.orderSlice.clientProvince) || {};
  const clientCity = useSelector((store) => store.orderSlice.clientCity) || {};
  const clientAddress =
    useSelector((store) => store.orderSlice.clientAddress) || "";
  const clientPostalCode =
    useSelector((store) => store.orderSlice.clientPostalCode) || "";
  const clientPhoneNumber =
    useSelector((store) => store.orderSlice.clientPhoneNumber) || "";
  const clientMobileNumber =
    useSelector((store) => store.orderSlice.clientMobileNumber) || "";
  const clientEmail =
    useSelector((store) => store.orderSlice.clientEmail) || "";
  const clientAdditionalInfo =
    useSelector((store) => store.orderSlice.clientAdditionalInfo) || "";
  const freeSending =
    useSelector((store) => store.orderSlice.freeSending) || false;

  // const [selectedProvinceCity, setSelectedProvinceCity] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorArray, setErrorArray] = useState([]);
  const [finallyText, setFinallyText] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    let selectedCityList = [];
    if (clientProvince?.id) {
      selectedCityList = citiesList?.filter(
        (city) => city.province_id == clientProvince?.id
      );
      setSelectedProvinceCity(selectedCityList);
    }
  }, [clientProvince]);

  useEffect(() => {
    async function fetchEstimate() {
      console.log("start");
      let totalWeight = 0;
      orderProducts?.map((item) => {
        console.log(item);
        totalWeight = totalWeight + +item?.quantity * +item?.weight;
      });
      const formdata = {
        destinationCityId: clientCity?.id,
        weight: totalWeight,
        insuranceValue: cost,
      };
      console.log(formdata);
      const res = await fetch(`/api/order/estimate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      console.log(data?.data?.finalPrice);
      const tomanSendinsCost = +data?.data?.finalPrice / 10;

      setPostCost(Math.ceil(tomanSendinsCost / 1000) * 1000);
    }
    if (!freeSending && clientCity?.id) {
      fetchEstimate();
    }
  }, [clientCity, freeSending]);

  const checkoutHandler = async (e) => {
    e.preventDefault();
    const newErrorArray = [];
    setErrorArray([]);
    setLoading(true);
    if (status !== "authenticated") {
      console.log("status not authenticated");
      setLoading(false);
      return setFinallyText("لطفا وارد سایت شوید");
    }
    try {
      if (
        !clientName.length ||
        !clientLastName.length ||
        // !clientProvince?.id ||
        !clientCity?.id ||
        !clientAddress.length ||
        !clientPostalCode.length ||
        !clientMobileNumber.length ||
        !orderProducts?.length
      ) {
        if (!clientName.length) {
          newErrorArray.push("clientName");
        }
        if (!clientLastName.length) {
          newErrorArray.push("clientLastName");
        }
        if (!clientAddress.length) {
          newErrorArray.push("clientAddress");
        }
        if (!clientPostalCode.length) {
          newErrorArray.push("clientPostalCode");
        }
        if (!clientMobileNumber.length) {
          newErrorArray.push("clientMobileNumber");
        }
        // if (!clientProvince?.id) {
        //   newErrorArray.push("clientProvince");
        // }
        if (!clientCity?.id) {
          newErrorArray.push("clientCity");
        }

        setErrorArray((prevErrorArray) => [
          ...prevErrorArray,
          ...newErrorArray,
        ]); // Update using callback
        setFinallyText("اطلاعات کامل نیست");
      } else {
        const formData = {
          clientName,
          clientLastName,
          clientProvince,
          clientCity,
          clientAddress,
          clientPostalCode,
          clientPhoneNumber,
          clientMobileNumber,
          clientEmail,
          clientAdditionalInfo,
          items: orderProducts,
          allCost: cost ,
          client: session?.user,
        };
        const res = await fetch("/api/order/checkout", {
          method: "POST",
          body: JSON.stringify(formData),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (!res.ok) {
          setFinallyText(data?.error);
        } else {
          router.push("/checkout/success");
          dispatch(setOrderProducts([]));
          localStorage.removeItem("orders");
        }
      }
    } catch (error) {
      console.log(error);
      setFinallyText("خطا در ارسال اطلاعات");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form className=" w-full flex flex-col gap-4 p-4 relative">
      <SendFree />
      <h3 className="font-bold text-xl sm:pt-2">اطلاعات شما</h3>
      <div className="w-full flex flex-col gap-8 pt-4">
        <InputTextSection
          id="clientName"
          name="clientName"
          errorArray={errorArray}
          value={clientName}
          setValue={setClientName}
          type="text"
          label={"نام"}
          finallyText={finallyText}
          setFinallyText={setFinallyText}
          usedStore={true}
        />
        <InputTextSection
          id="clientLastName"
          name="clientLastName"
          errorArray={errorArray}
          value={clientLastName}
          setValue={setClientLastName}
          type="text"
          label={"نام خانوادگی"}
          finallyText={finallyText}
          setFinallyText={setFinallyText}
          usedStore={true}
        />

        <SelectProvince
          errorArray={errorArray}
          value={clientCity}
          setValue={setClientCity}
          finallyText={finallyText}
          setFinallyText={setFinallyText}
          id="clientCity"
          name="clientCity"
          list={snapCitites}
          title={"شهر"}
          available={true}
        />
        <InputTextSection
          id="clientAddress"
          name="clientAddress"
          errorArray={errorArray}
          value={clientAddress}
          setValue={setClientAddress}
          type="text"
          label={"آدرس دقیق"}
          finallyText={finallyText}
          setFinallyText={setFinallyText}
          usedStore={true}
        />
        <InputTextSection
          id="clientPostalCode"
          name="clientPostalCode"
          errorArray={errorArray}
          value={clientPostalCode}
          setValue={setClientPostalCode}
          type="text"
          label={"کد پستی"}
          finallyText={finallyText}
          setFinallyText={setFinallyText}
          usedStore={true}
        />
        <InputTextSection
          id="clientMobileNumber"
          name="clientMobileNumber"
          errorArray={errorArray}
          value={clientMobileNumber}
          setValue={setClientMobileNumber}
          placeholder="09123456789"
          type="number"
          label={"شماره موبایل"}
          finallyText={finallyText}
          setFinallyText={setFinallyText}
          usedStore={true}
        />
        <InputTextSection
          id="clientPhoneNumber"
          name="clientPhoneNumber"
          errorArray={errorArray}
          value={clientPhoneNumber}
          setValue={setClientPhoneNumber}
          type="number"
          usedStore={true}
          // placeholder={
          //   clientProvince?.id ? `${clientProvince?.tel_prefix}00000000` : ""
          // }
          placeholder={`01300000000`}
          label={"شماره تلفن (اختیاری)"}
          finallyText={finallyText}
          setFinallyText={setFinallyText}
        />
        <InputTextSection
          id="clientEmail"
          name="clientEmail"
          errorArray={errorArray}
          value={clientEmail}
          setValue={setClientEmail}
          type="email"
          label={"ایمیل (اختیاری)"}
          finallyText={finallyText}
          setFinallyText={setFinallyText}
          usedStore={true}
        />
        <InputTextSection
          id="clientAdditionalInfo"
          name="clientAdditionalInfo"
          errorArray={errorArray}
          value={clientAdditionalInfo}
          setValue={setClientAdditionalInfo}
          type="text"
          label={"توضیحات تکمیلی (اختیاری)"}
          finallyText={finallyText}
          setFinallyText={setFinallyText}
          placeholder={"نکات مهم برای تحویل بار"}
          usedStore={true}
        />
      </div>
      <YourOrders cost={cost} setCost={setCost} postcost={postcost} />
      <div className="flex gap-1 items-center justify-start">
        <svg className="w-8 h-8 sm:w-4 sm:h4  text-blue-400">
          <use href="/sprite.svg#menu_info_icon" />
        </svg>
        <p className="text-gray-500 text-sm">
          اطلاعات شخصی شما برای پردازش سفارش شما و پشتیبانی از تجربه ی شما در
          این وبسایت استفاده میشود.
        </p>
      </div>
      <div className="w-full">
        <div
          className={`${
            finallyText.length ? "flex" : "hidden"
          } text-rose-600  pb-0.5 text-sm`}
        >
          {finallyText}
        </div>
        <button
          onClick={(e) => checkoutHandler(e)}
          type="button"
          className="relative cursor-pointer w-full py-2 flex gap-2 justify-center items-center
         text-gray-100 text-sm md:text-base font-bold overflow-hidden bg-gradient-to-r from-blue-600
          to-blue-950 rounded-[8px] transition-all duration-400 ease-in-out
           shadow-md hover:scale-100 hover:text-white hover:shadow-lg   active:scale-90 
           before:absolute before:top-0 before:-left-full before:w-full before:h-full
    before:bg-gradient-to-r before:from-blue-700 before:to-blue-950 before:transition-all 
    before:duration-500 before:ease-in-out before:z-[-1] before:rounded-[8px]
     hover:before:left-0"
        >
          {loading ? (
            <Image
              src={"/images/spinner.svg"}
              alt="spinner"
              width={25}
              height={25}
            />
          ) : (
            <svg className="w-5 h-5 text-white">
              <use href="/sprite.svg#filled_lock_icon" />
            </svg>
          )}
          ثبت سفارش
        </button>
      </div>
    </form>
  );
};

export default ChackoutPage;
