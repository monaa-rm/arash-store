const MainCategoryItem = ({ title, icon }) => {
  return (
    <div className="pt-2 hover:pt-0 transition-all duration-300 ease-in-out relative h-24">
      <div
        className=" z-[1] relative w-full border border-zinc-300  shadow-2xl rounded-lg h-[88px] bg-white
   hover:bg-blue-700 hover:border-blue-700 cursor-pointer text-blue-700 hover:text-white font-bold flex items-center justify-center transition-all duration-300 ease-in-out"
      >
        <span className="text-zinc-600  text-4xl absolute top-1/2 -translate-y-1/2 right-4 z-[3]">
          {icon}
        </span>
        <div className="w-[46px] absolute top-1/2 -translate-y-1/2 right-5 z-[2] ">
          <div className="border-b-[10px] border-l-[4px] border-l-transparent border-r-[19px] border-b-gray-50 border-transparent"></div>{" "}
          <div className="bg-gray-50 h-[14px]"></div>{" "}
          <div className="rotate-180 border-b-[10px] border-l-[4px] border-l-transparent border-r-[19px] border-b-gray-50 border-transparent"></div>{" "}
        </div>
        <span>{title}</span>
      </div>
      <div className="w-11/12 absolute rounded-br-2xl rounded-bl-2xl bg-[rgba(29,79,216,0.16)] h-10 bottom-0 left-1/2 -translate-x-1/2 "></div>
    </div>
  );
};

export default MainCategoryItem;
