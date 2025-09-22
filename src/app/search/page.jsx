import SearchPage from "@/components/search/search-page";
import connectDB from "@/utiles/connectDB";
import Product from "../../../models/Product";


const Search = async () => {
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
    <SearchPage highestPrice={JSON.parse(JSON.stringify(highestPrice))} />
  );
};

export default Search;
