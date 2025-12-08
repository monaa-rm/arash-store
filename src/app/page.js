import MainPage from "@/components/main-page";
import connectDB from "@/utiles/connectDB";
import SiteSetting from "../../models/SiteSetting";
import JsonDl from "@/components/elements/json-dl-func";
export const dynamic = "force-dynamic";
export async function generateMetadata() {
  const site_url = process.env.NEXT_PUBLIC_SERVER_URL;
  return {
    title:
      "فروشگاه آرش | خرید لوازم و تجهیزات برودتی | لوله مسی، فیلتر آب، قطعات یخچال و کولر",
    description:
      "فروش آنلاین لوازم و تجهیزات برودتی شامل فیلتر آب، لوله مسی، قطعات جانبی یخچال و کولر. ارسال سریع به سراسر کشور و قیمت مناسب",

    generator: "Next.js",
    referrer: "origin-when-cross-origin",
    alternates: {
      canonical: `${site_url}`,
      // Languages:{
      //   "fa" : `${site_url}`
      // }
    },

    robots: {
      index: true,
      follow: true,
      nocache: true,
    },
    // openGraph: {
    //   images: [
    //     {
    //       url: "https://nextjs.org/og.png",
    //       width: 800,
    //       height: 600,
    //     },
    //     {
    //       url: "https://nextjs.org/og-alt.png",
    //       width: 1800,
    //       height: 1600,
    //       alt: "My custom alt",
    //     },
    //   ],
    // },
  };
}

export default async function Home() {
  await connectDB();
  const siteInfo = await SiteSetting.findOne();
  const websiteContactPoint = siteInfo?.phone?.map((ph) => ({
    "@type": "ContactPoint",
    telephone: ph,
    contactType: "customer service",
    areaServed: "IR",
    availableLanguage: "Persian",
  }));
  //same as
  const webSiteSameAs = [];
  siteInfo?.telegramLink?.length &&
    siteInfo?.telegramLink?.startsWith("https") &&
    webSiteSameAs.push(siteInfo?.telegramLink);
  siteInfo?.whatsappLink?.length &&
    siteInfo?.whatsappLink?.startsWith("https") &&
    webSiteSameAs.push(siteInfo?.whatsappLink);
  siteInfo?.instagramLink?.length &&
    siteInfo?.instagramLink?.startsWith("https") &&
    webSiteSameAs.push(siteInfo?.instagramLink);
  siteInfo?.youtubeLink?.length &&
    siteInfo?.youtubeLink?.startsWith("https") &&
    webSiteSameAs.push(siteInfo?.youtubeLink);
  const websiteAddress = siteInfo?.address?.map((a) => ({
    "@type": "PostalAddress",
    streetAddress: a,
  }));
  const websiteJsonDl = {
    "@context": process.env.NEXT_PUBLIC_SERVER_URL,
    "@type": "Organization",
    name: "فروشگاه آرش",
    url: process.env.NEXT_PUBLIC_SERVER_URL,
    logo: siteInfo?.logo || "",
    contactPoint: websiteContactPoint,
    sameAs: webSiteSameAs,
    address: websiteAddress,
    potentialAction: {
      "@type": "SearchAction",
      target: `${process.env.NEXT_PUBLIC_SERVER_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
  //// imageObject banner
  const imageInfo = siteInfo?.welcomeImages?.map((img) => ({
    "@context": process.env.NEXT_PUBLIC_SERVER_URL,
    "@type": "ImageObject",
    contentUrl: img?.file,
  }));
  const imageObjectDl = {
    "@context": process.env.NEXT_PUBLIC_SERVER_URL,
    "@type": "ItemList",
    itemListElement: imageInfo,
  };
  console.log(imageObjectDl);
  return (
    <>
      <JsonDl data={websiteJsonDl} jsondlkey="site-jsondl" />
      <JsonDl data={imageObjectDl} jsondlkey="banner-jsondl" />
      <MainPage />
    </>
  );
}
