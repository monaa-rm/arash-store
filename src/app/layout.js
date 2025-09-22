import Header from "@/components/header";
import "./globals.css";
import Footer from "@/components/footer";
import ReduxToolkitProvider from "@/providers/ReduxToolkitProvider";
import { ToastContainer } from "react-toastify";
import { NextAuthProvider } from "@/providers/next-auth-provider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@smastrom/react-rating/style.css";
import SignUpSection from "@/components/sign-up-section";
import connectDB from "@/utiles/connectDB";
import SiteSetting from "../../models/SiteSetting";
import HeaderSetting from "@/components/header/HeaderSetting";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScable: false,
};

export default async function RootLayout({ children }) {
  let show_price = false;

  try {
    await connectDB();
    const result = await SiteSetting.findOne().select({ showPrice: 1 });
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
        <ReduxToolkitProvider
          show_price={JSON.parse(JSON.stringify(show_price))}
          // initialGlobals={initialGlobals}
        >
          <NextAuthProvider>
            <>
              <meta charSet="utf-8" />
              {/* <link rel="shortcut icon" href="" type="image/x-icon" /> */}
            </>
            <HeaderSetting />
            <Header show_price={show_price} />
            <SignUpSection />
            {children}
            <Footer />
          </NextAuthProvider>
        </ReduxToolkitProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
