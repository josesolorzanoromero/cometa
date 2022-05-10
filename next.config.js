/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      },
      {
        // Apply these headers to all routes in your application.
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
