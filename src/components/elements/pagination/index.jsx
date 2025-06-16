const Pagination = ({
  items,
  loading,
  currentPage,
  setCurrentPage,
  totalPages,
}) => {
  const getVisiblePageNumbers = () => {
    const maxVisiblePages = 5;
    let startPage = currentPage - Math.floor(maxVisiblePages / 2);
    let endPage = currentPage + Math.floor(maxVisiblePages / 2);

    if (startPage <= 0) {
      startPage = 1;
      endPage = Math.min(maxVisiblePages, totalPages);
    }

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, totalPages - maxVisiblePages + 1);
    }

    let visiblePageNumbers = Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );

    return visiblePageNumbers;
  };

  const visiblePageNumbers = getVisiblePageNumbers();

  return (
    <nav className={`${loading || !items?.length ? "hidden" : "block"}`}>
      <ul className="pagination flex justify-center items-center gap-2 mt-4">
        {totalPages > 5 && currentPage > 3 && (
          <li>
            <button
              onClick={() => setCurrentPage(1)}
              className="page-link p-3 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              <LuChevronLast />
            </button>
          </li>
        )}

        {visiblePageNumbers.map((number) => (
          <li key={number} className="page-item">
            <button
              onClick={() => setCurrentPage(number)}
              className={`page-link px-4 py-2 rounded-md ${
                currentPage === number
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {number}
            </button>
          </li>
        ))}

        {totalPages > 5 && currentPage < totalPages - 2 && (
          <li>
            <button
              onClick={() => setCurrentPage(totalPages)}
              className="page-link p-3 py-3 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              <LuChevronFirst />
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
