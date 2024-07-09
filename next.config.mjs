/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN", // or 'ALLOW-FROM https://example.com'
          },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' https://example.com", // Update with your requirements
          },
        ],
      },
    ];
  },
};

export default nextConfig;
