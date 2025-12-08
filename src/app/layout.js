import Header from "@/components/header";
import "./globals.css";
import Footer from "@/components/footer";
import ReduxToolkitProvider from "@/providers/ReduxToolkitProvider";
import { NextAuthProvider } from "@/providers/next-auth-provider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@smastrom/react-rating/style.css";
import SignUpSection from "@/components/sign-up-section";
import connectDB from "@/utiles/connectDB";
import SiteSetting from "../../models/SiteSetting";
import HeaderSetting from "@/components/header/HeaderSetting";

export const metadata = {
  title:
    "فروشگاه آرش | خرید لوازم و تجهیزات برودتی | لوله مسی، فیلتر آب، قطعات یخچال و کولر",
  description:
    "فروش آنلاین لوازم و تجهیزات برودتی شامل فیلتر آب، لوله مسی، قطعات جانبی یخچال و کولر. ارسال سریع به سراسر کشور و قیمت مناسب",

  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SERVER_URL}`,
    Languages: {
      fa: `${process.env.NEXT_PUBLIC_SERVER_URL}`,
    },
  },
  //  icons: {
  //     icon: '/icon16*16or32*32.png',
  //     shortcut: '/shortcut-icon16*16or32*32.png',
  //     apple: '/apple-icon180*180.png',
  //   },
  charset: "utf-8",
  robots: {
    index: true,
    follow: true,
  },
};
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, 
};
export default async function RootLayout({ children }) {
  let show_price = false;
  let freeSending = false;
  try {
    await connectDB();
    const result = await SiteSetting.findOne().select({
      showPrice: 1,
      freeSending: 1,
    });
    if (result?.freeSending) {
      freeSending = true;
    } else {
      freeSending = false;
    }
    if (result?.showPrice) {
      show_price = true;
    } else {
      show_price = false;
    }
  } catch (error) {
    throw Error("خطا");
  }
  return (
    <html lang="fa-IR" dir="rtl">
      <body>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XLTQLRHPF5"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: ` window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-XLTQLRHPF5');`,
          }}
        ></script>
        <ReduxToolkitProvider
          show_price={show_price}
          // show_price={JSON.parse(JSON.stringify(show_price))}
          freeSending={freeSending}
        >
          <NextAuthProvider>
            {/* <>
              <meta charSet="utf-8" />
              <link rel="shortcut icon" href="" type="image/x-icon" />
            </> */}
            <HeaderSetting />
            <Header show_price={show_price} />
            <SignUpSection />
            {children}
            <Footer />
          </NextAuthProvider>
        </ReduxToolkitProvider>
      </body>
    </html>
  );
}
