import ProductSingleItemPage from "@/components/products/product-single-Item-page";
import connectDB from "@/utiles/connectDB";
import mongoose from "mongoose";
import { notFound } from "next/navigation";
import Product from "../../../../../models/Product";

const ProductSingleItemSlug = async ({ params }) => {
  await connectDB();
  const { productId } = await params;
  let data = {};
  let similiarProducts = [];

  try {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      console.log("inja");
      return notFound();
    }
    data = await Product.findOne({ _id: productId });
    if (data?.title) {
      data.view = data?.view + 1;
      await data?.save();
    } else {
      return notFound();
    }

    if (data) {
      const categoryIds = data?.category?.map((cat) => cat._id);
      similiarProducts = await Product.find({
        category: {
          $elemMatch: {
            _id: { $in: categoryIds },
          },
        },
      });
    }
  } catch (error) {
    console.log(error);
    return notFound();
  }

  return (
    <div className="flex flex-col gap-4">
      <ProductSingleItemPage
        data={JSON.parse(JSON.stringify(data)) || {}}
        similiarProducts={JSON.parse(JSON.stringify(similiarProducts)) || []}
      />
    </div>
  );
};
export default ProductSingleItemSlug;
