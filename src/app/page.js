import MainPage from "@/components/main-page";

export async function generateMetadata() {
  const site_url = process.env.NEXT_PUBLIC_SERVER_URL;
  return {
    title:
      "فروشگاه آرش | خرید لوازم و تجهیزات برودتی | لوله مسی، فیلتر آب، قطعات یخچال و کولر",
    description:
      "فروش آنلاین لوازم و تجهیزات برودتی شامل فیلتر آب، لوله مسی، قطعات جانبی یخچال و کولر. ارسال سریع به سراسر کشور و قیمت مناسب",
    // openGraph: {
    //   images: ["/some-specific-page-image.jpg", ...previousImages],
    // },
    alternates: {
      canonical: `${site_url}`,
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
    },
  };
}

export default function Home() {
  return <MainPage />;
}
