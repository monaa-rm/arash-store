import connectDB from "@/utiles/connectDB";
import { NextResponse } from "next/server";
import SiteSetting from "../../../../models/SiteSetting";
import Blog from "../../../../models/Blog";
import Product from "../../../../models/Product";
import Category from "../../../../models/Category";

export async function GET(req) {
  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
  }
  try {
    const products = await Product.find().select({_id : 1 , title : 1,createdAt: 1 , updatedAt : 1});
    const blogs = await Blog.find().select({_id : 1 , title : 1,createdAt: 1 });
    const categories = await Category.find()
    const siteSetting = await SiteSetting.findOne().select({createdAt: 1 , updatedAt : 1});
    const lastProductUpdate = new Date(
      Math.max(
        ...products.map((p) => new Date(p.updatedAt || p.createdAt).getTime())
      )
    );
    const lastBlogUpdate = new Date(
      Math.max(...blogs.map((b) => new Date(b.createdAt).getTime()))
    );

    const lastSiteSettingUpdate = siteSetting?.updatedAt
      ? new Date(siteSetting.updatedAt).getTime()
      : 0;

    // حالا بزرگترین timestamp بین سه تا
    const lastModifiedTimestamp = new Date(
      Math.max(lastProductUpdate, lastBlogUpdate, lastSiteSettingUpdate)
    ).toISOString;

    return NextResponse.json(
      {
        products,
        blogs,
        categories,
        lastProductUpdate,
        lastBlogUpdate,
        lastModifiedTimestamp,
      },
      {
        status: 200,
        headers: {
          "Cache-Control":
            "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error) {
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
  }
}
