/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader:"akamai",
    path:"m.media-amazon.com",
    domains:["m.media-amazon.com"]
  }
}

module.exports = nextConfig
