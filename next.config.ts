import { withContentlayer } from 'next-contentlayer2';
import type { NextConfig } from 'next';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
  // 启用 React 严格模式
  reactStrictMode: true,
  // 压缩图片等资源
  compress: true,
  
  // 🔴 添加 Turbopack 配置（Next.js 16 需要）
  turbopack: {
    // 可选：明确指定根目录（解决 lockfile 警告）
    // root: __dirname,
  },
}

// 使用 withContentlayer 包装配置
export default withContentlayer(nextConfig);