import Image from "next/image";
import React from "react";
import delivery from "../../../assets/images/delivery.webp";
import exchange from "../../../assets/images/exchange.webp";
import authenticity from "../../../assets/images/authenticity.webp";
import hoursSupport from "../../../assets/images/24-hours-support.webp";
const FooterTopSection = () => {
  return (
    <section className="w-full  grid grid-cols-2 md:grid-cols-4 justify-between items-center gap-6 py-4 px-8 lg:px-28">
      <div className="flex flex-col  gap-4 items-center justify-center">
        <Image
          alt="ﺗﺤﻮﯾﻞ اﮐﺴﭙﺮس"
          src={delivery}
          width={50}
          height={50}
          sizes="50px"
        />
        <span className="font-bold text-zinc-400 text-sm">
          اﻣﮑﺎن ﺗﺤﻮﯾﻞ اﮐﺴﭙﺮس
        </span>
      </div>

      <div className="flex flex-col  gap-4 items-center justify-center">
        <Image
          alt="express"
          src={authenticity}
          width={50}
          height={50}
          sizes="50px"
        />
        <span className="font-bold text-zinc-400 text-sm">
          ﺿﻤﺎﻧﺖ اﺻﻞ ﺑﻮدن ﮐﺎﻟﺎ
        </span>
      </div>
            <div className="flex flex-col  gap-4 items-center justify-center">
        <Image
          alt="7 روز ضمانت بازگشت کالا"
          src={exchange}
          width={50}
          height={50}
          sizes="50px"
        />
        <span className="font-bold text-zinc-400 text-sm">7 روز ضمانت بازگشت کالا</span>
      </div>
      <div className="flex flex-col  gap-4 items-center justify-center">
        <Image
          alt="۷ روز ﻫﻔﺘﻪ، ۲۴ ﺳﺎﻋﺘﻪ"
          src={hoursSupport}
          width={50}
          height={50}
          sizes="50px"
        />
        <span className="font-bold text-zinc-400 text-sm">
          ۷ روز ﻫﻔﺘﻪ، ۲۴ ﺳﺎﻋﺘﻪ
        </span>
      </div>
    </section>
  );
};

export default FooterTopSection;
