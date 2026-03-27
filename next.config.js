/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/webp"],
  },
  turbopack: {
    root: process.cwd(),
  },
};

module.exports = nextConfig;