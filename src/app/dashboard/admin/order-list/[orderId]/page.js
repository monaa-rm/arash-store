import SingleOrderPage from "@/components/dashboard/admin/single-order-page";
import connectDB from "@/utiles/connectDB";
import Order from "../../../../../../models/order";
import mongoose from "mongoose";
import { notFound } from "next/navigation";
import Product from "../../../../../../models/Product";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const SingleOrder = async ({ params }) => {
  const { orderId } = await params;
  const { user } = await getServerSession(authOptions);
  if (!user || user?.role !== "admin") {
    return notFound();
  }
  await connectDB();
  let data = {};
  try {
    const orders = await Order.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(orderId) } },
      {
        $addFields: {
          orderId: { $toString: "$_id" }, // Convert _id to string for later use
        },
      },
      {
        $unwind: "$items",
      },
      {
        $lookup: {
          from: "products",
          let: { prdId: "$items.id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", { $toObjectId: "$$prdId" }],
                },
              },
            },
            {
              $project: {
                imageSrc: 1,
                category: 1,
                unit: 1,
                productId: "$_id",
              },
            },
          ],
          as: "productInfo",
        },
      },
      {
        $unwind: {
          path: "$productInfo",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          "items.imageSrc": "$productInfo.imageSrc",
          "items.productId": "$productInfo.productId",
          "items.category": "$productInfo.category",
          "items.unit": "$productInfo.unit",
        },
      },
      {
        $group: {
          _id: "$_id",
          orderId: { $first: "$orderId" }, // Use the string version of _id
          items: { $push: "$items" },
          allCost: { $first: "$allCost" },
          status: { $first: "$status" },
          client: { $first: "$client" },
          name: { $first: "$name" },
          lastName: { $first: "$lastName" },
          province: { $first: "$province" },
          city: { $first: "$city" },
          address: { $first: "$address" },
          postalCode: { $first: "$postalCode" },
          phoneNumber: { $first: "$phoneNumber" },
          mobileNumber: { $first: "$mobileNumber" },
          email: { $first: "$email" },
          additionalInfo: { $first: "$additionalInfo" },
          createdAt: { $first: "$createdAt" },
          __v: { $first: "$__v" },
        },
      },
      {
        $project: {
          _id: { $toObjectId: "$orderId" }, // Convert back to ObjectId
          items: 1,
          allCost: 1,
          status: 1,
          client: 1,
          name: 1,
          lastName: 1,
          province: 1,
          city: 1,
          address: 1,
          postalCode: 1,
          phoneNumber: 1,
          mobileNumber: 1,
          email: 1,
          additionalInfo: 1,
          createdAt: 1,
          __v: 1,
        },
      },
    ]);

    if (!orders || orders.length === 0) {
      return notFound();
    }
    console.log({ orders });
    data = orders[0];
  } catch (error) {
    console.error("Error fetching order data:", error);
    notFound();
  }

  return <SingleOrderPage data={JSON.parse(JSON.stringify(data))} />;
};

export default SingleOrder;
