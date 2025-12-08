import "../../globals.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@smastrom/react-rating/style.css";
import DashboardAdminLayout from "@/components/dashboard/admin/dashboard-admin-layout";

export default function adminLayout({ children }) {
  return <DashboardAdminLayout>{children}</DashboardAdminLayout>;
}
