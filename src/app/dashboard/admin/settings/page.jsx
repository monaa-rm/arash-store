import SettingsPage from "@/components/dashboard/admin/settings-page";
import connectDB from "@/utiles/connectDB";
import SiteSetting from "../../../../../models/SiteSetting";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
export const metadata = {
  title: "داشبورد ادمین",
  description: "تنظیمات سایت",
  robots: {
    index: false,
    follow: false,
  },
};
const Settings = async () => {
  const  session  = await getServerSession(authOptions);
  if (!session || session?.user?.role !== "admin") {
    return notFound();
  }
  await connectDB();
  const data = await SiteSetting.findOne();


  return <SettingsPage data={JSON.parse(JSON.stringify(data)) || {}} />;
};

export default Settings;
