import AboutUsPage from '@/components/informaition/about-us-page'
import React from 'react'
export const metadata = {
  title: "درباره‌ی ما",
  description:
    "فروشگاه اینترنتی آرش، با هدف تامین و عرضه‌ی قطعات جانبی و تجهیزات برودتی راه‌اندازی شده است.محصولات ما شامل انواع لوازم یدکی و تجهیزات مورد نیاز برای کولرها، یخچال‌ها، فریزر‌ها و دیگر دستگاه‌های برودتی می‌باشد.با داشتن دو شعبه‌ی فعال در شهرهای لاهیجان و لنگرود و تجربه‌ی چندین ساله در زمینه‌ی فروش حضوری، اکنون این امکان را فراهم کرده‌ایم تا مشتریان بتوانند قطعات مورد نیاز خود را به صورت انلاین و در کوتاه‌ترین زمان تهیه کنند.مأموریت ما ارائه‌ی کالاهای اصلی، مشاوره تخصصی و خدمات پس از فروش مطمئن است تا مشتریان از بابت کیفیت و اصالت کالا آسوده باشند.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SERVER_URL}/about-us`,
  },
  robots: {
    index: true,
    follow: true,
  },
};
const Aboutus = () => {
  return (
    <AboutUsPage />
  )
}

export default Aboutus
