/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'mp-galeria-codante.s3.amazonaws.com',
      },
    ],
  },
}

export default nextConfig
