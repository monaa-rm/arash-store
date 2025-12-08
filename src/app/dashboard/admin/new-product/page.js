import NewProductPage from "@/components/dashboard/admin/new-product-page";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
export const metadata = {
  title: "داشبورد ادمین",
  description: "افزودن محصول جدید",
  robots: {
    index: false,
    follow: false,
  },
};
const NewProduct = async () => {
  const  session  = await getServerSession(authOptions);
  if (!session || session?.user?.role !== "admin") {
    return notFound();
  }
  return <NewProductPage />;
};

export default NewProduct;
