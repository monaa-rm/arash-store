import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import FavoritesPage from "@/components/dashboard/user/favorites-page";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
export const metadata = {
  title: "داشبورد کاربر",
  description: "لیست علاقه مندی ها",
  robots: {
    index: false,
    follow: false,
  },
};
const Favorites = async () => {
  const session = await getServerSession(authOptions);
  if (!session || session?.user?.role !== "user") {
    return notFound();
  }

  return <FavoritesPage />;
};

export default Favorites;
