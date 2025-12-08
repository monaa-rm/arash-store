import SuggestProductsPage from "@/components/dashboard/admin/suggest-products-page";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
export const metadata = {
  title: "داشبورد ادمین",
  description: "محصولات پیشنهادی",
  robots: {
    index: false,
    follow: false,
  },
};
const SuggestProducts = async () => {
  const session = await getServerSession(authOptions);
  if (!session || session?.user?.role !== "admin") {
    return notFound();
  }
  return <SuggestProductsPage />;
};

export default SuggestProducts;
