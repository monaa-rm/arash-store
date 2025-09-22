"use client";
const FooterAddress = ({ data }) => {
  return (
    <div className="w-full sm:w-1/2 md:w-1/4  p-4 flex flex-col gap-4">
      <h1 className="border-b border-zinc-700 font-bold pb-2">آدرس فروشگاه</h1>
      <ul>
        {data?.address?.length &&
          data?.address?.map((address, i) => (
            <li key={i} className="list-inside list-disc">
              {address}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default FooterAddress;
