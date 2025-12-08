import TermsPage from "@/components/informaition/terms-page";
import React from "react";
export const metadata = {
  title: "قوانین‌و‌مقررات",
  description:
    "سفارش‌ها در بازه‌ی 24 تا 72 ساعت کاری آماده و توسط پست یا شرکت‌های حمل‌ونقل طرف قرارداد ارسال می‌شود.در صورتی که محصول دارای ایراد فنی یا مغایرت با سفارش باشد،پس از دریافت کالا و بررسی آن، در صورت تایید شرایط بازگشت، وجه پرداختی شما طی 7 روز کاری به حساب شما مسترد خواهد شد.قبل از ارسال کالا امکان لغو سفارش از طریق تماس با پشتیبانی وجود دارد و مبلغ ظرف 7 روز آینده به حساب مشتری بازگردانده خواهد شد.مشتری موظف است اطلاعات صحیح (آدرس، شماره تماس و ...) را هنگام ثبت سفارش وارد کند.مسئولیت تأخیر یا عدم تحویل به دلیل اطلاعات ناقص بر عهده‌ی مشتری خواد بود.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SERVER_URL}/terms`,
  },
  robots: {
    index: true,
    follow: true,
  },
};
const SiteTerms = () => {
  return <TermsPage />;
};

export default SiteTerms;
