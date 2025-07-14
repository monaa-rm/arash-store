/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode : true,
    images: {
        domains: [
          // "mernblogbucketimage.storage.iran.liara.space"
          "localhost"
        ],
        remotePatterns: [
            {
                protocol: "http", // یا http اگر API از http استفاده می‌کند
                hostname: "localhost",
                port: "3000", // اگر پورت خاصی ندارد، خالی بگذارید
                pathname: "/public/**", // یا هر مسیر دیگری که API استفاده می‌کند
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
