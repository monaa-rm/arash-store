
import SiteSetting from "../../../models/SiteSetting";
import FooterMain from "./footer-main";

const Footer = async () => {
  let info = {};
  try {
    info = await SiteSetting.findOne();
  } catch (error) {
    console.log(error);
    throw Error("خطا در دریافت اطلاعات");
  }
  return <FooterMain data={JSON.parse(JSON.stringify(info))} />;
};

export default Footer;
