
const SliderSkeleton = ({ sliderTitle }) => {
  return (
    <div
      className={`p-4 w-full  flex overflow-hidden bg-gray-50 flex-col gap-4`}
    >
      <h2 className="font-bold text-2xl">{sliderTitle} </h2>
      <div
        className="w-full  relative grid grid-cols-1
        justify-start sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-2   animate-pulse  "
      >
        {/* <div
          className="absolute  h-16 rounded-full top-1/2 -translate-y-1/2 left-0 right-0
               flex justify-between items-center px-2 "
        >
          <button className="button outline-0  z-[1]">
            <IoIosArrowDroprightCircle className="w-10 h-10 text-gray-300 opacity-50 hover:opacity-100 transition-all duration-300" />
          </button>
          <button className="button outline-0 z-[1]">
            <IoIosArrowDropleftCircle className="w-10 h-10 text-gray-300 opacity-50 hover:opacity-100 transition-all duration-300" />
          </button>
        </div> */}
        <div className={`w-full h-full flex justify-center items-center`}>
          <div
            className="div h-72 cursor-pointer w-56 bg-gray-200 flex m-auto
         rounded-[1em] overflow-hidden relative group p-2 z-0"
          ></div>
          <div className=" absolute top-1/2 -translate-y-1/2 left-0 right-0"></div>
        </div>
        <div
          className={`w-full h-full hidden lg:flex  justify-center items-center`}
        >
          <div
            className="div h-72 cursor-pointer w-56 bg-gray-200 flex m-auto
         rounded-[1em] overflow-hidden relative group p-2 z-0"
          ></div>
          <div className=" absolute top-1/2 -translate-y-1/2 left-0 right-0"></div>
        </div>
        <div
          className={`w-full h-full hidden md:flex  justify-center items-center`}
        >
          <div
            className="div h-72 cursor-pointer w-56 bg-gray-200 flex m-auto
         rounded-[1em] overflow-hidden relative group p-2 z-0"
          ></div>
          <div className=" absolute top-1/2 -translate-y-1/2 left-0 right-0"></div>
        </div>
        <div
          className={`w-full h-full hidden sm:flex justify-center items-center`}
        >
          <div
            className="div h-72 cursor-pointer w-56 bg-gray-200 flex m-auto
         rounded-[1em] overflow-hidden relative group p-2 z-0"
          ></div>
          <div className=" absolute top-1/2 -translate-y-1/2 left-0 right-0"></div>
        </div>
      </div>
    </div>
  );
};

export default SliderSkeleton;
