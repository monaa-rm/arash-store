
const SendFree = () => {
  return (
    <div className="w-full flex justify-center py-1 sm:justify-end sm:absolute sm:left-4">

    <div className="relative group cursor-default w-fit ">
      <div
        className="relative px-8 py-2 border-2 border-blue-500 text-blue-500 font-bold text-xs  rounded-[10px]
     transform transition-all duration-300 
     shadow-[6px_6px_10px_rgba(0,0,0,0.1),-6px_-6px_10px_rgba(255,255,255,0.1)] 
     "
      >
        ارسال رایگان توسط فروشگاه آرش
      </div>

      <div className="absolute -top-2 -right-0 w-3 h-3 bg-blue-500 rounded-full animate-ping shadow-lg"></div>
      <div className="absolute -bottom-2 -left-0 w-3 h-3 bg-blue-500 rounded-full animate-ping shadow-lg"></div>
      <div className="absolute top-1/3 left-0 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-70"></div>
      <div className="absolute top-2/3 right-0 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-70"></div>
    </div>
  </div>
  )
}

export default SendFree
