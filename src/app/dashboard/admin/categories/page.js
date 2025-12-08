import CategoriesPage from "@/components/dashboard/admin/categories-page";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
export const metadata = {
  title: "داشبورد ادمین",
  description: "صفحه ی دسته بندی ها",
  robots: {
    index: false,
    follow: false,
  },
};
const Categories = async () => {
  const  session  = await getServerSession(authOptions);
  if (!session || session?.user?.role !== "admin") {
    return notFound();
  }
  return <CategoriesPage  />;
};

export default Categories;
