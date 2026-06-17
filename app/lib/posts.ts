import type { ComponentType } from "react";
import * as z from "zod";

const frontMatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  published: z.coerce.date(),
  author: z.string(),
  heroImage: z.string().optional(),
  heroImageAlt: z.string().optional(),
  tags: z.array(z.string()).default([]),
});

export type FrontMatter = z.infer<typeof frontMatterSchema>;

export type Post = {
  slug: string;
  Component: ComponentType;
  frontmatter: FrontMatter;
  synopsis: string;
};

type PostModule = { default: ComponentType; frontmatter: unknown; synopsis?: string };

const modules = import.meta.glob<PostModule>("../../posts/*.mdx", { eager: true });

function slugFromPath(file: string): string {
  return file
    .split("/")
    .pop()!
    .replace(/\.mdx$/, "");
}

const bySlug = new Map<string, Post>();

for (const [file, mod] of Object.entries(modules)) {
  const slug = slugFromPath(file);
  const parsed = frontMatterSchema.safeParse(mod.frontmatter);
  if (!parsed.success) {
    console.error(`Invalid frontmatter in "${slug}":`, parsed.error.message);
    continue;
  }
  bySlug.set(slug, {
    slug,
    Component: mod.default,
    frontmatter: parsed.data,
    synopsis: mod.synopsis ?? "",
  });
}

export const posts: Post[] = [...bySlug.values()].sort(
  (a, b) => b.frontmatter.published.getTime() - a.frontmatter.published.getTime(),
);

export function getPost(slug: string): Post | undefined {
  return bySlug.get(slug);
}

// `posts` is sorted newest-first, so the newer post sits at the lower index.
export function getAdjacentPosts(slug: string): { newer?: Post; older?: Post } {
  const index = posts.findIndex((post) => post.slug === slug);
  if (index === -1) {
    return {};
  }
  return {
    newer: posts[index - 1],
    older: posts[index + 1],
  };
}
