/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  i18n: {
    locales: ['vi'],
    defaultLocale: 'vi',
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        '*.netlify.app',
        'diendantennisbtn.com',
        '*.diendantennisbtn.com'
      ],
    },
  },

}

module.exports = nextConfig
