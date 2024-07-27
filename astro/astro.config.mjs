import { defineConfig } from 'astro/config';
import icon from "astro-icon";
import tailwind from "@astrojs/tailwind";
import remarkMath from 'remark-math';
import rehypeMathJax from "rehype-mathjax"
import rehypePrettyCode from 'rehype-pretty-code';

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [icon(), tailwind(), mdx({
    syntaxHighlight: false,
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeMathJax, [rehypePrettyCode, { theme: "nord" }]]
  })]
});