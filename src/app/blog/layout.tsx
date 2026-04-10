import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_TITLE } from "@/constants/blog";

export const metadata: Metadata = {
  title: BLOG_TITLE,
  description: "Writing from Noor Ali.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-[200] overflow-y-auto bg-[var(--background)] text-[var(--foreground)] font-sans">
      <header className="border-b border-neutral-800/15 bg-[var(--background)] px-6 py-6 dark:border-neutral-200/10">
        <div className="mx-auto flex max-w-2xl flex-col gap-1">
          <Link
            href="/blog"
            className="text-xl font-semibold tracking-tight text-[var(--foreground)] no-underline hover:underline"
          >
            {BLOG_TITLE}
          </Link>
          <Link
            href="/"
            className="mt-2 w-fit text-xs text-neutral-500 underline-offset-4 hover:underline dark:text-neutral-500"
          >
            ← Back to site
          </Link>
        </div>
      </header>
      <div className="mx-auto max-w-2xl px-6 py-10">{children}</div>
    </div>
  );
}
