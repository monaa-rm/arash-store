"use client";
const DescriptionSection = ({ description }) => {
  return (
    <div className="w-full">
      {description?.length ? (
        <div className="w-full flex flex-col gap-6 text-zinc-600">
          {description?.map((item, i) => (
            <div className="" key={i}>
              {item?.title?.length ? (
                <h1 className=" font-bold">{item?.title}</h1>
              ) : null}
              {item?.desc?.length ? <p className="pt-2 text-sm">{item?.desc}</p> : null}
            </div>
          ))}
        </div>
      ) : (
        <div className="font-bold p-4">توضیحی برای این محصول ثبت نشده است.</div>
      )}
    </div>
  );
};

export default DescriptionSection;
