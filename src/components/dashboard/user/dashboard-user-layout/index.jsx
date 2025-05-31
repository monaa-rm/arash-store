"use client";
import DashboardMobileManager from "@/components/elements/dashboard-mobile-manager";
import { useEffect, useRef, useState } from "react";
import { AiOutlineAppstore, AiOutlineBarChart } from "react-icons/ai";
import { MdAdminPanelSettings, MdFavorite, MdManageAccounts, MdMessage } from "react-icons/md";
import { MdShoppingBag } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { setDashboardActiveItem, setUserDashboardActiveItem } from "@/features/globalSlice";
import Link from "next/link";
import { RiBloggerFill, RiSettings5Fill } from "react-icons/ri";
import { LuMessageSquareMore } from "react-icons/lu";

const menuData = [
    { title: "حساب کاربری", link: false, iconname: "user-account" },
    { title: " ویرایش اطلاعات شخصی", link: "user-edit" },
    { title: "سفارش ها و پرداخت ها", link: false, iconname: "orders" },
    { title: "لیست سفارش ها", link: "order-list" },
    { title: "سبد خرید", link: "order-basket" },
    // { title: "جزئیات سفارش ها", link: "pay-details" },

    { title: " پیام ها و اعلان ها", link: false, iconname: "notifications" },
    { title: "پیام ها", link: "messages" },
    { title: "علاقه مندی ها", link: false, iconname: "favorite" },
    { title: "محصولات مارک شده", link: "favorites" },

//   { title: "لیست کاربرها", link: "users-list" },
//   { title: "وبلاگ ها", link: "blogs" },
//   { title: "افزودن وبلاگ", link: "add-blog" },
//   { title: "گزارش گیری", link: false, iconname: "pay-reports" },
//   { title: "فروش روزانه", link: "daily-sell" },
//   { title: "تنظیمات", link: false, iconname: "setting" },
//   { title: "تنظیمات سایت", link: "settings" },
  // { title: "خروج", link: false, iconname: "logout" },
];
const DashboardUserLayout = ({ children }) => {
  const [showList, setShowList] = useState(false);
  const topRef = useRef(null);
  const dashboardActiveItem = useSelector(
    (store) => store?.globalSlice?.dashboardUserActiveItem
  );
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [dashboardActiveItem]);
  const dispatch = useDispatch();
  useEffect(() => {
    const handleClick = (event) => {
      if (!event.target.closest("#userdashboardlist")) {
        setShowList(false);
      }
    };

    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="w-full z-[0] relative  min-h-screen pb-4 pt-8 lg:pt-4 lg:flex justify-between">
      <DashboardMobileManager showList={showList} setShowList={setShowList} />
      <div
        id="userdashboardlist"
        className={`fixed z-10 lg:z-auto lg:sticky top-[153px] lg:top-[100px]  min-h-80 max-h-fit transition-all duration-300 ease-in-out ${
          showList ? "left-4" : "left-[-250px]"
        }  lg:left-auto lg:right-5  lg:w-[250px] lg:min-w-[250px] rounded lg:rounded-xl bg-gradient-to-bl from-blue-950 to-blue-700 `}
      >
        <div className="flex flex-col gap-0.5 py-3 px-4">
          {menuData?.map((item, i) => (
            <div
              onClick={() => {
                item?.link ? dispatch(setUserDashboardActiveItem(item)) : null;
                setShowList(false);
              }}
              key={i}
              className={`text-white flex justify-start items-center gap-1.5 ${
                item?.link
                  ? " text-sm text-opacity-75 cursor-pointer hover:text-opacity-95 transition-all duration-300 ease-in-out "
                  : "font-bold "
              } ${!item?.link && i != 0 && "lg:pt-1"} `}
            >
              <span className="w-5 flex justify-center">
                {item?.iconname == "manage" ? (
                  <AiOutlineAppstore className="w-5 h-5" />
                ) : item?.iconname == "notifications" ? (
                  <MdMessage className="w-4 h-4" />
                )  : item?.iconname == "user-account" ? (
                  <MdManageAccounts className="w-5 h-5" />
                ) : item?.iconname == "orders" ? (
                  <MdShoppingBag className="w-5 h-5" />
                )  : item?.iconname == "favorite" ? (
                    <MdFavorite className="w-5 h-5" />
                  ) 
                
                // : item?.iconname == "logout" ? (
                //   <TbLogout className="w-5 h-5" />
                // ) 
                
                : null}
              </span>
              {item?.iconname ? (
                <span> {item?.title}</span>
              ) : (
                <Link
                  href={`/dashboard/user/${item?.link}`}
                  className={`
                   ${
                     dashboardActiveItem.link == item?.link
                       ? " border-b text-white "
                       : " border-b border-transparent"
                   }
                     transition-all duration-300 ease-in-out`}
                >
                  {item?.title}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full lg:pr-8">
        <div className="py-2 text-white">
          {dashboardActiveItem?.link == "mainmanager" ? (
            <div
              className="relative w-28  py-1 flex justify-center items-center text-gray-100 text-sm  font-bold  overflow-hidden bg-gradient-to-r from-blue-600 to-blue-950 rounded-l-full  rounded-r-xl
            transition-all duration-400 ease-in-out shadow-md hover:scale-100 hover:text-white hover:shadow-lg  
            active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full
             before:bg-gradient-to-r before:from-blue-700 before:to-blue-950 before:transition-all 
             before:duration-500 before:ease-in-out before:z-[-1] before:rounded-tl-full before:rounded-bl-full  hover:before:left-0"
            >
              <Link
                href={`/dashboard/user`}
                className="w-full h-full flex justify-center items-center"
              >
             {dashboardActiveItem?.title} 
              </Link>
            </div>
          ) : (
            <div className="relative flex">
              <div
                className="relative w-28 py-1 flex justify-center items-center text-gray-100 text-sm font-bold  overflow-hidden bg-gradient-to-r from-blue-600 to-blue-950 rounded-l-full  rounded-r-xl
   transition-all duration-400 ease-in-out shadow-md hover:scale-100 hover:text-white hover:shadow-lg   z-[5]
   active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full
    before:bg-gradient-to-r before:from-blue-700 before:to-blue-950 before:transition-all 
    before:duration-500 before:ease-in-out before:z-[-1] before:rounded-tl-full before:rounded-bl-full  hover:before:left-0"
              >
                <Link
                  href={`/dashboard/user`}
                  className="w-full h-full  flex justify-center items-center"
                >
                  داشبورد
                </Link>
              </div>
              <div
                className="absolute right-24 pl-3 pr-6 py-1 flex justify-center items-center text-gray-100 text-sm font-bold  overflow-hidden bg-gradient-to-r from-blue-600 to-blue-950 rounded-l-full  rounded-r-xl
   transition-all duration-400 ease-in-out shadow-md hover:scale-100 hover:text-white hover:shadow-lg   z-[4]
   active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full
    before:bg-gradient-to-r before:from-blue-700 before:to-blue-950 before:transition-all 
    before:duration-500 before:ease-in-out before:z-[-1] before:rounded-tl-full before:rounded-bl-full  hover:before:left-0"
              >
                <Link
                  href={`/dashboard/user/${dashboardActiveItem?.link}`}
                  className="w-full h-full flex justify-center items-center"
                >
                  {dashboardActiveItem?.title}
                </Link>
              </div>
            </div>
          )}
        </div>

        {children}
      </div>
    </div>
  );
};

export default DashboardUserLayout;
