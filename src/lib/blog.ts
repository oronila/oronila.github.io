import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import readingTime from "reading-time";

export const BLOG_TITLE = "The Aligned Perspective";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  description?: string;
  readingMinutes: number;
};

export type Post = PostMeta & {
  contentHtml: string;
};

function listMarkdownFiles(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) {
    return [];
  }
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"));
}

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(markdown);
  return String(result);
}

export function getAllPosts(): PostMeta[] {
  return listMarkdownFiles()
    .map((file) => {
      const slug = path.basename(file, ".md");
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
      const { data, content } = matter(raw);
      const title =
        typeof data.title === "string" && data.title.trim()
          ? data.title.trim()
          : slug.replace(/-/g, " ");
      const date =
        typeof data.date === "string" && data.date.trim()
          ? data.date.trim()
          : "";
      const description =
        typeof data.description === "string" ? data.description.trim() : undefined;
      const rt = readingTime(content);
      return {
        slug,
        title,
        date,
        description,
        readingMinutes: Math.max(1, Math.round(rt.minutes)),
      };
    })
    .filter((p) => p.date)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const title =
    typeof data.title === "string" && data.title.trim()
      ? data.title.trim()
      : slug.replace(/-/g, " ");
  const date =
    typeof data.date === "string" && data.date.trim() ? data.date.trim() : "";
  const description =
    typeof data.description === "string" ? data.description.trim() : undefined;
  const rt = readingTime(content);
  const contentHtml = await markdownToHtml(content);
  return {
    slug,
    title,
    date,
    description,
    readingMinutes: Math.max(1, Math.round(rt.minutes)),
    contentHtml,
  };
}

export function getPostSlugs(): string[] {
  return listMarkdownFiles().map((file) => path.basename(file, ".md"));
}
