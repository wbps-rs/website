import { ArrowLeft, ArrowRight, Calendar, ChevronLeft, UserPen } from "lucide-react";
import { Link, useParams } from "react-router";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import formatDate from "~/lib/format-date";
import { getAdjacentPosts, getPost } from "~/lib/posts";

import type { Route } from "./+types/$slug";

export function meta({ params }: Route.MetaArgs) {
  const post = getPost(params.slug);
  if (!post) {
    return [{ title: "wpbs | Post not found" }];
  }
  const { frontmatter } = post;
  return [
    { title: `wpbs | ${frontmatter.title}` },
    { name: "description", content: frontmatter.description },
    { property: "og:title", content: `wpbs | ${frontmatter.title}` },
    { property: "og:description", content: frontmatter.description },
    { property: "og:type", content: "article" },
    ...(frontmatter.heroImage ? [{ property: "og:image", content: frontmatter.heroImage }] : []),
  ];
}

export default function Post() {
  const { slug } = useParams();
  const post = slug ? getPost(slug) : undefined;

  if (!post) {
    return (
      <main className="container mx-auto p-4 pt-16">
        <h1>404</h1>
        <p>The requested post could not be found.</p>
      </main>
    );
  }

  const { Component, frontmatter } = post;
  const { newer, older } = getAdjacentPosts(post.slug);

  return (
    <main className="py-8">
      <div className="container mx-auto w-full">
        <div className="mb-6 px-6">
          <Button
            render={<Link to="/blog" />}
            variant="ghost"
            size="sm"
            className="text-muted-foreground -ml-2.5"
          >
            <ChevronLeft />
            All posts
          </Button>
        </div>
        <article className="prose dark:prose-invert max-w-none px-6">
          <h1 className="mb-0">{frontmatter.title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
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
            <div className="mt-4 flex flex-wrap gap-1">
              {frontmatter.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          <Separator className="mt-8" />
          {frontmatter.heroImage && (
            <figure>
              <img
                src={frontmatter.heroImage}
                alt={frontmatter.heroImageAlt ?? frontmatter.title}
                className="max-h-100"
              />
              {frontmatter.heroImageAlt && (
                <figcaption className="mt-2">{frontmatter.heroImageAlt}</figcaption>
              )}
            </figure>
          )}
          <Component />
        </article>
        {(newer || older) && (
          <nav className="mt-12 grid grid-cols-1 gap-4 px-6 sm:grid-cols-2">
            {older ? (
              <Link
                to={`/blog/${older.slug}`}
                className="group border-border hover:border-foreground flex flex-col rounded-md border p-4 transition-colors"
              >
                <span className="text-muted-foreground flex items-center gap-1 text-sm">
                  <ArrowLeft className="size-4" />
                  Older post
                </span>
                <span className="mt-1 font-medium">{older.frontmatter.title}</span>
              </Link>
            ) : (
              <div className="hidden sm:block" />
            )}
            {newer && (
              <Link
                to={`/blog/${newer.slug}`}
                className="group border-border hover:border-foreground flex flex-col rounded-md border p-4 text-right transition-colors"
              >
                <span className="text-muted-foreground flex items-center justify-end gap-1 text-sm">
                  Newer post
                  <ArrowRight className="size-4" />
                </span>
                <span className="mt-1 font-medium">{newer.frontmatter.title}</span>
              </Link>
            )}
          </nav>
        )}
      </div>
    </main>
  );
}
