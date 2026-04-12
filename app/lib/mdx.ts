import fs from "fs";
import path from "path";

import { bundleMDX } from "mdx-bundler";
import rehypePrettyCode from "rehype-pretty-code";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import * as z from "zod";

const frontMatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  published: z.coerce.date(),
  author: z.string(),
  heroImage: z.string().optional(),
  heroImageAlt: z.string().optional(),
});

export type FrontMatter = z.infer<typeof frontMatterSchema>;

function getComponentFiles(): Record<string, string> {
  const componentsPath = path.join(process.cwd(), "app/components");

  function readFilesRecursively(dir: string): Record<string, string> {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    return entries.reduce<Record<string, string>>((acc, entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        Object.assign(acc, readFilesRecursively(fullPath));
      } else if (entry.isFile()) {
        const relativePath = path.relative(componentsPath, fullPath);
        const normalizedPath = relativePath.replaceAll("\\", "/");
        const content = fs.readFileSync(fullPath, "utf8");
        acc["../app/components/" + normalizedPath] = content;
      }
      return acc;
    }, {});
  }

  try {
    return readFilesRecursively(componentsPath);
  } catch (e) {
    console.warn("Components directory not found, continuing without components", e);
  }
  return {};
}

// Run once and cache
const componentFiles = getComponentFiles();

function resolvePostsPath(slug: string): string {
  const postPath = path.join(process.cwd(), "posts", `${slug}.mdx`);
  if (fs.existsSync(postPath)) return postPath;
  throw new Error(`Post not found for slug: ${slug}`);
}

function extractSynopsis(source: string, maxLength = 500): string {
  const truncateMarker = "{/* truncate */}";
  const truncateIndex = source.indexOf(truncateMarker);
  const truncated = truncateIndex === -1 ? source : source.slice(0, truncateIndex);

  const cleaned = truncated
    // Remove frontmatter block
    .replace(/^---[\s\S]*?---/, "")
    // Remove fenced code blocks (must come before inline code)
    .replace(/```[\s\S]*?```/g, "")
    // Remove import/export statements
    .replace(/^(import|export).*$/gm, "")
    // Remove JSX expressions
    .replace(/\{[^}]*\}/g, "")
    // Remove JSX tags
    .replace(/<[^>]+>/g, "")
    // Remove markdown headings, bold, italic, links, inline code
    .replace(/#{1,6}\s+/g, "")
    .replace(/(\*\*|__)(.*?)\1/g, "$2")
    .replace(/(\*|_)(.*?)\1/g, "$2")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/`[^`]*`/g, "")
    // Collapse whitespace
    .replace(/\s+/g, " ")
    .trim();

  if (cleaned.length <= maxLength) return cleaned;

  // Slice and avoid cutting mid-word
  return cleaned.slice(0, maxLength).replace(/\s+\S*$/, "");
}

export async function getPostBySlug(slug: string) {
  try {
    const postPath = resolvePostsPath(slug);
    const source = fs.readFileSync(postPath, "utf8");
    const synopsis = extractSynopsis(source);
    const { code, frontmatter } = await bundleMDX({
      source,
      files: componentFiles,
      mdxOptions(options) {
        options.remarkPlugins = [remarkFrontmatter, remarkMdxFrontmatter];
        options.rehypePlugins = [rehypePrettyCode];
        return options;
      },
    });
    const parsed = frontMatterSchema.safeParse(frontmatter);

    if (!parsed.success) {
      console.error(`Invalid frontmatter in "${slug}":`, parsed.error.message);
      return null;
    }
    return { code, frontmatter: parsed.data, synopsis };
  } catch (err) {
    console.error("Error processing MDX:", err);
    return null;
  }
}

export function getPostSlugs(): string[] {
  const postsDir = path.join(process.cwd(), "posts");
  try {
    const files = fs.readdirSync(postsDir);
    return files.filter((file) => file.endsWith(".mdx")).map((file) => file.replace(/\.mdx$/, ""));
  } catch (err) {
    console.error("Error reading posts directory:", err);
    return [];
  }
}

export async function getPosts(): Promise<
  { slug: string; frontmatter: FrontMatter; synopsis: string }[]
> {
  const slugs = getPostSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const post = await getPostBySlug(slug);
      return post ? [{ slug, frontmatter: post.frontmatter, synopsis: post.synopsis }] : [];
    }),
  );
  return posts
    .flat()
    .sort((a, b) => b.frontmatter.published.getTime() - a.frontmatter.published.getTime());
}
