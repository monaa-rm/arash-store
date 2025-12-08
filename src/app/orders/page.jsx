import OrdersPage from "@/components/orders/orders-page";

export const metadata = {
  title: "سبد خرید",
  description: "لیست سفارش های شما در سایت",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SERVER_URL}/orders`,
  },
  robots: {
    index: false,
    follow: false,
  },
};
const Ordrers = () => {
  return <OrdersPage />;
};

export default Ordrers;
