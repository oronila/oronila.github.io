import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_TITLE, getPostBySlug, getPostSlugs } from "@/lib/blog";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return { title: "Post not found" };
  }
  return {
    title: `${post.title} · ${BLOG_TITLE}`,
    description: post.description ?? post.title,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    notFound();
  }

  return (
    <article>
      <Link
        href="/blog"
        className="mb-8 inline-block text-xs text-neutral-500 underline-offset-4 hover:underline dark:text-neutral-400"
      >
        ← All posts
      </Link>
      <header className="mb-8 border-b border-neutral-800/10 pb-8 dark:border-neutral-200/10">
        <h1 className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">
          {post.title}
        </h1>
        <div className="mt-2 flex flex-wrap gap-x-3 text-sm text-neutral-500 dark:text-neutral-400">
          <time dateTime={post.date}>{post.date}</time>
          <span>{post.readingMinutes} min read</span>
        </div>
      </header>
      <div
        className="blog-content text-[15px] leading-relaxed text-[var(--foreground)]"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </article>
  );
}
