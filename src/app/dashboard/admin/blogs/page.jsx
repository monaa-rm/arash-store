import AdminBlogsPage from "@/components/dashboard/admin/admin-blogs-page";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

const AdminBlogs = async () => {
  const session = await getServerSession(authOptions);
  if (!session || session?.user?.role !== "admin") {
    return notFound();
  }
  return <AdminBlogsPage />;
};

export default AdminBlogs;
