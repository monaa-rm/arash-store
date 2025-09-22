import connectDB from "@/utiles/connectDB";
import Category from "../../../../models/Category";
import { notFound } from "next/navigation";
import CategorySinglePage from "@/components/category/categorySinglePage";

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
  return <CategorySinglePage  cat={JSON.parse(JSON.stringify(cat))} />;
};

export default CategorySingle;
