import { Calendar, UserPen } from "lucide-react";
import { useLoaderData } from "react-router";
import { Link } from "react-router";

import { Badge } from "~/components/ui/badge";
import formatDate from "~/lib/format-date";
import { getPosts } from "~/lib/mdx";

import type { Route } from "./+types/home";

export async function loader() {
  const posts = await getPosts();

  return { posts };
}

export function meta(_: Route.MetaArgs) {
  return [
    { title: "wpbs | Blog" },
    {
      name: "description",
      content: "The wpbs Blog",
    },
    { property: "og:title", content: `wpbs | Blog` },
    { property: "og:description", content: "The wpbs Blog" },
    { property: "og:type", content: "article" },
    { property: "og:image", content: "/favicon/web-app-manifest-512x512.png" },
  ];
}

export default function Home() {
  const { posts } = useLoaderData<typeof loader>();
  return (
    <main className="container mx-auto w-full px-6 py-8">
      <header className="mb-8 w-full">
        <h1 className="mb-2 text-3xl font-bold tracking-tight">Blog</h1>
        <p className="text-muted-foreground">News and write-ups from the wpbs team.</p>
      </header>
      <div className="divide-border flex flex-col divide-y">
        {posts.map(({ slug, frontmatter, synopsis }) => (
          <Link
            key={slug}
            to={`/blog/${slug}`}
            className="group border-border hover:border-foreground flex flex-col border-l-2 py-5 pl-4 transition-colors"
          >
            {frontmatter.heroImage && (
              <figure className="mb-4">
                <img
                  src={frontmatter.heroImage}
                  alt={frontmatter.heroImageAlt ?? frontmatter.title}
                  className="max-h-72 rounded-md"
                />
                {frontmatter.heroImageAlt && (
                  <figcaption className="text-muted-foreground mt-1 text-xs">
                    {frontmatter.heroImageAlt}
                  </figcaption>
                )}
              </figure>
            )}
            <div className="flex min-w-0 flex-col gap-1">
              <p className="text-2xl leading-snug font-medium">{frontmatter.title}</p>
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="size-4" />
                  <time>{formatDate.format(frontmatter.published)}</time>
                </div>
                <div className="flex items-center gap-1">
                  <UserPen className="size-4" />
                  <span>{frontmatter.author}</span>
                </div>
              </div>
              {frontmatter.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {frontmatter.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
              <p className="text-md text-muted-foreground mt-1 line-clamp-3">{synopsis}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
