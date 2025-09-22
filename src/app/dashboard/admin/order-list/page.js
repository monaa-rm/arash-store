import OrderListPage from "@/components/dashboard/admin/order-list-page";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

const OrderList = async () => {
  const  session  = await getServerSession(authOptions);
  if (!session || session?.user?.role !== "admin") {
    return notFound();
  }
  return (
    <div>
      <OrderListPage />
    </div>
  );
};

export default OrderList;
