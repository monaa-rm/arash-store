"use client";

import SocialMediaicons from "@/components/elements/social-media-icons";

const FooterPhoneEmail = ({ data }) => {
  return (
    <div className="w-full sm:w-1/2 md:w-1/4 md:hidden lg:flex  p-4 flex flex-col gap-4">
      <h1 className="border-b border-zinc-700 font-bold pb-2">فروشگاه آرش</h1>
      <ul>
        {data?.phone?.length &&
          data?.phone?.map((phone, i) => (
            <li key={i} className="border-b flex justify-between items-center">
              <span>تلفن</span>
              <span >{phone}</span>
            </li>
          ))}

        {data?.email?.length && (
          <li className="border-b flex justify-between items-center">
            <span>ایمیل</span>
            <span>{data?.email}</span>
          </li>
        )}
        <SocialMediaicons data={data} />
      </ul>
    </div>
  );
};

export default FooterPhoneEmail;
