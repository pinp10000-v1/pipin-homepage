/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['pipin.dedyn.io'],
  images: {
    formats: ['image/webp', 'image/avif'],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: true,
  },
}

module.exports = nextConfig
