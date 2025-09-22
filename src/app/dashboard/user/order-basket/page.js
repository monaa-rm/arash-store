import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import UserOrdersPage from "@/components/dashboard/user/user-orders-page";
import OrdersPage from "@/components/orders/orders-page";
import OrderBasketPage from "@/app/orders/orders-basket-page";

const OrderBasket = async () => {
  const  session  = await getServerSession(authOptions);
  if (!session || session?.user?.role !== "user") {
    return notFound();
  }
  return (
    <div>
      <OrderBasketPage />
    </div>
  );
};

export default OrderBasket;