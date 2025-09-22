import DashboradUserMainPage from "@/components/dashboard/user/dashboard-user-main-page"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

const UserDashboard = async () => {
  const  session  = await getServerSession(authOptions);
  console.log({"role" : session?.user?.role})
  if (!session || session?.user?.role !== "user") {
    return notFound();
  }



  return (
    <DashboradUserMainPage />
  )
}

export default UserDashboard
