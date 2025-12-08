import ProductsPage from "@/components/products/products-page";
import connectDB from "@/utiles/connectDB";
import Product from "../../../models/Product";
export const dynamic = "force-dynamic";

// app/products/page.jsx  (یا page.js)
export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  // const page = Math.max(1, Number(searchParams?.page) || 1);
  const canonical = page
    ? `${process.env.NEXT_PUBLIC_SERVER_URL}/products?page=${page}`
    : `${process.env.NEXT_PUBLIC_SERVER_URL}/products`;

  const title = page
    ? `محصولات — صفحه ${page} | فروشگاه آرش`
    : "محصولات | فروشگاه آرش";

  const description = page
    ? `صفحه ${page} از لیست محصولات فروشگاه آرش. مشاهده و خرید آنلاین انواع کالا.`
    : "لیست کامل محصولات فروشگاه آرش. مشاهده و خرید جدیدترین محصولات با بهترین قیمت.";

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "فروشگاه آرش",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

const Products = async () => {
  let highestPrice = 0;

  try {
    await connectDB();
    // پایپ‌لاین Aggregation برای پیدا کردن گران‌ترین قیمت
    const pipeline = [
      {
        $sort: {
          "price.howMuch": -1, // مرتب‌سازی نزولی بر اساس price.howMuch
        },
      },
      {
        $limit: 1, // فقط گران‌ترین محصول را انتخاب کن
      },
      {
        $project: {
          _id: 0, // فیلد _id را حذف کن
          highestPrice: "$price.howMuch", // فقط قیمت را با نام highestPrice برگردان
        },
      },
    ];

    const result = await Product.aggregate(pipeline);

    if (result.length > 0) {
      highestPrice = result[0].highestPrice;
    }
  } catch (error) {
    console.error("Error fetching highest price:", error);
    throw Error("erroooor");
  }

  return (
    <ProductsPage highestPrice={JSON.parse(JSON.stringify(highestPrice))} />
  );
};

export default Products;
