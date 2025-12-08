import { slugify } from "@/utiles/utils-func";

export default async function sitemap() {
  const staticPages = ["/about-us", "/contact-us", "/terms", "/privacy-policy"];
  const staticUrls = staticPages?.map((path) => ({
    url: `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`,
    lastModified: new Date("2025-04-10"),
  }));
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/sitemap`, {
    next: { revalidate: 3600 },
  });
  const {
    products,
    blogs,
    categories,
    lastProductUpdate,
    lastBlogUpdate,
    lastModifiedTimestamp
  } = await res.json();

  const productsUrls = products?.map((product) => {
    const prdslug = slugify(product?.title);
    return {
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/products/${product._id}/${prdslug}`,
      lastModified: product?.updatedAt,
    };
  });

  const blogsUrls = blogs?.map((blog) => {
    const blogSlug = slugify(blog?.title);
    return {
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/blogs/${blog._id}/${blogSlug}`,
      lastModified: blog?.createdAt,
    };
  });
  const categoriesUrls = categories?.map((cat) => ({
    url: `${process.env.NEXT_PUBLIC_SERVER_URL}/category/${cat?.link}`,
    lastModified: cat?.updatedAt,
  }));
  return [
    {
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}`,
      lastModified: lastModifiedTimestamp,
    },
    {
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/products`,
      lastModified: lastProductUpdate,
    },
    {
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/blogs`,
      lastModified: lastBlogUpdate,
    },
    ...staticUrls,
    ...productsUrls,
    ...blogsUrls,
    ...categoriesUrls,
  ];
}
