import ProductEditSinglePage from "@/components/dashboard/admin/product-edit-single-page";
import Product from "../../../../../../models/Product";
import connectDB from "@/utiles/connectDB";
import mongoose from "mongoose";
import { notFound } from "next/navigation";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

const ProductEditSingle = async ({ params }) => {
  const session = await getServerSession(authOptions);
  if (!session || session?.user?.role !== "admin") {
    return notFound();
  }
  await connectDB();
  const { productId } = await params;
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return notFound();
  }
  const data = await Product.findOne({ _id: productId });
  if (!data?.title) {
    return notFound();
  }
  return <ProductEditSinglePage data={JSON.parse(JSON.stringify(data))} />;
};

export default ProductEditSingle;
