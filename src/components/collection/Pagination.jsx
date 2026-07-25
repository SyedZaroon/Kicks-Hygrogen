const Pagination = ({ onPageChange, hasNextPage, hasPreviousPage, loading }) => {
  return (
    <div className="flex justify-center items-center gap-4 mt-12 mb-8">
      <button
        onClick={() => onPageChange('prev')}
        disabled={!hasPreviousPage || loading}
        className="px-6 py-2 bg-gray-100 rounded-lg font-medium disabled:opacity-50"
      >
        Previous
      </button>
      
      <button
        onClick={() => onPageChange('next')}
        disabled={!hasNextPage || loading}
        className="px-6 py-2 bg-black text-white rounded-lg font-medium disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;