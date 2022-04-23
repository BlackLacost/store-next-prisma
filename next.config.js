/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['loremflickr.com'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/category',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
