import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Pagination = ({ currentPage, totalPages, onPageChange, hasNext, hasPrev }) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visiblePages = pages.filter(p =>
    p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1
  );

  return (
    <div className="flex items-center justify-center gap-2 mt-10" role="navigation" aria-label="Pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrev}
        className="w-10 h-10 rounded-xl bg-dark-card border border-dark-border flex items-center justify-center text-dark-muted hover:text-primary hover:border-primary disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        aria-label="Previous page"
      >
        <FiChevronLeft />
      </button>

      {visiblePages.map((page, idx) => {
        const prevPage = visiblePages[idx - 1];
        const showEllipsis = prevPage && page - prevPage > 1;
        return (
          <div key={page} className="flex items-center gap-2">
            {showEllipsis && <span className="text-dark-muted px-1">…</span>}
            <button
              onClick={() => onPageChange(page)}
              className={`w-10 h-10 rounded-xl text-sm font-medium transition-all border ${
                currentPage === page
                  ? 'bg-primary text-white border-primary shadow-glow-primary'
                  : 'bg-dark-card text-dark-muted border-dark-border hover:text-primary hover:border-primary'
              }`}
              aria-label={`Page ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          </div>
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNext}
        className="w-10 h-10 rounded-xl bg-dark-card border border-dark-border flex items-center justify-center text-dark-muted hover:text-primary hover:border-primary disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        aria-label="Next page"
      >
        <FiChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
