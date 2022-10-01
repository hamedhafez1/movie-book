const withPWA = require("next-pwa")({
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development'
})

const nextConfig = withPWA({
    reactStrictMode: true,
    images: {
        loader: "akamai",
        path: "m.media-amazon.com",
        domains: ["m.media-amazon.com"]
    }
})

module.exports = nextConfig
