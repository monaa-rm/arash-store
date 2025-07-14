import { format, parseISO } from "date-fns";
import moment, { jalali } from "jalali-moment";

export function getJalaliDate(createdAt) {
  try {
    console.log(createdAt);
    const dateObject = new Date(createdAt);

    // بررسی کنید که آیا تبدیل با موفقیت انجام شده است.
    if (isNaN(dateObject.getTime())) {
      console.error("تاریخ معتبر نیست.");
      return null; // یا مقدار پیش فرض مورد نظر خودتون
    }
    const formattedDate = dateObject.toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      timeZone: "UTC", // مهم است برای تطابق با زمان ISO 8601
    });
    return formattedDate;
  } catch (error) {
    console.error("خطا در تبدیل تاریخ:", error);
    return null; // یا مقدار پیش فرض مورد نظر خودتون
  }
}
export const getSortQuery = (sortOrder) => {
  switch (sortOrder) {
    case "expensive":
      return { price: -1 }; // 1 for ascending
    case "cheap":
      return { price: 1 }; // -1 for descending
    case "new":
      return { _id: -1 }; // Assuming you have a createdAt field
    case "visit":
      return { view: -1 }; // Assuming you have a createdAt field
    default:
      return { _id: -1 }; // Default to latest
  }
};
export function getFromLocalStorage(value) {
  try {
    const ordersString = localStorage.getItem(value);
    return ordersString ? JSON.parse(ordersString) : []; // اگه هیچی نبود، یه آرایه خالی برگردون
  } catch (error) {
    console.error('Error getting orders from localStorage:', error);
    return [];
  }
}
export function formatNumberToPersian(number) {
  return new Intl.NumberFormat("fa-IR").format(number);
}

export const normalizeFileName = (fileName) => {
  // تبدیل حروف فارسی و عربی به معادل انگلیسی
  const persianToEnglish = {
    ا: "a",
    أ: "a",
    آ: "a",
    ب: "b",
    پ: "p",
    ت: "t",
    ث: "s",
    ج: "j",
    چ: "ch",
    ح: "h",
    خ: "kh",
    د: "d",
    ذ: "z",
    ر: "r",
    ز: "z",
    ژ: "zh",
    س: "s",
    ش: "sh",
    ص: "s",
    ض: "z",
    ط: "t",
    ظ: "z",
    ع: "a",
    غ: "gh",
    ف: "f",
    ق: "gh",
    ک: "k",
    گ: "g",
    ل: "l",
    م: "m",
    ن: "n",
    و: "v",
    ه: "h",
    ی: "y",
    " ": "_",
  };

  return fileName
    .split("")
    .map((char) => persianToEnglish[char] || char)
    .join("")
    .replace(/\s+/g, "_") // جایگزینی فاصله‌ها با _
    .replace(/[^\w.-]/g, "") // حذف کاراکترهای غیرمجاز
    .toLowerCase(); // تبدیل به حروف کوچک
};
