/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
      ignoreBuildErrors: true,
    },
  eslint: {
    ignoreDuringBuilds: true,
  },
    experimental: {
  //largePageDataBytes: 128 * 1000, // 128KB by default
    largePageDataBytes: 128 * 100000,
  },
}


export default nextConfig;
