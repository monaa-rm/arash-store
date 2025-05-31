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

export default function RootLayout({ children }) {
  return (
    <html lang="fa-IR" dir="rtl">
      <body>
        <ReduxToolkitProvider>
        <NextAuthProvider>
          <Header />
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
