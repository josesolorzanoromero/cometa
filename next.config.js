/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      },
    ];
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
