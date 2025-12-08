import InsockPage from "@/components/dashboard/admin/insock-page";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
export const metadata = {
  title: "داشبورد ادمین",
  description: "موجودی ها و قیمت ها",
  robots: {
    index: false,
    follow: false,
  },
};
const PriceInsock = async () => {
  const  session  = await getServerSession(authOptions);
  if (!session || session?.user?.role !== "admin") {
    return notFound();
  }
  return <InsockPage />;
};

export default PriceInsock;
