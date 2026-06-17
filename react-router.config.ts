import fs from "node:fs";
import path from "node:path";

import type { Config } from "@react-router/dev/config";

// Build-time only (runs in Node). Post content is bundled via import.meta.glob
// in app/lib/posts.ts; this just enumerates which paths to prerender.
const postSlugs = fs
  .readdirSync(path.join(process.cwd(), "posts"))
  .filter((file) => file.endsWith(".mdx"))
  .map((file) => file.replace(/\.mdx$/, ""));

export default {
  ssr: false,

  prerender() {
    return ["/", "/blog", ...postSlugs.map((s) => `/blog/${s}`)];
  },
} satisfies Config;
