/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  i18n: {
    locales: ['vi'],
    defaultLocale: 'vi',
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        'my-proxy.com',
        '*.my-proxy.com',
        'diendantennisbtn.com',
        '*.diendantennisbtn.com'
      ],
    },
  },

}

module.exports = nextConfig
