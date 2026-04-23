// types.d.ts
declare module 'next-contentlayer2/client' {
  import type { ComponentType } from 'react';
  
  /**
   * 用于在客户端渲染 MDX 内容的 Hook
   * @param code - 从 contentlayer 生成的 MDX 代码字符串
   * @returns 一个 React 组件
   */
  export const useMDXComponent: (code: string) => ComponentType;
}