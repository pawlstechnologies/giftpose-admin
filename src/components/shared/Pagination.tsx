interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsShown: number;
  itemLabel?: string;
  onPageChange: (page: number) => void;
}

/**
 * Pagination — shows "Showing X of Y items" + prev/number/next buttons.
 *
 * Usage:
 * <Pagination
 *   currentPage={1}
 *   totalPages={4}
 *   totalItems={14}
 *   itemsShown={4}
 *   itemLabel="categories"
 *   onPageChange={setPage}
 * />
 */

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsShown,
  itemLabel = 'items',
  onPageChange,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination">
      <span className="pag-info">
        Showing {itemsShown} of {totalItems} {itemLabel}
      </span>
      <div className="pag-btns">
        <button
          className={`pag-btn${currentPage === 1 ? ' disabled' : ''}`}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {pages.map((p) => (
          <button
            key={p}
            className={`pag-btn${p === currentPage ? ' active' : ''}`}
            onClick={() => onPageChange(p)}
          >
            {p}
          </button>
        ))}

        <button
          className={`pag-btn${currentPage === totalPages ? ' disabled' : ''}`}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}