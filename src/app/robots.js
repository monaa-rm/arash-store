export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: ["/"],
      disallow: ["/api", "/checkout", "/dashboard", "/orders", "/search"],
    },
    sitemap: `${process.env.NEXT_PUBLIC_SERVER_URL}/sitemap.xml`,
  };
}
