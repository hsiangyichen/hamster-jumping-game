import withSVGR from "@svgr/webpack";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        and: [/\.(js|ts)x?$/],
      },
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
            key: "Content-Security-Policy",
            value:
              "frame-ancestors 'self' http://localhost:3000 https://hamster-jumping-game.vercel.app/",
          },
          {
            key: "X-Frame-Options",
            value: "ALLOW-FROM http://localhost:3000",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
