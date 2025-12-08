import AddBlogPage from "@/components/dashboard/admin/add-blog-page"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";


export const metadata = {
  title: "داشبورد ادمین",
  description: "افزودن وبلاگ",
  robots: {
    index: false,
    follow: false,
  },
};
const AddBlog = async () => {
  const  session  = await getServerSession(authOptions);
  if (!session || session?.user?.role !== "admin") {
    return notFound();
  }
  return (
    <AddBlogPage />
  )
}

export default AddBlog
