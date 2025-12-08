import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { notFound } from "next/navigation";
import DailySellpage from "@/components/dashboard/admin/daily-sell-page";
export const metadata = {
  title: "داشبورد ادمین",
  description: "فروش روزانه",
  robots: {
    index: false,
    follow: false,
  },
};
const DailySell = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user ||session?.user?.role !== "admin") {
    return notFound();
  }
  return <DailySellpage />;
};

export default DailySell;
