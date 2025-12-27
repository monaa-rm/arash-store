"use client";

import InputTextSection from "@/components/elements/input-text-section";
import { setDashboardActiveItem } from "@/features/globalSlice";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CategoryBox from "../category-box";
import PropertiesBox from "../properties-box";
import DescriptionBox from "../description-box";
import ProductImages from "../productImages";
import { useSession } from "next-auth/react";
import Image from "next/image";

const ProductEditSinglePage = ({ data }) => {
  const [productTitle, setProductTitle] = useState(data?.title || "");
  const [productId, setProductId] = useState(data?.productId || "");
  const [productPrice, setProductPrice] = useState(
    String(data?.price?.howMuch) || ""
  );
  const [productCat, setProductCat] = useState(data?.category || []);
  const [productInsocks, setProductInsocks] = useState(
    String(data?.instock) || ""
  );
  const [productUnit, setProductUnit] = useState(data?.unit || "");
  const [productProperties, setProductProperties] = useState(
    data?.properties || []
  );
  const [width, setWidth] = useState(String(data?.width) || "");
  const [height, setHeight] = useState(String(data?.height) || "");
  const [weight, setWeight] = useState(String(data?.weight) || "");
  const [productDesc, setProductDesc] = useState(data?.description || []);
  const [errorArray, setErrorArray] = useState([]);
  const [files, setFiles] = useState([]);
  const [productImgs, setProductImgs] = useState(data?.imageSrc || []);
  const [finallyText, setFinallyText] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();
  const path = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(
      setDashboardActiveItem({
        title: "ویرایش/حذف محصول",
        link: "edit-product",
      })
    );
  }, [path]);

  const productPriceHandler = (value) => {
    setFinallyText("");
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
  const persianNumbers = [
/۰/g,
/۱/g,
/۲/g,
/۳/g,
/۴/g,
/۵/g,
/۶/g,
/۷/g,
/۸/g,
/۹/g,
];
const arabicNumbers = [
/٠/g,
/١/g,
/٢/g,
/٣/g,
/٤/g,
/٥/g,
/٦/g,
/٧/g,
/٨/g,
/٩/g,
];
  const productStockHandler = (value) => {
    setFinallyText("");

    let englishValue = value;
    for (let i = 0; i < 10; i++) {
      englishValue = englishValue
        .replace(persianNumbers[i], i)
        .replace(arabicNumbers[i], i);
    }
    let newvalue = value.replace(/[^0-9]/g, "");

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
    const heightHandler = (value) => {
    setFinallyText("");
       let englishValue = value;
    for (let i = 0; i < 10; i++) {
      englishValue = englishValue
        .replace(persianNumbers[i], i)
        .replace(arabicNumbers[i], i);
    }
    let newvalue = englishValue.replace(/[^0-9]/g, "");

    // قبول فقط یک صفر
    if (newvalue === "00") {
      newvalue = "0";
    }

    // حذف صفر ابتدایی اگر عدد دیگری بعد از آن وارد شود
    if (newvalue.length > 1 && newvalue.startsWith("0")) {
      newvalue = newvalue.substring(1);
      console.log(newvalue);
      return newvalue;
    }
    setHeight(newvalue);
  };
  const widthHandler = (value) => {
    setFinallyText("");
    
    let englishValue = value;
    for (let i = 0; i < 10; i++) {
      englishValue = englishValue
        .replace(persianNumbers[i], i)
        .replace(arabicNumbers[i], i);
    }

    // --- 2️⃣ حذف هر چیزی به جز عدد و علامت منفی ---
    let newvalue = englishValue.replace(/[^0-9]/g, "");

    // قبول فقط یک صفر
    if (newvalue === "00") {
      newvalue = "0";
    }

    // حذف صفر ابتدایی اگر عدد دیگری بعد از آن وارد شود
    if (newvalue.length > 1 && newvalue.startsWith("0")) {
      newvalue = newvalue.substring(1);
      return newvalue;
    }
    setWidth(newvalue);
  };
  const weightHandler = (value) => {
    setFinallyText("");

    let englishValue = value;
    for (let i = 0; i < 10; i++) {
      englishValue = englishValue
        .replace(persianNumbers[i], i)
        .replace(arabicNumbers[i], i);
    }

    // --- 2️⃣ حذف هر چیزی به جز عدد و علامت منفی ---
    let newvalue = englishValue.replace(/[^0-9]/g, "");
    // قبول فقط یک صفر
    if (newvalue === "00") {
      newvalue = "0";
    }

    // حذف صفر ابتدایی اگر عدد دیگری بعد از آن وارد شود
    if (newvalue.length > 1 && newvalue.startsWith("0")) {
      newvalue = newvalue.substring(1);
      return newvalue;
    }
    setWeight(newvalue);
  };
  const EditProductHandler = async () => {
    const newErrorArray = [];
    setErrorArray([]);
    setLoading(true);
    try {
      if (
        !productTitle.length ||
        !productId.length ||
        !productUnit.length ||
        !productPrice?.length ||
        !productInsocks.length ||
        !width.length ||
        !height.length ||
        !weight.length ||
        !productImgs.length
      ) {
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
        if (!width.length) {
          newErrorArray.push("width");
        }
        if (!height.length) {
          newErrorArray.push("height");
        }
        if (!weight.length) {
          newErrorArray.push("weight");
        }
        if (!productImgs.length) {
          newErrorArray.push("files");
        }

        setErrorArray((prevErrorArray) => [
          ...prevErrorArray,
          ...newErrorArray,
        ]); // Update using callback
        console.log(errorArray);
        setFinallyText("اطلاعات کامل نیست");
      } else {
        const formData = {
          productTitle,
          productId,
          productPrice,
          productCat,
          productInsocks,
          productUnit,
          productProperties,
          productDesc,
          productImgs,
          width , height , weight,
          editor: session.user,
        };
        const res = await fetch(`/api/product/edit-product/${data._id}`, {
          method: "PATCH",
          body: JSON.stringify(formData),
          headers: { "Content-Type": "application/json" },
        });
        const result = await res.json();
        if (!res.ok) {
          console.log(result);
          setFinallyText(result?.error);
        } else {
          router.push("/dashboard/admin/edit-product");
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
    <div className=" w-full flex flex-col gap-8 p-4">
      <InputTextSection
        id="productTitle"
        name="productTitle"
        errorArray={errorArray}
        value={productTitle}
        setValue={setProductTitle}
        type="text"
        label={"عنوان محصول"}
        finallyText={finallyText}
        setFinallyText={setFinallyText}
      />
      <InputTextSection
        id="productId"
        name="productId"
        errorArray={errorArray}
        value={productId}
        type="text"
        setValue={setProductId}
        label={"شناسه محصول"}
        finallyText={finallyText}
        setFinallyText={setFinallyText}
      />
      <InputTextSection
        id="productPrice"
        name="productPrice"
        errorArray={errorArray}
        value={productPrice}
        type="text"
        setValue={productPriceHandler}
        label={"قیمت محصول (تومان)"}
        finallyText={finallyText}
        setFinallyText={setFinallyText}
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
          finallyText={finallyText}
          setFinallyText={setFinallyText}
        />
        <InputTextSection
          id="productUnit"
          name="productUnit"
          errorArray={errorArray}
          value={productUnit}
          type="text"
          setValue={setProductUnit}
          label={"واحد محصول"}
          finallyText={finallyText}
          setFinallyText={setFinallyText}
        />
      </div>
            <InputTextSection
              id="height"
              name="height"
              errorArray={errorArray}
              value={height}
              type="text"
              setValue={heightHandler}
              label={"طول محصول (سانتی‌متر)"}
              finallyText={finallyText}
              setFinallyText={setFinallyText}
            />
            <InputTextSection
              id="width"
              name="width"
              errorArray={errorArray}
              value={width}
              type="text"
              setValue={widthHandler}
              label={"عرض محصول (سانتی‌متر)"}
              finallyText={finallyText}
              setFinallyText={setFinallyText}
            />
            <InputTextSection
              id="weight"
              name="weight"
              errorArray={errorArray}
              value={weight}
              type="text"
              setValue={weightHandler}
              label={"وزن محصول (گرم)"}
              finallyText={finallyText}
              setFinallyText={setFinallyText}
            />
      <CategoryBox
        productCat={productCat}
        setProductCat={setProductCat}
        errorArray={errorArray}
        finallyText={finallyText}
        setFinallyText={setFinallyText}
      />
      <PropertiesBox
        productProperties={productProperties}
        setProductProperties={setProductProperties}
        title={"ویژگی های محصول"}
        placeholder="اضافه کردن ویژگی جدید"
        finallyText={finallyText}
        setFinallyText={setFinallyText}
      />
      <DescriptionBox
        productDesc={productDesc}
        setProductDesc={setProductDesc}
        finallyText={finallyText}
        setFinallyText={setFinallyText}
      />
      <ProductImages
        errorArray={errorArray}
        files={files}
        setFiles={setFiles}
        productImgs={productImgs}
        setProductImgs={setProductImgs}
        title={`انتخاب عکس محصول`}
        setFinallyText={setFinallyText}
        saveIn={"products"}
      />
      <div className="w-full">
        <div
          className={`${
            finallyText.length ? "flex" : "hidden"
          } text-rose-600  pb-0.5 text-sm`}
        >
          {finallyText}
        </div>
        <button
          type="button"
          onClick={() => EditProductHandler()}
          className="relative cursor-pointer w-full py-2 flex gap-2 justify-center items-center
         text-gray-100 text-sm md:text-base font-bold overflow-hidden bg-gradient-to-r from-blue-600
          to-blue-950 rounded-[8px] transition-all duration-400 ease-in-out
           shadow-md hover:scale-100 hover:text-white hover:shadow-lg   z-[5] active:scale-90 
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
          ) : null}
          ویرایش محصول
        </button>
      </div>
    </div>
  );
};

export default ProductEditSinglePage;
