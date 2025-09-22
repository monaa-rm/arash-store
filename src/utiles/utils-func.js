import { format, parseISO } from "date-fns";
import moment, { jalali } from "jalali-moment";

export const statusbg = {
  pending: "bg-yellow-100 text-yellow-800 bg-opacity-80",
  delivered: "bg-green-100 text-green-800 bg-opacity-80 ",
  shipped: "bg-cyan-100 text-cyan-800 bg-opacity-80",
  cancelled: "bg-gray-200 text-gray-800 bg-opacity-80",
  returned: "bg-orange-100 text-orange-800 bg-opacity-80",
  failed: "bg-red-100 text-red-800 bg-opacity-80",
};
export function getJalaliDate(createdAt) {
  try {
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

export const orderStatusToPersian = (status) => {
  switch (status) {
    case "pending":
      return "در حال بررسی"; // 1 for ascending
    case "shipped":
      return "ارسال شده"; // -1 for descending
    case "delivered":
      return "تحویل داده شده"; // Assuming you have a createdAt field
    case "cancelled":
      return "لغو شده"; // Assuming you have a createdAt field
    case "returned":
      return "مرجوع شده"; // Assuming you have a createdAt field
    case "failed":
      return "ناموفق"; // Assuming you have a createdAt field
    default:
      return "در حال بررسی"; // Default to latest
  }
};
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
export const addZeroFunc = (phoneNumber) => {
  // اگر رشته phoneNumber وجود نداشته باشه یا خالی باشه، null برمی‌گردونه
  if (!phoneNumber) {
    return null;
  }
  // بررسی می‌کنه که آیا شماره با '0' شروع میشه یا نه
  if (phoneNumber.startsWith("0")) {
    return phoneNumber; // اگه شروع می‌شد، همون رو برمی‌گردونه
  } else {
    return "0" + phoneNumber; // اگه شروع نمی‌شد، یه '0' اولش اضافه می‌کنه
  }
};
export const slugify = (string) => {
  return string
    .trim()
    .replace(/[^آ-یA-Za-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "-")
    .toLowerCase();
};
export const slugifyBlog = (string, id) => {
  const newID = id;
  const slug = string
    .trim()
    .replace(/[^آ-یA-Za-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "-")
    .split("-")
    .slice(0, 6)
    .join("-")
    .toLowerCase();
  return `${slug}-${newID}`;
};
export function getFromLocalStorage(value) {
  try {
    const ordersString = localStorage.getItem(value);
    return ordersString ? JSON.parse(ordersString) : []; // اگه هیچی نبود، یه آرایه خالی برگردون
  } catch (error) {
    console.error("Error getting orders from localStorage:", error);
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

export function convertGregorianToPersian(gregorianDateString) {
  // تاریخ میلادی رو به یک شیء Date تبدیل می‌کنیم
  const date = new Date(gregorianDateString);

  // چک می‌کنیم که آیا تاریخ معتبره یا نه
  if (isNaN(date.getTime())) {
    console.error(
      "خطا: فرمت تاریخ میلادی نامعتبر است. لطفا از فرمت 'YYYY-MM-DD' استفاده کنید."
    );
    return { persianDate: "تاریخ نامعتبر", persianWeekday: "نامشخص" };
  }

  // برای فرمت‌بندی تاریخ شمسی
  const persianDateFormatter = new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "2-digit", // ماه به صورت دو رقمی (مثلاً 06)
    day: "2-digit",
    calendar: "persian",
  });

  // برای فرمت‌بندی روز هفته به فارسی
  const persianWeekdayFormatter = new Intl.DateTimeFormat("fa-IR", {
    weekday: "long",
    calendar: "persian",
  });

  const persianDate = persianDateFormatter.format(date);
  const persianWeekday = persianWeekdayFormatter.format(date);

  return {
    persianDate: persianDate,
    persianWeekday: persianWeekday,
  };
}

export const convertPersianFileNameToEnglish = (fileName) => {
  const persianToEnglishMap = {
    الف: "A",
    ب: "B",
    پ: "P",
    ت: "T",
    ث: "S",
    ج: "J",
    چ: "Ch",
    ح: "H",
    خ: "Kh",
    د: "D",
    ذ: "Z",
    ر: "R",
    ز: "Z",
    ژ: "Zh",
    س: "S",
    ش: "Sh",
    ص: "S",
    ض: "Z",
    ط: "T",
    ظ: "Z",
    ع: "A",
    غ: "Gh",
    ف: "F",
    ق: "Gh",
    ک: "K",
    گ: "G",
    ل: "L",
    م: "M",
    ن: "N",
    و: "V",
    ه: "H",
    ی: "Y",

    ا: "A",
    آ: "A",
    اً: "An",
    ب: "B",
    پ: "P",
    ت: "T",
    ث: "S",
    ج: "J",
    چ: "CH",
    ح: "H",
    خ: "KH",
    د: "D",
    ذ: "Z",
    ر: "R",
    ز: "Z",
    ژ: "ZH",
    س: "S",
    ش: "SH",
    ص: "S",
    ض: "Z",
    ط: "T",
    ظ: "Z",
    ع: "A",
    غ: "GH",
    ف: "F",
    ق: "GH",
    ک: "K",
    گ: "G",
    ل: "L",
    م: "M",
    ن: "N",
    و: "V",
    ه: "H",
    ی: "Y",
    " ": "-",
    ".": ".",
    _: "_",
    "-": "-",
    "(": "-",
    ")": "-",
    "/": "-",
    "\\": "-",
    ":": "-",
    "*": "-",
    "?": "-",
    "<": "-",
    ">": "-",
    "|": "-",
    "+": "-",
    "&": "-",
  };

  let englishFileName = "";
  for (let i = 0; i < fileName.length; i++) {
    const char = fileName[i];
    const englishChar = persianToEnglishMap[char];
    if (englishChar) {
      englishFileName += englishChar;
    } else {
      englishFileName += char; // Keep non-Persian characters as they are
    }
  }
  return englishFileName.replace(/[^a-zA-Z0-9-_.]/g, ""); // Remove any remaining invalid characters
};

// Example usage:
// const persianFileName = "عکس_من_زیبا.jpg";
// const englishFileName = convertPersianFileNameToEnglish(persianFileName);
// console.log(englishFileName); // Output: Aks_Man_Ziba.jpg
