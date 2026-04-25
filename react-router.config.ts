import type { Config } from "@react-router/dev/config";

import { getPostSlugs } from "./app/lib/mdx";

const postSlugs = getPostSlugs();

export default {
  ssr: false,

  prerender() {
    return ["/", "/blog", ...postSlugs.map((s) => `/blog/${s}`)];
  },
} satisfies Config;
