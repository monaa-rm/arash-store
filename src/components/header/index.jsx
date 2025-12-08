import Image from "next/image";
import arashStore from "../../assets/images/arashstore.png";
import HeaderContent from "./header-content";
import Link from "next/link";
import SearchBox from "./search-box";
import Basket from "./basket";
import SignIn from "./sign-in";
import HeaderMenuMobile from "./header-menu-mobile";
import Category from "../../../models/Category";
import connectDB from "@/utiles/connectDB";
import HeaderCategories from "./header-categories";

const Header = async ({ show_price }) => {
  let categories = [];
  try {
    await connectDB();
    categories = await Category.find();
  } catch (error) {
    throw Error("خطا در دریافت اطلاعات");
  }

  return (
    <header className="pb-2 w-full shadow-md p-2 pt-3 text-sm md:text-base sticky z-[5] top-0 bg-white">


      <div className=" w-full hidden lg:flex items-center justify-between gap-4 ">
        <div className="flex justify-start items-center lg:gap-2 xl:gap-8">
          <Link href={"/"}>
            <div className="w-16 h-16 relative">
              <Image
                src={arashStore}
                alt="لوگو فروشگاه آرش"
                fill
                sizes="128px"
                className="object-contain"
              />
            </div>
          </Link>
          <HeaderContent />
          <HeaderCategories
            categories={JSON.parse(JSON.stringify(categories)) || []}
          />
        </div>
        <div className="hidden lg:flex">
          <SearchBox />
        </div>
        <div className="flex justify-center items-center gap-4">
          <Link href={"/contact-us"}>
            <svg className="w-7 h-7 text-zinc-600 hover:text-zinc-700 transition-all duration-300 ease-in-out">
              <use href="/sprite.svg#question_mark" />
            </svg>
          </Link>
          <SignIn />
          <Basket />
        </div>
      </div>
      {/* هدر برای سایز کمتر از lg */}
      <div className=" w-full flex flex-col lg:hidden gap-4 ">
        <div className="flex justify-between items-center">
          <HeaderMenuMobile
            categories={JSON.parse(JSON.stringify(categories)) || []}
          />

          <Link href={"/"}>
            <div className="w-10 h-10 relative">
              <Image
                src={arashStore}
                alt="فروشگاه آرش - صفحه اصلی"
                fill
                sizes="128px"
                className="object-contain"
              />
            </div>
          </Link>
          <Link href={"/contact-us"}>
            <svg className="w-7 h-7 text-zinc-600 hover:text-zinc-700 transition-all duration-300 ease-in-out">
              <use href="/sprite.svg#question_mark" />
            </svg>
          </Link>
        </div>
        <div className=" flex justify-between items-center gap-2 w-full">
          <SearchBox />
          <div className="flex justify-center items-center gap-2 w-20 min-w-20">
            <SignIn />
            <Basket />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
