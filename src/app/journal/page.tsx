import Link from 'next/link';
import { getAllJournalMeta } from '@/lib/journal';

export const dynamic = 'force-static';
export const revalidate = false;

export default async function JournalIndexPage() {
  const entries = getAllJournalMeta();

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Journal</h1>
      {entries.length === 0 && (
        <p className="text-gray-500">No entries yet. Coming soon... Add markdown files to <code>content/journal</code>.</p>
      )}
      <ul className="space-y-4">
        {entries.map((e) => (
          <li key={e.slug} className="border-b border-gray-200 pb-4">
            <Link href={`/journal/${e.slug}`} className="text-xl font-semibold hover:underline">
              {e.title}
            </Link>
            <div className="text-sm text-gray-500 mt-1">
              <span>{new Date(e.date).toLocaleDateString()}</span>
              {e.readingTimeMinutes ? <span> · {e.readingTimeMinutes} min read</span> : null}
            </div>
            {e.description ? <p className="mt-2 text-gray-700">{e.description}</p> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}


