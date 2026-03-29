/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/webp", "image/jpeg", "image/jpg", "image/png", "image/avif"],
  },
  turbopack: {
    root: process.cwd(),
  },
};

module.exports = nextConfig;