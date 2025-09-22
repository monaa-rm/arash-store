import CommentsPage from "@/components/dashboard/admin/comments-page";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
const Comments = async () => {
    const session = await getServerSession(authOptions);
    console.log({ role: session?.user?.role });
    if (!session || session?.user?.role !== "admin") {
      return notFound();
    } 
  return <CommentsPage />;
};

export default Comments;
