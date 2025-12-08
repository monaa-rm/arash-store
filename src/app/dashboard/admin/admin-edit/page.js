import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import User from "../../../../../models/User";
import AdminEditPage from "@/components/dashboard/admin/admin-edit-page";

export const metadata = {
  title: "داشبورد ادمین",
  description: "ویراش اطلاعات ادمین",
  robots: {
    index: false,
    follow: false,
  },
};
const AdminEdit = async () => {
  const session = await getServerSession(authOptions);
  console.log({ role: session?.user?.role });
  if (!session || session?.user?.role !== "admin") {
    return notFound();
  }
  const user = await User.findOne({ phone: session?.user?.phone }).select({
    phone: 1,
    name: 1,
    lastName: 1,
    role: 1,
  });
  if (!user) {
    return (
      <div className="p-4 text-gray-700 text-sm">
        حساب کاربری در دیتابیس وجود ندارد.در صورت لزوم با پشتیبانی تماس بگیرید.
      </div>
    );
  }
  return (
    <AdminEditPage
    rolePath="admin"
      activeItem={{
        title: " ویرایش اطلاعات شخصی",
        link: "admin-edit",
      }}
      user={JSON.parse(JSON.stringify(user))}
    />
  );
};

export default AdminEdit;
