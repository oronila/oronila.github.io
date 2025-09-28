import { notFound } from 'next/navigation';
import { getAllJournalSlugs, getJournalEntryBySlug } from '@/lib/journal';

export const dynamic = 'force-static';
export const revalidate = false;

export async function generateStaticParams() {
  const slugs = getAllJournalSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function JournalEntryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = await getJournalEntryBySlug(slug);
  if (!entry) return notFound();

  return (
    <article className="prose prose-neutral max-w-3xl mx-auto px-4 py-10">
      <h1>{entry.title}</h1>
      <p className="text-sm text-gray-500">
        {new Date(entry.date).toLocaleDateString()}
        {entry.readingTimeMinutes ? ` · ${entry.readingTimeMinutes} min read` : ''}
      </p>
      <div dangerouslySetInnerHTML={{ __html: entry.html }} />
    </article>
  );
}


