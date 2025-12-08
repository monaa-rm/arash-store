// import { slugify } from "@/utiles/utils-func";

// export default async function sitemap() {
//   const staticPages = ["/about-us", "/contact-us", "/terms", "/privacy-policy"];
//   const staticUrls = staticPages?.map((path) => ({
//     url: `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`,
//     lastModified: new Date("2025-04-10"),
//   }));
//   const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/sitemap`, {
//     next: { revalidate: 3600 },
//   });
//   const {
//     products,
//     blogs,
//     categories,
//     lastProductUpdate,
//     lastBlogUpdate,
//     lastModifiedTimestamp
//   } = await res.json();

//   const productsUrls = products?.map((product) => {
//     const prdslug = slugify(product?.title);
//     return {
//       url: `${process.env.NEXT_PUBLIC_SERVER_URL}/products/${product._id}/${prdslug}`,
//       lastModified: product?.updatedAt,
//     };
//   });

//   const blogsUrls = blogs?.map((blog) => {
//     const blogSlug = slugify(blog?.title);
//     return {
//       url: `${process.env.NEXT_PUBLIC_SERVER_URL}/blogs/${blog._id}/${blogSlug}`,
//       lastModified: blog?.createdAt,
//     };
//   });
//   const categoriesUrls = categories?.map((cat) => ({
//     url: `${process.env.NEXT_PUBLIC_SERVER_URL}/category/${cat?.link}`,
//     lastModified: cat?.updatedAt,
//   }));
//   return [
//     {
//       url: `${process.env.NEXT_PUBLIC_SERVER_URL}`,
//       lastModified: lastModifiedTimestamp,
//     },
//     {
//       url: `${process.env.NEXT_PUBLIC_SERVER_URL}/products`,
//       lastModified: lastProductUpdate,
//     },
//     {
//       url: `${process.env.NEXT_PUBLIC_SERVER_URL}/blogs`,
//       lastModified: lastBlogUpdate,
//     },
//     ...staticUrls,
//     ...productsUrls,
//     ...blogsUrls,
//     ...categoriesUrls,
//   ];
// }

import { slugify } from "@/utiles/utils-func";

export default async function sitemap() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SERVER_URL || "https://your-app-name.liara.run";

  // 💡 مرحله Build یا SSR — window وجود ندارد
  const isServerSide = typeof window === "undefined";

  // صفحاتی که همیشه وجود دارند
  const staticPages = ["/about-us", "/contact-us", "/terms", "/privacy-policy"];
  const staticUrls = staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date("2025-04-10"),
  }));

  // اگر در مرحله Build هستیم، از داده‌ی فرضی استفاده کن و fetch نزن!
  if (isServerSide) {
    console.log("📦 Sitemap generation running in Build mode — skipping fetch");
    return [
      {
        url: `${baseUrl}`,
        lastModified: new Date(),
      },
      ...staticUrls,
    ];
  }

  // ✅ در حالت اجرا‌ی واقعی — داده از API بگیر
  try {
    const res = await fetch(`${baseUrl}/api/sitemap`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch sitemap data: ${res.status}`);
    }

    const {
      products,
      blogs,
      categories,
      lastProductUpdate,
      lastBlogUpdate,
      lastModifiedTimestamp,
    } = await res.json();

    const productsUrls = products?.map((product) => {
      const prdslug = slugify(product?.title);
      return {
        url: `${baseUrl}/products/${product._id}/${prdslug}`,
        lastModified: product?.updatedAt,
      };
    });

    const blogsUrls = blogs?.map((blog) => {
      const blogSlug = slugify(blog?.title);
      return {
        url: `${baseUrl}/blogs/${blog._id}/${blogSlug}`,
        lastModified: blog?.createdAt,
      };
    });

    const categoriesUrls = categories?.map((cat) => ({
      url: `${baseUrl}/category/${cat?.link}`,
      lastModified: cat?.updatedAt,
    }));

    return [
      {
        url: `${baseUrl}`,
        lastModified: lastModifiedTimestamp,
      },
      {
        url: `${baseUrl}/products`,
        lastModified: lastProductUpdate,
      },
      {
        url: `${baseUrl}/blogs`,
        lastModified: lastBlogUpdate,
      },
      ...staticUrls,
      ...productsUrls,
      ...blogsUrls,
      ...categoriesUrls,
    ];
  } catch (err) {
    console.error("❌ Sitemap generation failed:", err);
    // اگر fetch شکست خورد، داده‌ی حداقلی برگردان
    return [
      {
        url: `${baseUrl}`,
        lastModified: new Date(),
      },
      ...staticUrls,
    ];
  }
}
