import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import UserCommentsPage from "@/components/dashboard/user/user-comments-page";
export const metadata = {
  title: "داشبورد کاربر",
  description: "لیست نظرات",
  robots: {
    index: false,
    follow: false,
  },
};

const UserComments = async () => {
    const session = await getServerSession(authOptions);
    if (!session || session?.user?.role !== "user") {
      return notFound();
    } 
  return <UserCommentsPage />;
};

export default UserComments;
