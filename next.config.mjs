/** @type {import('next').NextConfig} */
const nextConfig = {
  // 为GitHub Pages设置静态导出
  output: "export",
  basePath: process.env.NODE_ENV === 'production' ? "/couple-flying-chess-807-master" : "",
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // 基本SEO配置
  compress: true,
  poweredByHeader: false,
}

export default nextConfig
