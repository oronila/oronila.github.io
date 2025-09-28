import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';

export type JournalMeta = {
  slug: string;
  title: string;
  date: string; // ISO or YYYY-MM-DD
  description?: string;
  readingTimeMinutes?: number;
};

export type JournalEntry = JournalMeta & {
  html: string;
};

const journalDir = path.join(process.cwd(), 'content', 'journal');

function computeReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / wordsPerMinute));
}

export function getAllJournalSlugs(): string[] {
  if (!fs.existsSync(journalDir)) return [];
  return fs
    .readdirSync(journalDir)
    .filter((f) => f.endsWith('.md'))
    .map((filename) => {
      const filePath = path.join(journalDir, filename);
      const raw = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(raw);
      const basename = filename.replace(/\.md$/, '');
      return (data.slug as string) || basename;
    });
}

export function getAllJournalMeta(): JournalMeta[] {
  if (!fs.existsSync(journalDir)) return [];
  const filenames = fs.readdirSync(journalDir).filter((f) => f.endsWith('.md'));
  const metas: JournalMeta[] = filenames.map((filename) => {
    const filePath = path.join(journalDir, filename);
    const raw = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(raw);

    const fallbackBase = filename.replace(/\.md$/, '');
    const slug = (data.slug as string) || fallbackBase;
    const title = (data.title as string) || slug;
    const date = (data.date as string) || new Date().toISOString();
    const description = (data.description as string) || undefined;
    const readingTimeMinutes = computeReadingTime(content);

    return { slug, title, date, description, readingTimeMinutes };
  });

  // Sort by date desc
  metas.sort((a, b) => (a.date < b.date ? 1 : -1));
  return metas;
}

export async function getJournalEntryBySlug(slug: string): Promise<JournalEntry | null> {
  if (!fs.existsSync(journalDir)) return null;
  const target = fs
    .readdirSync(journalDir)
    .filter((f) => f.endsWith('.md'))
    .find((filename) => {
      const basename = filename.replace(/\.md$/, '');
      if (basename === slug) return true;
      try {
        const raw = fs.readFileSync(path.join(journalDir, filename), 'utf8');
        const { data } = matter(raw);
        return (data.slug as string) === slug;
      } catch {
        return false;
      }
    });

  if (!target) return null;

  const filePath = path.join(journalDir, target);
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);

  const computedSlug = (data.slug as string) || target.replace(/\.md$/, '');
  const title = (data.title as string) || computedSlug;
  const date = (data.date as string) || new Date().toISOString();
  const description = (data.description as string) || undefined;

  const fileHtml = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(content);

  const html = String(fileHtml);

  return {
    slug: computedSlug,
    title,
    date,
    description,
    readingTimeMinutes: computeReadingTime(content),
    html,
  };
}


