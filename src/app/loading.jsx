const Loading = () => {
    return (
      <div className="w-full h-96">
        <div className={`h-full w-full flex justify-center items-center gap-2`}>
          <span className="font-bold text-blue-900">در حال بارگزاری </span>
          <div className="flex flex-row gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-900 animate-bounce"></div>
            <div className="w-3 h-3 rounded-full bg-blue-900 animate-bounce [animation-delay:-.3s]"></div>
            <div className="w-3 h-3 rounded-full bg-blue-900 animate-bounce [animation-delay:-.5s]"></div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Loading;
  