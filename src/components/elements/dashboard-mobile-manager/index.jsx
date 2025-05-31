"use client"
const DashboardMobileManager = ({showList , setShowList}) => {
  return (
    <div className="flex z-[6] justify-between fixed top-[116px] left-0 right-0 gap-3 lg:hidden px-4  py-1 bg-gradient-to-bl from-blue-950 to-blue-700 ">
    <span className="text-white font-bold">مونا رمضانی</span>
    <button
      onClick={() => setShowList(!showList)}
      className="group flex items-center justify-center relative z-[1] [transition:all_0.5s_ease] rounded-[0.375rem] p-[2px] cursor-pointer border border-white outline-none focus-visible:outline-0"
    >
      <svg
        fill="white"
        stroke="none"
        strokeWidth="0"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-5 h-5 overflow-visible [transition:transform_.35s_ease] ${
          showList && "[transition-delay:.25s] rotate-45 "
        } [&amp;_path]:[transition:transform_.35s_ease] `}
      >
        <path
          className={`${
            showList &&
            "[transform:rotate(112.5deg)_translate(-27.2%,-80.2%)]"
          }`}
          d="m3.45,8.83c-.39,0-.76-.23-.92-.62-.21-.51.03-1.1.54-1.31L14.71,2.08c.51-.21,1.1.03,1.31.54.21.51-.03,1.1-.54,1.31L3.84,8.75c-.13.05-.25.08-.38.08Z"
        ></path>
        <path
          className={`${
            showList && "[transform:rotate(22.5deg)_translate(15.5%,-23%)]"
          }`}
          d="m2.02,17.13c-.39,0-.76-.23-.92-.62-.21-.51.03-1.1.54-1.31L21.6,6.94c.51-.21,1.1.03,1.31.54.21.51-.03,1.1-.54,1.31L2.4,17.06c-.13.05-.25.08-.38.08Z"
        ></path>
        <path
          className={`${
            showList &&
            "[transform:rotate(112.5deg)_translate(-15%,-149.5%)]"
          }`}
          d="m8.91,21.99c-.39,0-.76-.23-.92-.62-.21-.51.03-1.1.54-1.31l11.64-4.82c.51-.21,1.1.03,1.31.54.21.51-.03,1.1-.54,1.31l-11.64,4.82c-.13.05-.25.08-.38.08Z"
        ></path>
      </svg>
    </button>
  </div>
  )
}

export default DashboardMobileManager
