import ContactUsPage from "@/components/informaition/contact-us-page";
import SiteSetting from "../../../models/SiteSetting";
import connectDB from "@/utiles/connectDB";

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
