import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import OrderBasketPage from "@/components/dashboard/user/order-basket-page";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
export const metadata = {
  title: "داشبورد کاربر",
  description: "سبد خرید",
  robots: {
    index: false,
    follow: false,
  },
};
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