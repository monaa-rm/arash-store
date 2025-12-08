import OrderListPage from "@/components/dashboard/admin/order-list-page";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import UserOrdersPage from "@/components/dashboard/user/user-orders-page";
export const metadata = {
  title: "داشبورد کاربر",
  description: "لیست سفارشات",
  robots: {
    index: false,
    follow: false,
  },
};
const OrderList = async () => {
  const  session  = await getServerSession(authOptions);
  if (!session || session?.user?.role !== "user") {
    return notFound();
  }
  return (
    <div>
      <UserOrdersPage />
    </div>
  );
};

export default OrderList;
