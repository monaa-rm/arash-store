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
import EditImages from "../edit-images";

const ProductEditSinglePage = ({ data }) => {
  const [productTitle, setproductTitle] = useState(data?.productTitle || "");
  const [productId, setProductId] = useState(data?.productId || "");
  const [productPrice, setProductPrice] = useState(data?.price.howMuch || "");
  const [productCat, setProductCat] = useState(data?.category || []);
  const [productInsocks, setProductInsocks] = useState(data?.instock || "");
  const [productUnit, setProductUnit] = useState(data?.unit || "");
  const [productProperties, setProductProperties] = useState(
    data?.properties || []
  );
  const [productDesc, setProductDesc] = useState(data?.description || []);
  const [errorArray, setErrorArray] = useState([]);
  const [images, setImages] = useState(data?.imageSrc || []);
  const [files, setFiles] = useState([]);

  const path = usePathname();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setDashboardActiveItem({
        title: "ویرایش/حذف محصول",
        link: "edit-product",
      })
    );
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
    if (!files.length) {
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
      files,
    });
  };
  return (
    <div className=" w-full flex flex-col gap-8 p-4">
      <InputTextSection
        id="productTitle"
        name="productTitle"
        errorArray={errorArray}
        value={productTitle}
        setValue={setproductTitle}
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
      <CategoryBox productCat={productCat} setProductCat={setProductCat} />
      <PropertiesBox
        productProperties={productProperties}
        setProductProperties={setProductProperties}
        placeholder="اضافه کردن ویژگی جدید"
      />
      <DescriptionBox
        productDesc={productDesc}
        setProductDesc={setProductDesc}
        title={"ویژگی های محصول"}
      />
      {data?.imageSrc?.length ? <EditImages images={data?.imageSrc} /> : null}
      <ProductImages files={files} setFiles={setFiles} title={`انتخاب عکس محصول`} />
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

export default ProductEditSinglePage;
