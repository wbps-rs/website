import mdx from "@mdx-js/rollup";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import rehypePrettyCode from "rehype-pretty-code";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { defineConfig } from "vite";

import remarkSynopsis from "./plugins/remark-synopsis";

export default defineConfig({
  plugins: [
    mdx({
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkSynopsis],
      rehypePlugins: [rehypePrettyCode],
    }),
    tailwindcss(),
    reactRouter(),
  ],
  resolve: { tsconfigPaths: true },
});
