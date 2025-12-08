import connectDB from "@/utiles/connectDB";
import Category from "../../../../models/Category";
import { notFound } from "next/navigation";
import CategorySinglePage from "@/components/category/categorySinglePage";

export async function generateMetadata({ params }) {
  let cat = {};
  const { catSlug } = await params;
  try {
    await connectDB();
    cat = await Category.findOne({ link: catSlug });
    if (!cat?.link) {
      return notFound();
    }
  } catch (error) {
    console.log(error);
  }
  // fetch post information
  console.log(cat);
  if (!cat?.link) {
    return {
      title: "دسته بندی یافت نشد",
      description: "دسته بندی مورد نطر یافت نشد",
      robots: {
        index: false,
        follow: false,
      },
    };
  }
  return {
    title: cat?.name,
    description: cat?.link,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SERVER_URL}/category/${cat?.link}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

const CategorySingle = async ({ params }) => {
  const { catSlug } = await params;
  let cat = {};
  try {
    await connectDB();
    cat = await Category.findOne({ link: catSlug });
    if (!cat?.link) {
      return notFound();
    }
  } catch (error) {
    console.log(error);
  }

  return <CategorySinglePage cat={JSON.parse(JSON.stringify(cat))} />;
};

export default CategorySingle;
