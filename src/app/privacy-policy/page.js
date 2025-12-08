import PrivacyPolicyPage from "@/components/informaition/privacy-policy-page";
export const metadata = {
  title: "حریم خصوصی",
  description:
    "ما به حریم خصوصی کاربران خود احترام میگذاریم. اطلاعاتی که هنگام ثبت سفارش دریافت میکنیم شامل نام، شماره تماس، ایمیل و آدرس پستی است.این اطلاعات فقط برای پردازش سفارش، ارسال کالا و اطلاع‌رسانی وضعیت خرید استفاده می‌شود و در اختیار شخص ویا مجموعه‌ی دیگری قرار نخواهد گرفت.اطلاعات پرداخت شما از طریق درگاه‌های بانکی معتبر انجام می‌شود و فروشگاه هیچگونه دسترسی به جزئیات کارت بانکی شما ندارد.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SERVER_URL}/privacy-policy`,
  },
  robots: {
    index: true,
    follow: true,
  },
};
const PrivacyPolicy = () => {
  return <PrivacyPolicyPage />;
};

export default PrivacyPolicy;
