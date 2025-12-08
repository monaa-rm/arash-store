import DashboradAdminMainPage from "@/components/dashboard/admin/dashboard-admin-main-page";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

export const metadata = {
  title: "داشبورد ادمین",
  description: "داشبورد | ادمین",
  robots: {
    index: false,
    follow: false,
  },
};

const AdminDashboard = async () => {
  const session = await getServerSession(authOptions);
  if (!session || session?.user?.role !== "admin") {
    return notFound();
  }
  return <DashboradAdminMainPage />;
};

export default AdminDashboard;
