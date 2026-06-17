import { ArrowRight, Calendar, User } from "lucide-react";
import { Link } from "react-router";

import { Badge } from "~/components/ui/badge";
import formatDate from "~/lib/format-date";
import { posts } from "~/lib/posts";

import type { Route } from "./+types/home";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "wpbs | Blog" },
    {
      name: "description",
      content: "The wpbs Blog",
    },
    { property: "og:title", content: `wpbs | Blog` },
    { property: "og:description", content: "The wpbs Blog" },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "/favicon/web-app-manifest-512x512.png" },
  ];
}

export default function Home() {
  return (
    <main className="container mx-auto w-full px-6 py-8">
      <header className="border-border mb-2 w-full">
        <h1 className="mb-2 text-3xl font-bold tracking-tight">Blog</h1>
        <p className="text-muted-foreground">News and write-ups from the wpbs team.</p>
      </header>
      <div className="divide-border flex flex-col divide-y">
        {posts.map(({ slug, frontmatter, synopsis }) => (
          <Link
            key={slug}
            to={`/blog/${slug}`}
            className="group hover:bg-muted/30 -mx-4 flex flex-col gap-6 px-4 py-10 transition-colors sm:flex-row sm:items-stretch sm:gap-10"
          >
            <div className="flex min-w-0 flex-1 flex-col justify-between">
              <div>
                <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
                  <span className="bg-linear-to-r from-current to-current bg-size-[0%_1px] bg-bottom-left bg-no-repeat pb-1 transition-[background-size] duration-300 group-hover:bg-size-[100%_1px]">
                    {frontmatter.title}
                  </span>
                  <ArrowRight className="text-muted-foreground ml-1 inline-block size-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
                </h2>
                <div className="text-muted-foreground mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                  <span className="inline-flex items-center gap-1.5">
                    <User className="size-3.5" />
                    {frontmatter.author}
                  </span>
                  <time className="inline-flex items-center gap-1.5">
                    <Calendar className="size-3.5" />
                    {formatDate.format(frontmatter.published)}
                  </time>
                </div>
                {synopsis && (
                  <p className="text-muted-foreground mt-4 line-clamp-2 max-w-2xl leading-relaxed">
                    {synopsis}
                  </p>
                )}
              </div>
              {frontmatter.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {frontmatter.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            {frontmatter.heroImage && (
              <div className="bg-muted order-first aspect-4/3 w-full shrink-0 self-center overflow-hidden rounded-md sm:order-0 sm:w-80">
                <img
                  src={frontmatter.heroImage}
                  alt={frontmatter.heroImageAlt ?? frontmatter.title}
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            )}
          </Link>
        ))}
      </div>
    </main>
  );
}
