/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['pipin.dedyn.io'],
  images: {
    formats: ['image/webp', 'image/avif'],
  },
}

module.exports = nextConfig
