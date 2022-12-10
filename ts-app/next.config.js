/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['gcdn.lanetaneta.com', 'lh3.googleusercontent.com'],
  }
}

module.exports = nextConfig


