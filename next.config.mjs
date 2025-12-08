/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      // "mernblogbucketimage.storage.iran.liara.space"
      "localhost",
    ],
    remotePatterns: [
      {
        protocol: "http", // یا http اگر API از http استفاده می‌کند
        hostname: "localhost",
        port: "3000", // اگر پورت خاصی ندارد، خالی بگذارید
        pathname: "/public/**", // یا هر مسیر دیگری که API استفاده می‌کند
      },
      {
        protocol: "https",
        hostname: `${process.env.NEXT_PUBLIC_HOST_URL}`,
        port: "",
        // پوشش دادن چند مسیر با استفاده از یک الگوی کلی‌تر
        // یا اگر مطمئن هستید که همه چیز زیر یک پوشش است، این روش خوب است.
        // اگر مسیرها کاملاً متفاوتند، بهتر است جداگانه تعریف کنید.
        pathname: "/**/*", // این الگوی کلی‌تر است و همه چیز را پوشش می‌دهد
      },
      {
        protocol: "https",
        hostname: `arash-store-bucket.storage.iran.liara.space`,
        port: "",
        pathname: "/**/*", // این الگوی کلی‌تر است و همه چیز را پوشش می‌دهد
      },
    ],
    // remotePatterns: [
    //     {
    //         protocol: "https", // یا http اگر API از http استفاده می‌کند
    //         hostname: "api.dicebear.com",
    //         port: "", // اگر پورت خاصی ندارد، خالی بگذارید
    //         pathname: "/9.x/**", // یا هر مسیر دیگری که API استفاده می‌کند
    //       },
    // ],
  },
};

export default nextConfig;
