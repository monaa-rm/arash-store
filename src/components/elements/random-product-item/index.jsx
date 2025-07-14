import Image from "next/image";

const RandomProductItem = ({ title, imageSrc }) => {
  return (
    <div dir="rtl" className="px-4 w-full h-56 ">
      <div className="w-full  h-full flex justify-center items-center ">
        <div className="flex max-w-56 flex-col gap-4 w-full">
          <div className="relative w-full h-40 rounded-2xl overflow-hidden ">
            <Image alt="image" src={imageSrc[0]?.file} fill className="object-cover" />
          </div>
          <span className="line-clamp-1 font-bold text-sm w-full">{title}</span>
        </div>
      </div>
    </div>
  );
};

export default RandomProductItem;
