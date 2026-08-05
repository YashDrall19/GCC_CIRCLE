'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import PdfCard from '@/components/PdfCard';

interface NewsItem {
  id: number;
  title: string;
  description: string;
  pdf_url: string;
  active: boolean;
  created_at: string;
}

export default function IndustryUpdatesPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/news', {
        cache: 'no-store',
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to fetch news');
      }

      setNews(data.data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to fetch news.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  return (
    <main className="bg-[#070b14] text-white min-h-screen pt-16 sm:pt-20">
      {/* Hero */}
      <section className="px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[#D2A679] text-xs uppercase tracking-widest mb-4">
            Industry News
          </p>

          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            The stories shaping India&apos;s GCC landscape.
          </h1>

          <p className="text-white/65 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
            Stay up to date with the latest GCC launches,
            leadership appointments, expansion announcements,
            policy updates, investments, mergers, acquisitions,
            and ecosystem developments—all curated in one place.
          </p>

          <div className="mt-8">
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 text-[#D2A679] hover:text-[#B87333] transition-colors font-semibold"
            >
              Back to Insights
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* News */}
      <section className="px-4 sm:px-6 pb-20 sm:pb-28">
        <div className="max-w-7xl mx-auto">

          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl sm:text-2xl font-bold">
              Industry Updates
            </h2>

            {!loading && (
              <span className="text-white/35 text-sm">
                {news.length}{' '}
                {news.length === 1
                  ? 'document'
                  : 'documents'}
              </span>
            )}
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <div className="w-7 h-7 rounded-full border-2 border-[#D2A679] border-t-transparent animate-spin" />
            </div>
          ) : error ? (
            <div className="text-center py-16 text-red-400">
              {error}
            </div>
          ) : news.length === 0 ? (
            <div className="text-center py-16 text-white/40">
              No Industry News available.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {news.map((item) => (
                <PdfCard
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  url={item.pdf_url}
                  buttonLabel="Download PDF"
                  onDownload={() =>
                    window.open(
                      item.pdf_url,
                      '_blank',
                      'noopener,noreferrer'
                    )
                  }
                />
              ))}
            </div>
          )}

        </div>
      </section>
    </main>
  );
}