import Header from "@/components/header";
import "../../globals.css";
import Footer from "@/components/footer";
import ReduxToolkitProvider from "@/providers/ReduxToolkitProvider";
import { ToastContainer } from "react-toastify";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@smastrom/react-rating/style.css";
import DashboardUserLayout from "@/components/dashboard/user/dashboard-user-layout";

export default function adminLayout({ children }) {
  return (
   <DashboardUserLayout>
       {children}

   </DashboardUserLayout>
  );
}
