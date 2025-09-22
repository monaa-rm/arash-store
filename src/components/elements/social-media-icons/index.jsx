import { IoLogoInstagram } from "react-icons/io";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { TiSocialYoutube } from "react-icons/ti";
import { BiLogoTelegram } from "react-icons/bi";
import Link from "next/link";

const SocialMediaicons = ({ data }) => {
  return (
    <div className="flex justify-center items-center gap-5 pt-4 md:pt-2 lg:pt-10">
      <section className="flex justify-center items-center p-1">
        <a
          href={`${data?.youtubeLink}`}
          className="group flex justify-center p-1 rounded-[4px] drop-shadow-xl from-gray-800 bg-[#c21e1e] text-white font-semibold hover:translate-y-3 hover:rounded-[50%] transition-all duration-500 hover:from-[#331029] hover:to-[#310413]"
        >
          <TiSocialYoutube className="w-7 h-7" />

          <span className="absolute opacity-0 group-hover:opacity-100 group-hover:text-gray-700 group-hover:text-sm group-hover:-translate-y-8 duration-700">
            Youtube
          </span>
        </a>
      </section>
      <section className="flex justify-center items-center">
        <a
          href={`${data?.telegramLink}`}
          className="group flex justify-center p-1 rounded-[4px] drop-shadow-xl from-gray-800 bg-[#1e73c2] text-white font-semibold hover:translate-y-3 hover:rounded-[50%] transition-all duration-500 hover:from-[#331029] hover:to-[#310413]"
        >
          <BiLogoTelegram className="w-7 h-7" />

          <span className="absolute opacity-0 group-hover:opacity-100 group-hover:text-gray-700 group-hover:text-sm group-hover:-translate-y-8 duration-700">
            Telegram
          </span>
        </a>
      </section>
      <section className="flex justify-center items-center">
        <a
          href={`${data?.instagramLink}`}
          className="group flex justify-center p-1 rounded-[4px] drop-shadow-xl from-gray-800 bg-[#ce501e] text-white font-semibold hover:translate-y-3 hover:rounded-[50%] transition-all duration-500 hover:from-[#331029] hover:to-[#310413]"
        >
          <IoLogoInstagram className="w-7 h-7" />

          <span className="absolute opacity-0 group-hover:opacity-100 group-hover:text-gray-700 group-hover:text-sm group-hover:-translate-y-8 duration-700">
            Instagram
          </span>
        </a>
      </section>
      <section className="flex justify-center items-center">
        <a
          href={`${data?.whatsappLink}`}
          className="group flex justify-center p-1 rounded-[4px] drop-shadow-xl from-gray-800 bg-[#1ca81c] text-white font-semibold hover:translate-y-3 hover:rounded-[50%] transition-all duration-500 hover:from-[#331029] hover:to-[#310413]"
        >
          <AiOutlineWhatsApp className="w-7 h-7" />

          <span className="absolute opacity-0 group-hover:opacity-100 group-hover:text-gray-700 group-hover:text-sm group-hover:-translate-y-8 duration-700">
            Whatsapp
          </span>
        </a>
      </section>
    </div>
  );
};

export default SocialMediaicons;
