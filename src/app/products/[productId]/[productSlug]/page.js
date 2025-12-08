import ProductSingleItemPage from "@/components/products/product-single-Item-page";
import JsonDl from "@/components/elements/json-dl-func";
import { notFound, redirect } from "next/navigation";
import { slugify } from "@/utiles/utils-func";
import GlobalLoading from "@/components/elements/global-loading";
export const dynamic = "force-dynamic";

const getData = async (productId) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/product/get-product/${productId}`,
    { cache: "no-store" }
  );
  return data.json();
};

export async function generateMetadata({ params }) {
  const { productId, productSlug } = await params;
  const data = await getData(productId);
  if (!data?.data?.title) {
    return {
      title: "محصول یافت نشد",
      description: "محصول مورد نطر یافت نشد",
      robots: {
        index: false,
        follow: false,
      },
    };
  }
  let properties = data?.data?.properties?.join("، ");
  // fetch post information
  const prdImgs =
    data?.data?.imageSrc?.map((img, i) => ({
      url: img?.file,
      width: 1200,
      height: 628,
      alt: `${data?.data?.title}-نمای ${i + 1}`,
    })) || [];
  return {
    title: data?.data?.title,
    description: properties,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SERVER_URL}/products/${data?.data?._id}/${encodeURIComponent(productSlug)}`,
    },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": "-1",
    },
    openGraph: {
      // images: [
      //   {
      //     url: "https://nextjs.org/og.png",
      //     width: 800,
      //     height: 600,
      //   },
      //   {
      //     url: "https://nextjs.org/og-alt.png",
      //     width: 1800,
      //     height: 1600,
      //     alt: "My custom alt",
      //   },
      // ],
      images: prdImgs,
    },
  };
}
const ProductSingleItemSlug = async ({ params }) => {
  const { productId, productSlug } = await params;
  // await connectDB();
  // let data = {};
  // let similiarProducts = [];

  // try {
  //   if (!mongoose.Types.ObjectId.isValid(productId)) {
  //     return notFound();
  //   }
  //   data = await Product.findOne({ _id: productId });
  //   if (data?.title) {
  //     data.view = data?.view + 1;
  //     await data?.save();
  //   } else {
  //     return notFound();
  //   }

  //   if (data) {
  //     const categoryIds = data?.category?.map((cat) => cat._id);
  //     similiarProducts = await Product.find({
  //       category: {
  //         $elemMatch: {
  //           _id: { $in: categoryIds },
  //         },
  //       },
  //     });
  //   }
  // } catch (error) {
  //   console.log(error);
  //   return notFound();
  // }

  ///////////seo structure data
  const data = await getData(productId);
  if (data?.error) {
    return notFound();
  }
  const prdslug = slugify(data?.data?.title);
  const decodedProductSlug = decodeURIComponent(productSlug);
  if (decodedProductSlug !== prdslug) {
    return redirect(`/products/${productId}/${prdslug}`);
  }
  const productImages = data?.data?.imageSrc?.map((img) => img?.file);
  let productDesc = "";
  data?.data?.properties?.map((p) => (productDesc = `${productDesc}،${p}`));
  const productjsondl = {
    "@context": process.env.NEXT_PUBLIC_SERVER_URL,
    "@type": "Product",
    name: data?.data?.title || "",
    description: productDesc || "",
    image: productImages,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: data?.data?.score,
      reviewCount: data?.data?.scoreNumber,
    },
    sku: data?.data?.productId,
    brand: {
      "@type": "Brand",
      name: "arash store",
    },
    url: `${process.env.NEXT_PUBLIC_SERVER_URL}/${productId}/${encodeURIComponent(productSlug)}`,
    offers: {
      "@type": "Offer",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/${productId}/${encodeURIComponent(productSlug)}`,
      availability:
        data?.data?.instock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/outOfStock",
      price: data?.data?.price?.howMuch * 10,
      priceCurrency: "IRR",
    },
  };

  ////////////////////////////////////////////////////////////////////
  if (!data?.data?.title) return <GlobalLoading />;
  return (
    <>
      <JsonDl data={productjsondl} jsondlkey="product-jsondl" />
      <div className="flex flex-col gap-4">
        <ProductSingleItemPage
          data={JSON.parse(JSON.stringify(data?.data)) || {}}
          similiarProducts={
            JSON.parse(JSON.stringify(data?.similiarProducts)) || []
          }
        />
      </div>
    </>
  );
};
export default ProductSingleItemSlug;
