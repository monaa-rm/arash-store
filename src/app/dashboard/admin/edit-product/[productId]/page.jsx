import ProductEditSinglePage from "@/components/dashboard/admin/product-edit-single-page";
import Product from "../../../../../../models/Product";
import connectDB from "@/utiles/connectDB";
import mongoose from "mongoose";
import { notFound } from "next/navigation";


const ProductEditSingle = async ({ params }) => {
  await connectDB();
  const { productId } = await params;
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return notFound();
  }
  const data = await Product.findOne({ _id: productId });
  if(!data?.title){
    return notFound();
  }
  return <ProductEditSinglePage data={JSON.parse(JSON.stringify(data))} />;
};

export default ProductEditSingle;
