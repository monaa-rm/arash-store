"use client";

import InputTextSection from "@/components/elements/input-text-section";
import { setDashboardActiveItem } from "@/features/globalSlice";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CategoryBox from "../category-box";
import PropertiesBox from "../properties-box";
import DescriptionBox from "../description-box";
import ProductImages from "../productImages";

const NewProductPage = () => {
  const [productTitle, setProductTitle] = useState("");
  const [productId, setProductId] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCat, setProductCat] = useState([]);
  const [productInsocks, setProductInsocks] = useState("");
  const [productUnit, setProductUnit] = useState("");
  const [productProperties, setProductProperties] = useState([]);
  const [productDesc, setProductDesc] = useState([]);
  const [errorArray, setErrorArray] = useState([]);
  const [files, setFiles] = useState([]);
  const [productImgs, setProductImgs] = useState([]);

  const path = usePathname();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setDashboardActiveItem({ title: "افزودن محصول", link: "new-product" })
    );
    console.log("new product changed");
  }, [path]);
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

    setProductPrice(newvalue);
  };
  const productStockHandler = (value) => {
    let newvalue = value.replace(/[^0-9\-]/g, "");

    // قبول فقط یک صفر
    if (newvalue === "00") {
      newvalue = "0";
    }

    // حذف صفر ابتدایی اگر عدد دیگری بعد از آن وارد شود
    if (newvalue.length > 1 && newvalue.startsWith("0")) {
      newvalue = newvalue.substring(1);
    }

    setProductInsocks(newvalue);
  };
  const addProductHandler = () => {
    const newErrorArray = [];
    setErrorArray([]);

    if (!productTitle.length) {
      newErrorArray.push("productTitle");
    }
    if (!productId.length) {
      newErrorArray.push("productId");
    }
    if (!productUnit.length) {
      newErrorArray.push("productUnit");
    }
    if (!productPrice.length) {
      newErrorArray.push("productPrice");
    }
    if (!productInsocks.length) {
      newErrorArray.push("productInsocks");
    }
    if (!productCat.length) {
      newErrorArray.push("productCat");
    }
    if (!productImgs.length) {
      newErrorArray.push("files");
    }

    setErrorArray((prevErrorArray) => [...prevErrorArray, ...newErrorArray]); // Update using callback

    console.log({
      productTitle,
      productId,
      productPrice,
      productCat,
      productInsocks,
      productProperties,
      productDesc,
      productImgs,
    });
  };
  return (
    <div className=" w-full flex flex-col gap-8 p-4">
      <InputTextSection
        id="productTitle"
        name="productTitle"
        errorArray={errorArray}
        value={productTitle}
        setValue={setProductTitle}
        type="text"
        label={"عنوان محصول"}
      />
      <InputTextSection
        id="productId"
        name="productId"
        errorArray={errorArray}
        value={productId}
        type="text"
        setValue={setProductId}
        label={"شناسه محصول"}
      />
      <InputTextSection
        id="productPrice"
        name="productPrice"
        errorArray={errorArray}
        value={productPrice}
        type="text"
        setValue={productPriceHandler}
        label={"قیمت محصول (تومان)"}
      />
      <div className="flex gap-4 w-full">
        <InputTextSection
          id="productInsocks"
          name="productInsocks"
          errorArray={errorArray}
          value={productInsocks}
          type="text"
          setValue={productStockHandler}
          label={"موجودی محصول"}
        />
        <InputTextSection
          id="productUnit"
          name="productUnit"
          errorArray={errorArray}
          value={productUnit}
          type="text"
          setValue={setProductUnit}
          label={"واحد محصول"}
        />
      </div>
      <CategoryBox
        productCat={productCat}
        setProductCat={setProductCat}
        errorArray={errorArray}
      />
      <PropertiesBox
        productProperties={productProperties}
        setProductProperties={setProductProperties}
        title={"ویژگی های محصول"}
        placeholder="اضافه کردن ویژگی جدید"
      />
      <DescriptionBox
        productDesc={productDesc}
        setProductDesc={setProductDesc}
      />
      <ProductImages
        errorArray={errorArray}
        files={files}
        setFiles={setFiles}
        productImgs={productImgs}
        setProductImgs={setProductImgs}
        title={`انتخاب عکس محصول`}
      />
      <div
        onClick={() => addProductHandler()}
        className="relative cursor-pointer w-full py-2 flex justify-center items-center
         text-gray-100 text-sm font-bold overflow-hidden bg-gradient-to-r from-blue-600
          to-blue-950 rounded-lg transition-all duration-400 ease-in-out
           shadow-md hover:scale-100 hover:text-white hover:shadow-lg   z-[5] active:scale-90 
           before:absolute before:top-0 before:-left-full before:w-full before:h-full
    before:bg-gradient-to-r before:from-blue-700 before:to-blue-950 before:transition-all 
    before:duration-500 before:ease-in-out before:z-[-1] before:rounded-lg
     hover:before:left-0"
      >
        ثبت نهایی محصول
      </div>
    </div>
  );
};

export default NewProductPage;
