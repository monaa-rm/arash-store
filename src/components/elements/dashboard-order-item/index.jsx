import {
  getJalaliDate,
  orderStatusItemBg,
  orderStatusToPersian,
  slugify,
  statusbg,
} from "@/utiles/utils-func";
import Image from "next/image";
import Link from "next/link";

const DashboardOrderItem = ({ data, realod, setReload, rolePath }) => {
  return (
    <div className={`w-full border rounded-[8px] p-4 flex flex-col gap-5 `}>
      <div className={`w-full flex justify-center items-center gap-2 `}>
        <Link
          href={`/dashboard/admin/users-list/${data?.client}`}
          className={`w-full font-bold  line-clamp-1 ${
            rolePath == "admin" ? "block" : "hidden"
          }`}
        >
          {`${data?.name} ${data?.lastName}`}
        </Link>
        <h3
          className={`w-full font-bold  line-clamp-1 ${
            rolePath == "user" ? "block" : "hidden"
          }`}
        >
          {`${data?.name} ${data?.lastName}`}
        </h3>
        <div
          className={`w-fit min-w-fit ${
            statusbg[data?.status]
          } rounded-[4px] px-3 py-1 text-xs font-bold`}
        >
          {orderStatusToPersian(data?.status)}
        </div>
      </div>
      <div
        className={`w-full flex justify-start items-start gap-2 sm:flex-wrap overflow-x-scroll hide-scrollbar sm:overflow-x-auto`}
      >
        {data?.items?.map((item) => (
          <Link
            href={`/products/${item?.id}/${slugify(item?.title)}`}
            key={item?.id}
          >
            <div className="w-20 h-20 relative">
              <Image
                src={item?.imageSrc[0]?.file}
                alt={item?.title}
                fill
                className="rounded-[8px] object-cover bg-gray-500"
              />
            </div>
            <span className=" w-20 text-xs line-clamp-1 text-gray-500">
              {item?.title}
            </span>
          </Link>
        ))}
      </div>
      <div className="w-full flex justify-between items-center gap-4  ">
        <div className="px-3 py-1 rounded-[10px] text-sm bg-gray-100 text-gray-500">
          {getJalaliDate(data?.createdAt)}
        </div>
        <Link
          href={`/dashboard/${rolePath}/order-list/${data?._id}`}
          className="relative cursor-pointer py-1 sm:py-2  px-3 sm:px-4 text-center font-barlow inline-flex justify-center text-sm font-bold uppercase text-[#7e7e7e] rounded-[8px] border-solid transition-transform duration-300 ease-in-out group outline-offset-4 focus:outline focus:outline-2 focus:outline-white focus:outline-offset-4 overflow-hidden"
        >
          <span className="relative z-[2] ">جزئیات سفارش</span>

          <span className="absolute left-[-75%] top-0 h-full w-[50%] bg-[#7e7e7e44] rotate-12 z-[1] blur-lg group-hover:left-[125%] transition-all duration-1000 ease-in-out"></span>

          <span className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-[#7e7e7e] absolute h-[20%] rounded-tl-[8px] border-l-2 border-t-2 top-0 left-0"></span>
          <span className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-[#7e7e7e] absolute group-hover:h-[90%] h-[60%] rounded-tr-[8px] border-r-2 border-t-2 top-0 right-0"></span>
          <span className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-[#7e7e7e] absolute h-[60%] group-hover:h-[90%] rounded-bl-[8px] border-l-2 border-b-2 left-0 bottom-0"></span>
          <span className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-[#7e7e7e] absolute h-[20%] rounded-br-[8px] border-r-2 border-b-2 right-0 bottom-0"></span>
        </Link>
      </div>
    </div>
  );
};

export default DashboardOrderItem;
