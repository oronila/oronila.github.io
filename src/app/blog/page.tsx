import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export default function BlogIndexPage() {
  const posts = getAllPosts();

  if (posts.length === 0) {
    return (
      <div>
        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          No posts yet. Add a <code className="text-sm">.md</code> file under{" "}
          <code className="text-sm">content/blog/</code> with{" "}
          <code className="text-sm">title</code> and <code className="text-sm">date</code> in the
          front matter.
        </p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-8">
      {posts.map((post) => (
        <li key={post.slug} className="list-none">
          <Link href={`/blog/${post.slug}`} className="group block no-underline">
            <h2 className="text-lg font-semibold text-[var(--foreground)] group-hover:underline">
              {post.title}
            </h2>
            <div className="mt-1 flex flex-wrap gap-x-3 text-xs text-neutral-500 dark:text-neutral-400">
              <time dateTime={post.date}>{post.date}</time>
              <span>{post.readingMinutes} min read</span>
            </div>
            {post.description ? (
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                {post.description}
              </p>
            ) : null}
          </Link>
        </li>
      ))}
    </ul>
  );
}
