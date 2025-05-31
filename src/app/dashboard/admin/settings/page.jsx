import SettingsPage from "@/components/dashboard/admin/settings-page";

const data = {
    title: "به فروشگاه آرش خوش آمدید",
    desc: "آیا به دنبال قطعه یدکی برای یخچال، کولر یا اسپلیت خود هستید؟ فروشگاه آرش ارائه‌دهنده انواع قطعات اصلی و با کیفیت به همراه قیمت‌های رقابتی و ارسال سریع است. از تنوع محصولات ما دیدن کنید و بهترین گزینه‌ها را برای نیازتان انتخاب نمایید!",
    images: [
      "/sample/1.jpg",
      "/sample/2.jpg",
      "/sample/3.jpg",
    ],
  };
const Settings = () => {
  return (
    <SettingsPage data={data} />
  )
}

export default Settings
