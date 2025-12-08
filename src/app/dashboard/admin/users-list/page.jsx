
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import UsersListPage from "@/components/dashboard/admin/users-list-page";
export const metadata = {
  title: "داشبورد ادمین",
  description: "لیست کاربران",
  robots: {
    index: false,
    follow: false,
  },
};
const UsersList = async () => {
  const session = await getServerSession(authOptions);
  if (!session || session?.user?.role !== "admin") {
    return notFound();
  }
  return <UsersListPage />;
};

export default UsersList;
