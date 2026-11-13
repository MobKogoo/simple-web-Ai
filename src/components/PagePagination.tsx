import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface PagePaginationProps {
  currentPage: 1 | 2 | 3;
  onSelectPage: (page: 1 | 2 | 3) => void;
}

const PAGE_DESCRIPTIONS: Record<1 | 2 | 3, string> = {
  1: 'გვერდი 1 / 3 — ძირითადი საიტი · გადადით ბლოგზე ან გალერეაზე',
  2: 'გვერდი 2 / 3 — ბლოგი, კომენტარები და YouTube ვიდეო',
  3: 'გვერდი 3 / 3 — გალერეა: Law, Biolithic და Management',
};

export const PagePagination: React.FC<PagePaginationProps> = ({
  currentPage,
  onSelectPage,
}) => {
  const prevPage = (currentPage > 1 ? currentPage - 1 : 1) as 1 | 2 | 3;
  const nextPage = (currentPage < 3 ? currentPage + 1 : 3) as 1 | 2 | 3;

  return (
    <div className="border-t border-white/[0.08] bg-[#0A0B0E] py-8">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="text-sm text-zinc-400">
            {PAGE_DESCRIPTIONS[currentPage]}
          </div>

          <nav aria-label="საიტის გვერდების ნავიგაცია">
            <ul className="pagination mb-0 flex items-center gap-2">
              <li className="page-item">
                <button
                  type="button"
                  onClick={() => onSelectPage(prevPage)}
                  disabled={currentPage === 1}
                  aria-label="წინა გვერდი"
                  className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-white/12 bg-[#12141A] px-3 text-sm text-zinc-300 transition-colors hover:border-white/25 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                </button>
              </li>

              {([1, 2, 3] as const).map((pageNum) => (
                <li key={pageNum} className="page-item">
                  <button
                    type="button"
                    onClick={() => onSelectPage(pageNum)}
                    aria-current={currentPage === pageNum ? 'page' : undefined}
                    aria-label={
                      pageNum === 1
                        ? 'გვერდი 1 — მთავარი საიტი'
                        : pageNum === 2
                          ? 'გვერდი 2 — ბლოგი და YouTube ვიდეო'
                          : 'გვერდი 3 — სურათების გალერეა'
                    }
                    className={`inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg px-4 text-sm font-semibold tabular-nums transition-colors ${
                      currentPage === pageNum
                        ? 'bg-amber-500 text-zinc-950'
                        : 'border border-white/12 bg-[#12141A] text-zinc-200 hover:border-amber-400/50 hover:text-white'
                    }`}
                  >
                    {pageNum}
                  </button>
                </li>
              ))}

              <li className="page-item">
                <button
                  type="button"
                  onClick={() => onSelectPage(nextPage)}
                  disabled={currentPage === 3}
                  aria-label="შემდეგი გვერდი"
                  className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-white/12 bg-[#12141A] px-3 text-sm text-zinc-300 transition-colors hover:border-white/25 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};
