
import WelcomeSlider from "@/components/modules/welcomeSlider";
import { setShowLoginBox } from "@/features/globalSlice";
import Link from "next/link";

const welcomeImages = ["/images/welcomebg.jpg", "/images/bg---.jpg"];
const WelcomeSection = () => {
  return (
    <section className={`w-full h-[150px] sm:h-[400px] relative`}>
      <WelcomeSlider welcomeImages={welcomeImages} />
      <div className=" w-full absolute top-0 h-full flex justify-center items-center  bg-[rgba(12,0,180,0.32)] bg-opacity-80 ">
        <div className="w-full sm:w-[600px] flex flex-col items-center gap-6 ">
          <p className="text-white font-bold text-2xl sm:text-4xl text-center">
            به فروشگاه آرش خوش آمدید
          </p>
          <p className="font-bold hidden sm:block text-white leading-8 mt-4 text-center">
            آیا به دنبال قطعه یدکی برای یخچال، کولر یا اسپلیت خود هستید؟ فروشگاه
            آرش ارائه‌دهنده انواع قطعات اصلی و با کیفیت به همراه قیمت‌های رقابتی
            و ارسال سریع است. از تنوع محصولات ما دیدن کنید و بهترین گزینه‌ها را
            برای نیازتان انتخاب نمایید!
          </p>
          <Link
            href={"/products"}
            className=" sm:flex hidden w-40 h-10 justify-center items-center
            bg-blue-700 hover:bg-blue-800  text-white font-bold rounded-md transition-all duration-1000"
          >
            مشاهده محصولات
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
