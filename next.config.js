/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
  i18n: {
    locales: ["vi"],
    defaultLocale: "vi",
  },
};

module.exports = nextConfig;
