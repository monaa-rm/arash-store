import ProductSingleItemPage from "@/components/products/product-single-Item-page";
import connectDB from "@/utiles/connectDB";
import Product from "../../../../models/Product";
import mongoose from "mongoose";
import { notFound, redirect } from "next/navigation";
import GlobalLoading from "@/components/elements/global-loading";
import { slugify } from "@/utiles/utils-func";

const ProductSingleItem = async ({ params }) => {
  const { productId } = await params;
  let data = {};
  let similiarProducts = []; 

  try {
    await connectDB();
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return notFound();
    }
    data = await Product.findOne({ _id: productId });
    if (data?.title) {
      console.log("ok");
    } else {
      return notFound();
    }
  } catch (error) {
    console.log(error);
    return notFound();
  }
  if (data?.title) {
      const prdslug = slugify(data?.title);
    return redirect(`/products/${data?._id}/${prdslug}`);
  } else {
    return (
      <div className="flex flex-col gap-4">
        <GlobalLoading />
      </div>
    );
  }
};

export default ProductSingleItem;
