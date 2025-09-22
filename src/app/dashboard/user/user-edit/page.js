import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import User from "../../../../../models/User";
import AdminEditPage from "@/components/dashboard/admin/admin-edit-page";
import { FaUserEdit } from "react-icons/fa";

const UserEdit = async () => {
  const session = await getServerSession(authOptions);
  console.log({ role: session?.user?.role });
  if (!session || session?.user?.role !== "user") {
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
  return <AdminEditPage rolePath="user" activeItem={{
        title: " ویرایش اطلاعات شخصی",
        link: "user-edit",
      }} user={JSON.parse(JSON.stringify(user))} />;
};

export default UserEdit;
