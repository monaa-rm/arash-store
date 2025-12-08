import ContactUsPage from "@/components/informaition/contact-us-page";
import SiteSetting from "../../../models/SiteSetting";
import connectDB from "@/utiles/connectDB";
export const metadata = {
  title: "تماس با ما",
  description:
    "شما می‌توانید برای هر گونه پرسش، پیگیری سفارش یا دریافت پشتیبانی با ما در ارتباط باشید.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SERVER_URL}/contact-us`,
  },
  robots: {
    index: true,
    follow: true,
  },
};
const ContactUs = async () => {
  let information = {};
  try {
    await connectDB();
    information = await SiteSetting.findOne();
  } catch (error) {
    console.log(error);
    throw Error("خطا");
  }
  console.log(information);
  return <ContactUsPage information={information} />;
};

export default ContactUs;
