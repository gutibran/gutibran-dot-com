import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math'; 
import rehypeMath from "rehype-mathjax"
import { remarkModifiedTime } from './remark-modified-time.mjs';
import mdx from '@astrojs/mdx';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  integrations: [mdx({
    remarkPlugins: [remarkMath, remarkModifiedTime],
    rehypePlugins: [rehypeMath]
  }), icon()]
});