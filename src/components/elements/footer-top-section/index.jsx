import Image from 'next/image'
import React from 'react'

const FooterTopSection = () => {
  return (
    <section className="w-full  grid grid-cols-2 md:grid-cols-4 justify-between items-center gap-6 py-4 px-8 lg:px-28">
    <div className="flex flex-col  gap-4 items-center justify-center">
      <Image
        alt="express"
        src={"/images/delivery.png"}
        width={50}
        height={50}
        sizes="50px"
      />
      <span className="font-bold text-zinc-400 text-sm">اﻣﮑﺎن ﺗﺤﻮﯾﻞ اﮐﺴﭙﺮس</span>
    </div>
    <div className="flex flex-col  gap-4 items-center justify-center">
      <Image
        alt="express"
        src={"/images/free-delivery.png"}
        width={50}
        height={50}
        sizes="50px"
      />
      <span className="font-bold text-zinc-400 text-sm">ارسال رایگان</span>
    </div>
    <div className="flex flex-col  gap-4 items-center justify-center">
      <Image
        alt="express"
        src={"/images/authenticity.png"}
        width={50}
        height={50}
        sizes="50px"
      />
      <span className="font-bold text-zinc-400 text-sm">ﺿﻤﺎﻧﺖ اﺻﻞ ﺑﻮدن ﮐﺎﻟﺎ</span>
    </div>
    <div className="flex flex-col  gap-4 items-center justify-center">
      <Image
        alt="express"
        src={"/images/24-hours-support.png"}
        width={50}
        height={50}
        sizes="50px"
      />
      <span className="font-bold text-zinc-400 text-sm">۷ روز ﻫﻔﺘﻪ، ۲۴ ﺳﺎﻋﺘﻪ</span>
    </div>
  </section>
  )
}

export default FooterTopSection
