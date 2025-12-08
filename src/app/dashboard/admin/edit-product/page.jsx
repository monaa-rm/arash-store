import EditProductPage from "@/components/dashboard/admin/edit-product-page"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
export const metadata = {
  title: "داشبورد ادمین",
  description: "ویرایش محصولات",
  robots: {
    index: false,
    follow: false,
  },
};
const EditProduct = async () => {
  const  session  = await getServerSession(authOptions);
  if (!session || session?.user?.role !== "admin") {
    return notFound();
  }
  return (
    <EditProductPage />
  )
}

export default EditProduct
