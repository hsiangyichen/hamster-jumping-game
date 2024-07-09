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
            key: "Content-Security-Policy",
            value:
              "frame-ancestors 'self' http://localhost:3000 https://michelle-portfolio-iota.vercel.app/ https://hamster-jumping-game-6drewmzcd-hsiangyichens-projects.vercel.app/ https://hamster-jumping-game.vercel.app/",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
